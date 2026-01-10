import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock, Award, ChevronRight, AlertCircle, Monitor, BookOpen, Ticket } from 'lucide-react';

export default function ResultsPage({ resultId, onBack }) {
  const [selectedId, setSelectedId] = useState(resultId);
  const [activeTab, setActiveTab] = useState('final'); // 'final', 'topic', 'ticket'

  // Mock Data
  const finalResults = [
    { id: 101, type: 'final', date: '11.12.2025', time: '10:00', score: 94, status: 'passed', label: 'Final İmtahanı' },
    { id: 102, type: 'final', date: '09.12.2025', time: '15:10', score: 82, status: 'passed', label: 'Final İmtahanı' },
    { id: 103, type: 'final', date: '05.12.2025', time: '16:45', score: 68, status: 'failed', label: 'Final İmtahanı' },
  ];

  const topicResults = [
    { id: 201, type: 'topic', date: '10.12.2025', time: '11:20', score: 100, status: 'passed', label: 'Mövzu 3: Yol nişanları' },
    { id: 202, type: 'topic', date: '08.12.2025', time: '14:30', score: 90, status: 'passed', label: 'Mövzu 2: Ümumi müddəalar' },
  ];

  const ticketResults = [
    { id: 301, type: 'ticket', date: '12.12.2025', time: '09:15', score: 80, status: 'passed', label: 'Bilet №5' },
    { id: 302, type: 'ticket', date: '11.12.2025', time: '18:00', score: 60, status: 'failed', label: 'Bilet №2' },
    { id: 303, type: 'ticket', date: '10.12.2025', time: '12:45', score: 100, status: 'passed', label: 'Bilet №1' },
  ];

  // Combine all for lookup in detail view
  const allResults = useMemo(() => [...finalResults, ...topicResults, ...ticketResults], []);

  // Determine current list to show
  const currentList = activeTab === 'final' ? finalResults
                    : activeTab === 'topic' ? topicResults
                    : ticketResults;

  // Mock Questions for Detail View
  const mockQuestions = useMemo(() => {
    return Array(10).fill(null).map((_, i) => {
        const options = ['A', 'B', 'C', 'D'];
        const correctOpt = options[Math.floor(Math.random() * options.length)];
        const isCorrect = Math.random() > 0.3;
        let userOpt = correctOpt;

        if (!isCorrect) {
            const wrongOptions = options.filter(o => o !== correctOpt);
            userOpt = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        }

        return {
            id: i + 1,
            text: `Sual #${i + 1}. Aşağıdakı nişan nəyi bildirir?`,
            isCorrect: isCorrect,
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
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSelectedId(null)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{result.label}</h2>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {result.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {result.time}</span>
              <span className={`font-bold ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                {result.score}% {result.score >= 70 ? '(Keçdi)' : '(Kəsilmə)'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            {mockQuestions.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 flex-shrink-0 ${q.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {q.isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-4">{q.text}</h3>

                    <div className="space-y-3">
                      {q.options.map((optText, idx) => {
                         const optLabel = ['A', 'B', 'C', 'D'][idx];
                         let itemClass = "p-4 rounded-xl border border-gray-200 flex items-center gap-3";

                         const isUserAnswer = optLabel === q.userAnswer;
                         const isCorrectAnswer = optLabel === q.correctAnswer;

                         if (isUserAnswer) {
                            itemClass = q.isCorrect
                                ? "p-4 rounded-xl border border-green-200 bg-green-50 flex items-center gap-3"
                                : "p-4 rounded-xl border border-red-200 bg-red-50 flex items-center gap-3";
                         } else if (isCorrectAnswer && !q.isCorrect) {
                            itemClass = "p-4 rounded-xl border border-green-200 bg-green-50 flex items-center gap-3";
                         }

                         return (
                           <div key={idx} className={itemClass}>
                             <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                               isUserAnswer
                                 ? (q.isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700')
                                 : (isCorrectAnswer && !q.isCorrect ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-500')
                             }`}>
                               {optLabel}
                             </span>
                             <span className="text-gray-900 font-medium">{optText}</span>
                           </div>
                         );
                      })}
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
       <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center gap-4">
            <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-900">Nəticələrim</h2>
          </div>

          {/* Tabs */}
          <div className="px-6 flex overflow-x-auto gap-6 hide-scrollbar">
            <button
                onClick={() => setActiveTab('final')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'final'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                FİNAL İMTAHAN NƏTİCƏLƏRİ
            </button>
            <button
                onClick={() => setActiveTab('topic')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'topic'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                MÖVZU İMTAHAN NƏTİCƏLƏRİ
            </button>
            <button
                onClick={() => setActiveTab('ticket')}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === 'ticket'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
                BİLETLƏR ÜZRƏ NƏTİCƏLƏR
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">

             {activeTab === 'final' && (
                 <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                     <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                     <p className="text-sm text-yellow-800 font-medium">
                         İmtahan simulyatoru üzrə nəticələr 7 gün ərzində aktiv olur.
                     </p>
                 </div>
             )}

             <div className="grid gap-4">
                {currentList.map((result) => (
                <div
                    key={result.id}
                    onClick={() => setSelectedId(result.id)}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
                >
                    <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        result.score >= 70 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                        {result.type === 'final' && <Monitor className="w-6 h-6" />}
                        {result.type === 'topic' && <BookOpen className="w-6 h-6" />}
                        {result.type === 'ticket' && <Ticket className="w-6 h-6" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">{result.label}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                        <Calendar className="w-3.5 h-3.5" /> {result.date}
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <Clock className="w-3.5 h-3.5" /> {result.time}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-6">
                    <div className="text-right">
                        <span className={`block text-xl font-bold ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.score}%
                        </span>
                        <span className="text-xs font-medium text-gray-400">
                        {result.score >= 70 ? 'Keçdi' : 'Kəsilmə'}
                        </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 transition-colors" />
                    </div>
                </div>
                ))}

                {currentList.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Bu kateqoriya üzrə nəticə tapılmadı.</p>
                    </div>
                )}
             </div>
          </div>
        </main>
    </div>
  );
}
