import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  Trophy,
  Target,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Brain
} from 'lucide-react';

export default function UserStats() {
  // Mock Data
  const weeklyActivity = [
    { name: 'B.E', questions: 45, correct: 38 },
    { name: 'Ç.A', questions: 52, correct: 48 },
    { name: 'Ç', questions: 38, correct: 25 },
    { name: 'C.A', questions: 65, correct: 60 },
    { name: 'C', questions: 48, correct: 45 },
    { name: 'Ş', questions: 70, correct: 62 },
    { name: 'B', questions: 55, correct: 50 },
  ];

  const topicPerformance = [
    { subject: 'Yol Nişanları', A: 120, B: 110, fullMark: 150 },
    { subject: 'Qaydalar', A: 98, B: 130, fullMark: 150 },
    { subject: 'Təhlükəsizlik', A: 86, B: 130, fullMark: 150 },
    { subject: 'Cərimələr', A: 99, B: 100, fullMark: 150 },
    { subject: 'Texniki', A: 85, B: 90, fullMark: 150 },
  ];

  const progressData = [
    { name: 'Tamamlanmış', value: 65, color: '#009846' },
    { name: 'Qalan', value: 35, color: '#E5E7EB' },
  ];

  const stats = [
    {
      title: 'Həll edilən Suallar',
      value: '1,245',
      subValue: 'Bu həftə +120',
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Orta Nəticə',
      value: '84%',
      subValue: 'Keçən həftəyə görə +2%',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Dərs Saatı',
      value: '14s 30d',
      subValue: 'Toplam vaxt',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'İmtahan Hazırlığı',
      value: '72%',
      subValue: 'Tövsiyə: 90%+',
      icon: Brain,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                {stat.subValue}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Həftəlik Aktivlik</h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className="flex items-center text-gray-500">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                Doğru
              </span>
              <span className="flex items-center text-gray-500">
                <span className="w-3 h-3 rounded-full bg-gray-200 mr-1"></span>
                Cəmi
              </span>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="questions" fill="#F3F4F6" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="correct" fill="#009846" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress & Weak Spots */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Ümumi İrəliləyiş</h3>

          <div className="flex items-center justify-between mb-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">65%</span>
              </div>
            </div>

            <div className="flex-1 ml-8 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Video Dərslər</span>
                  <span className="text-green-600 font-bold">8/12</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">Mövzu İmtahanları</span>
                  <span className="text-green-600 font-bold">15/24</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Zəif Mövzular (Diqqət!)</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                <AlertCircle className="w-3 h-3 mr-1" />
                Nizamlayıcı
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                <AlertCircle className="w-3 h-3 mr-1" />
                Ötmə qaydaları
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
