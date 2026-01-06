import React from 'react'
import { BookOpen, ChevronRight, CheckCircle2, Circle } from 'lucide-react'

export default function TopicsView({ onTopicClick }) {
  // Mock data with subtopics and progress
  const topics = [
    {
      id: 1,
      code: 'M1',
      title: 'Ümumi müddəalar',
      count: 15,
      progress: 45, // percent
      subTopics: []
    },
    {
      id: 2,
      code: 'M2',
      title: 'Yol hərəkəti iştirakçılarının vəzifələri',
      count: 20,
      progress: 60,
      subTopics: [
        { id: '2.1', title: 'NV-nin idarəetmə hüququ', completed: true },
        { id: '2.2', title: 'Yol hərəkəti iştirakçılarının vəzifələri', completed: false }
      ]
    },
    {
      id: 3,
      code: 'M3',
      title: 'Yol nişanları',
      count: 45,
      progress: 30,
      subTopics: [
        { id: '3.1', title: 'Xəbərdarlıq nişanları', completed: true },
        { id: '3.2', title: 'Üstünlük nişanları', completed: true },
        { id: '3.3', title: 'Qadağan nişanları', completed: false },
        { id: '3.4', title: 'Məlumatverici-göstərici nişanlar', completed: false },
      ]
    },
    { id: 4, code: 'M4', title: 'Yolun nişanlanma xətləri', count: 12, progress: 0, subTopics: [] },
    { id: 5, code: 'M5', title: 'Nizamlayıcının və svetoforların siqnalları', count: 18, progress: 10, subTopics: [] },
    { id: 6, code: 'M6', title: 'Xüsusi siqnalların tətbiqi', count: 10, progress: 0, subTopics: [] },
    { id: 7, code: 'M7', title: 'Qəza dayanma siqnalı', count: 8, progress: 0, subTopics: [] },
    { id: 8, code: 'M8', title: 'Hərəkətə başlama və manevretmə', count: 25, progress: 0, subTopics: [] },
    { id: 9, code: 'M9', title: 'NV-nin yolun hərəkət hissəsində yerləşməsi', count: 14, progress: 0, subTopics: [] },
    { id: 10, code: 'M10', title: 'Hərəkət sürəti', count: 16, progress: 0, subTopics: [] },
    { id: 11, code: 'M11', title: 'Ötmə və qarşılıqlı keçmə', count: 12, progress: 0, subTopics: [] },
    {
      id: 12,
      code: 'M12',
      title: 'Dayanma, durma və parklanma',
      count: 22,
      progress: 50,
      subTopics: [
        { id: '12.1', title: 'Dayanma və durma', completed: true },
        { id: '12.2', title: 'Parklanma', completed: false }
      ]
    },
    { id: 13, code: 'M13', title: 'Yolayrıcıların keçilməsi', count: 30, progress: 0, subTopics: [] },
    { id: 14, code: 'M14', title: 'Piyada keçidləri', count: 10, progress: 0, subTopics: [] },
    { id: 15, code: 'M15', title: 'Avtomagistrallarda hərəkət', count: 8, progress: 0, subTopics: [] },
    { id: 16, code: 'M16', title: 'Dəmiryol keçidlərində hərəkət', count: 12, progress: 0, subTopics: [] },
    { id: 24, code: 'M24', title: 'İlk tibbi yardım', count: 20, progress: 0, subTopics: [] },
    {
      id: 27,
      code: 'M27',
      title: 'Avtomobilin quruluşu',
      count: 25,
      progress: 20,
      subTopics: [
         { id: '27.1', title: 'Mühərrik', completed: true },
         { id: '27.2', title: 'Transmissiya', completed: false },
         { id: '27.3', title: 'Əyləc sistemi', completed: false },
      ]
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          onClick={() => onTopicClick(topic.id)}
          className="flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-card hover:border-primary-100 transition-all duration-300 group cursor-pointer overflow-hidden"
        >
          {/* Main Card Content */}
          <div className="flex items-center gap-4 p-4 pb-3">
            <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex flex-col items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
              <span>{topic.code}</span>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm truncate pr-2 group-hover:text-primary-700 transition-colors">
                {topic.title}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500 font-medium">{topic.count} sual</span>
                <span className="text-[10px] text-gray-400">•</span>
                <span className={`text-xs font-semibold ${topic.progress > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  {topic.progress}% tamamlanıb
                </span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-all shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-4">
             <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    topic.progress === 100 ? 'bg-green-500' : 'bg-primary-500'
                  }`}
                  style={{ width: `${topic.progress}%` }}
                ></div>
              </div>
          </div>

          {/* Subtopics */}
          {topic.subTopics && topic.subTopics.length > 0 && (
            <div className="px-4 pb-4 pt-1 border-t border-gray-50 bg-gray-50/30">
              <div className="space-y-2 mt-2">
                {topic.subTopics.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-2.5">
                    {sub.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    )}
                    <span className={`text-xs ${sub.completed ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                      {sub.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
