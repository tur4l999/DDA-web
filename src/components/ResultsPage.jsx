import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock, Award, ChevronRight, AlertCircle, Monitor, BookOpen, Ticket, Eye, MessageSquare } from 'lucide-react';

export default function ResultsPage({ resultId, onBack }) {
  const [selectedId, setSelectedId] = useState(resultId);
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator', 'final', 'topic', 'ticket'

  // Mock Data
  const simulatorResults = [
    { id: 101, type: 'simulator', date: '11.12.2025', time: '10:00', duration: '18 dəq', correctCount: 18, totalCount: 20, score: 94, status: 'passed', label: 'SINAQ DYP İMTAHANI' },
    { id: 102, type: 'simulator', date: '09.12.2025', time: '15:10', duration: '20 dəq', correctCount: 16, totalCount: 20, score: 82, status: 'passed', label: 'SINAQ DYP İMTAHANI' },
    { id: 103, type: 'simulator', date: '05.12.2025', time: '16:45', duration: '25 dəq', correctCount: 13, totalCount: 20, score: 68, status: 'failed', label: 'SINAQ DYP İMTAHANI' },
  ];

  const finalResults = [
    { id: 401, type: 'final', date: '14.12.2025', time: '09:00', duration: '28 dəq', correctCount: 19, totalCount: 20, score: 95, status: 'passed', label: 'Final İmtahanı' },
    { id: 402, type: 'final', date: '13.12.2025', time: '14:30', duration: '30 dəq', correctCount: 17, totalCount: 20, score: 85, status: 'passed', label: 'Final İmtahanı' },
  ];

  const topicResults = [
    { id: 201, type: 'topic', date: '10.12.2025', time: '11:20', duration: '12 dəq', correctCount: 10, totalCount: 10, score: 100, status: 'passed', label: 'Mövzu 3: Yol nişanları' },
    { id: 202, type: 'topic', date: '08.12.2025', time: '14:30', duration: '15 dəq', correctCount: 9, totalCount: 10, score: 90, status: 'passed', label: 'Mövzu 2: Ümumi müddəalar' },
  ];

  const ticketResults = [
    { id: 301, type: 'ticket', date: '12.12.2025', time: '09:15', duration: '10 dəq', correctCount: 8, totalCount: 10, score: 80, status: 'passed', label: 'Bilet №5' },
    { id: 302, type: 'ticket', date: '11.12.2025', time: '18:00', duration: '14 dəq', correctCount: 6, totalCount: 10, score: 60, status: 'failed', label: 'Bilet №2' },
    { id: 303, type: 'ticket', date: '10.12.2025', time: '12:45', duration: '9 dəq', correctCount: 10, totalCount: 10, score: 100, status: 'passed', label: 'Bilet №1' },
  ];

  // Combine all for lookup in detail view
  const allResults = useMemo(() => [...simulatorResults, ...finalResults, ...topicResults, ...ticketResults], []);

  // Determine current list to show
  const currentList = activeTab === 'simulator' ? simulatorResults
                    : activeTab === 'final' ? finalResults
                    : activeTab === 'topic' ? topicResults
                    : ticketResults;

  // Mock Questions for Detail View
  const mockQuestions = useMemo(() => {
    return Array(10).fill(null).map((_, i) => {
        const options = ['A', 'B', 'C', 'D'];
        const correctOpt = options[Math.floor(Math.random() * options.length)];
        const isCorrect = Math.random() > 0.3;
        let userOpt = correctOpt;

        // Sometimes unanswered for variety
        const isUnanswered = Math.random() > 0.9;

        if (isUnanswered) {
            userOpt = null;
        } else if (!isCorrect) {
            const wrongOptions = options.filter(o => o !== correctOpt);
            userOpt = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        }

        return {
            id: i + 1,
            text: `Sual #${i + 1}. Aşağıdakı nişan nəyi bildirir?`,
            image: "https://images.unsplash.com/photo-1566576912902-192f89a9418e?auto=format&fit=crop&q=80&w=1000",
            isCorrect: isUnanswered ? false : isCorrect,
            isUnanswered: isUnanswered,
            userAnswer: userOpt,
            correctAnswer: correctOpt,
            options: ['Dayanmaq qadağandır', 'Giriş qadağandır', 'Sürət həddi', 'Ötmə qadağandır']
        };
    });
  }, []);

  if (selectedId) {
    // Detail View
    const result = allResults.find(r => r.id === selectedId) || { date: 'Unknown', time: '00:00', score: 0, label: 'Nəticə' };

    return (
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setSelectedId(null)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{result.label}</h2>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium"><Calendar className="w-3.5 h-3.5" /> {result.date}</span>
              <span className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium"><Clock className="w-3.5 h-3.5" /> {result.time}</span>
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-bold ${result.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {result.score}% {result.score >= 70 ? '(Keçdi)' : '(Kəsilmə)'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-8">
            {mockQuestions.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-6">
                  {/* Header: Status Badge */}
                  <div className="flex items-center justify-between">
                      <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${
                          q.isUnanswered
                          ? 'bg-gray-100 text-gray-600'
                          : q.isCorrect
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                      }`}>
                          {q.isUnanswered ? (
                              <>Cavablanmamış</>
                          ) : q.isCorrect ? (
                              <><CheckCircle className="w-4 h-4" /> Doğru</>
                          ) : (
                              <><XCircle className="w-4 h-4" /> Yanlış</>
                          )}
                      </div>
                  </div>

                  {/* Content: Image and Question Text Side-by-Side */}
                  {/* Desktop: Image Right (md:order-last), Text Left */}
                  {/* Mobile: Image Top (order-first default), Text Bottom */}
                  <div className="flex flex-col md:flex-row gap-8">
                      {/* Image Container */}
                      <div className="w-full md:w-1/3 flex-shrink-0 md:order-last">
                          <img
                            src={q.image}
                            alt={`Sual ${q.id}`}
                            className="w-full h-auto rounded-2xl object-cover border border-gray-100 shadow-sm"
                          />
                      </div>

                      {/* Text/Options Container */}
                      <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-6 text-xl leading-relaxed">{q.text}</h3>

                          <div className="space-y-3">
                            {q.options.map((optText, idx) => {
                                const optLabel = ['A', 'B', 'C', 'D'][idx];
                                let itemClass = "p-4 rounded-xl border-2 border-transparent bg-gray-50 flex items-center gap-4 transition-all hover:bg-gray-100 cursor-pointer";

                                const isUserAnswer = optLabel === q.userAnswer;
                                const isCorrectAnswer = optLabel === q.correctAnswer;

                                if (isUserAnswer) {
                                    itemClass = q.isCorrect
                                        ? "p-4 rounded-xl border-2 border-green-500 bg-green-50 flex items-center gap-4"
                                        : "p-4 rounded-xl border-2 border-red-500 bg-red-50 flex items-center gap-4";
                                } else if (isCorrectAnswer && !q.isCorrect) {
                                    itemClass = "p-4 rounded-xl border-2 border-green-500 bg-green-50 flex items-center gap-4";
                                }

                                return (
                                <div key={idx} className={itemClass}>
                                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold flex-shrink-0 shadow-sm ${
                                    isUserAnswer
                                        ? (q.isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white')
                                        : (isCorrectAnswer && !q.isCorrect ? 'bg-green-600 text-white' : 'bg-white text-gray-500 border border-gray-200')
                                    }`}>
                                    {optLabel}
                                    </span>
                                    <span className={`text-base font-medium ${isUserAnswer || isCorrectAnswer ? 'text-gray-900' : 'text-gray-700'}`}>{optText}</span>
                                </div>
                                );
                            })}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                              <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors text-sm font-bold">
                                  <Eye className="w-4 h-4" />
                                  İzaha bax
                              </button>
                              <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-colors text-sm font-bold">
                                  <MessageSquare className="w-4 h-4" />
                                  Appelyasiya ver
                              </button>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // List View
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
       <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="px-6 py-4 flex items-center gap-4">
            <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Nəticələrim</h2>
          </div>

          {/* Tabs - Pill Style */}
          <div className="px-6 pb-4 flex overflow-x-auto gap-3 hide-scrollbar">
            {[
                { id: 'simulator', label: 'SINAQ DYP İMTAHANI' },
                { id: 'final', label: 'FİNAL İMTAHANI' },
                { id: 'topic', label: 'MÖVZU İMTAHANI' },
                { id: 'ticket', label: 'BİLETLƏR' }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                        activeTab === tab.id
                        ? 'bg-green-600 text-white shadow-green-200'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">

             {activeTab === 'simulator' && (
                 <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                     <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                     </div>
                     <p className="text-sm text-amber-900 font-medium">
                         Sınaq DYP imtahanı üzrə nəticələr <span className="font-bold">7 gün</span> ərzində aktiv olur.
                     </p>
                 </div>
             )}

             <div className="grid gap-4">
                {currentList.map((result) => (
                <div
                    key={result.id}
                    onClick={() => setSelectedId(result.id)}
                    className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between group gap-4"
                >
                    <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                            result.score >= 70 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                            {result.type === 'simulator' && <Monitor className="w-7 h-7" />}
                            {result.type === 'final' && <Award className="w-7 h-7" />}
                            {result.type === 'topic' && <BookOpen className="w-7 h-7" />}
                            {result.type === 'ticket' && <Ticket className="w-7 h-7" />}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-lg">{result.label}</h4>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {result.date}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {result.time}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">{result.duration}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:pl-4 border-t sm:border-t-0 pt-4 sm:pt-0">
                        <div className="text-right hidden sm:block">
                            <span className="block text-base font-bold text-gray-900">
                                {result.correctCount}/{result.totalCount}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">Doğru</span>
                        </div>
                        <div className="text-right flex items-center gap-4">
                            <div className="text-right">
                                <span className={`block text-2xl font-bold tabular-nums ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                {result.score}%
                                </span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                                    result.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {result.score >= 70 ? 'Keçdi' : 'Kəsilmə'}
                                </span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 transition-colors" />
                        </div>
                    </div>
                </div>
                ))}

                {currentList.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Nəticə tapılmadı</h3>
                        <p className="text-gray-500 mt-1">Bu kateqoriya üzrə hələ heç bir imtahan verməmisiniz.</p>
                    </div>
                )}
             </div>
          </div>
        </main>
    </div>
  );
}
