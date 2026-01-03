import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Activity, BookOpen, Target, Award, Clock, TrendingUp, X, CheckCircle, XCircle } from 'lucide-react';

export default function UserStatistics() {
  const [selectedExam, setSelectedExam] = useState(null);

  // Mock Data
  const weeklyActivityData = [
    { name: 'B.e', suallar: 45, dersler: 2 },
    { name: 'Ç.a', suallar: 30, dersler: 1 },
    { name: 'Çər', suallar: 60, dersler: 3 },
    { name: 'C.a', suallar: 25, dersler: 1 },
    { name: 'Cüm', suallar: 50, dersler: 2 },
    { name: 'Şən', suallar: 80, dersler: 4 },
    { name: 'Baz', suallar: 40, dersler: 1 },
  ];

  const questionStatsData = [
    { name: 'Düzgün', value: 340, color: '#009846' }, // Primary Green
    { name: 'Səhv', value: 45, color: '#E31E24' },    // Traffic Red
    { name: 'Həll edilməmiş', value: 115, color: '#E5E7EB' }, // Gray
  ];

  const examProgressData = [
    { name: '01.12 • 14:00', bal: 65 },
    { name: '03.12 • 09:30', bal: 72 },
    { name: '05.12 • 16:45', bal: 68 },
    { name: '07.12 • 11:20', bal: 85 },
    { name: '09.12 • 15:10', bal: 82 },
    { name: '11.12 • 10:00', bal: 94 },
  ];

  // Mock Exam Questions for Modal
  const mockExamQuestions = Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    text: `Yol hərəkəti qaydaları sual #${i + 1}`,
    isCorrect: Math.random() > 0.3,
    userAnswer: 'B',
    correctAnswer: 'B'
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl text-xs">
          <p className="font-bold text-gray-900 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleExamClick = (data) => {
    if (data && data.activePayload) {
      setSelectedExam({
        date: data.activePayload[0].payload.name,
        score: data.activePayload[0].payload.bal
      });
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">Şəxsi göstəricilər</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
          <Clock className="w-4 h-4" />
          <span>Son yenilənmə: Bu gün, 14:30</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">Tamamlanan Dərslər</p>
            <h4 className="text-2xl font-bold text-gray-900">24<span className="text-gray-400 text-lg font-normal">/35</span></h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Target className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">Ümumi Dəqiqlik</p>
            <h4 className="text-2xl font-bold text-gray-900">88%</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">İmtahan Şansı</p>
            <h4 className="text-2xl font-bold text-gray-900">Yüksək</h4>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-gray-900 text-sm">Həftəlik Aktivlik</h4>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="suallar" name="Həll edilən suallar" fill="#009846" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dersler" name="Tamamlanan dərslər" fill="#FECC00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Question Stats Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-gray-900 text-sm">Sual Statistikası</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
              <span className="text-xs text-gray-500">Düzgün</span>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-500">Səhv</span>
            </div>
          </div>
          <div className="h-64 w-full relative flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={questionStatsData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {questionStatsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-900">500</span>
              <span className="text-xs text-gray-500 font-medium">Ümumi Sual</span>
            </div>
          </div>
        </div>

        {/* Exam Simulation Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">İmtahan Simulyasiyası Nəticələri</h4>
              <p className="text-xs text-gray-500 mt-1">Son 6 imtahan cəhdi üzrə dinamika</p>
            </div>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-64 w-full cursor-pointer">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={examProgressData} onClick={handleExamClick}>
                <defs>
                  <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009846" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#009846" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} domain={[0, 100]} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="bal"
                  name="Nəticə (%)"
                  stroke="#009846"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBal)"
                  dot={{
                    r: 4,
                    strokeWidth: 2,
                    stroke: '#009846',
                    fill: '#fff',
                    cursor: 'pointer',
                    onClick: (props) => handleExamClick({ activePayload: [{ payload: props.payload }] })
                  }}
                  activeDot={{ r: 6, onClick: (e, payload) => handleExamClick({ activePayload: [payload] }) }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Exam Details Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">İmtahan Nəticələri</h3>
                <p className="text-xs text-gray-500">{selectedExam.date} • Nəticə: {selectedExam.score}%</p>
              </div>
              <button
                onClick={() => setSelectedExam(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                {mockExamQuestions.map((q) => (
                  <div key={q.id} className={`flex items-start gap-3 p-3 rounded-xl border ${q.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <div className={`mt-0.5 ${q.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                      {q.isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{q.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Sizin cavab: <span className="font-bold">{q.userAnswer}</span> • Düzgün cavab: <span className="font-bold">{q.correctAnswer}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setSelectedExam(null)}
                className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
