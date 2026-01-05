import React from 'react'
import { BookOpen, ChevronRight } from 'lucide-react'

export default function TopicsView({ onTopicClick }) {
  // Mock data based on provided memory/files
  const topics = [
    { id: 1, code: 'M1', title: 'Ümumi müddəalar', count: 15 },
    { id: 2, code: 'M2', title: 'Yol hərəkəti iştirakçılarının vəzifələri', count: 20 },
    { id: 3, code: 'M3', title: 'Yol nişanları', count: 45 },
    { id: 4, code: 'M4', title: 'Yolun nişanlanma xətləri', count: 12 },
    { id: 5, code: 'M5', title: 'Nizamlayıcının və svetoforların siqnalları', count: 18 },
    { id: 6, code: 'M6', title: 'Xüsusi siqnalların tətbiqi', count: 10 },
    { id: 7, code: 'M7', title: 'Qəza dayanma siqnalı', count: 8 },
    { id: 8, code: 'M8', title: 'Hərəkətə başlama və manevretmə', count: 25 },
    { id: 9, code: 'M9', title: 'NV-nin yolun hərəkət hissəsində yerləşməsi', count: 14 },
    { id: 10, code: 'M10', title: 'Hərəkət sürəti', count: 16 },
    { id: 11, code: 'M11', title: 'Ötmə və qarşılıqlı keçmə', count: 12 },
    { id: 12, code: 'M12', title: 'Dayanma, durma və parklanma', count: 22 },
    { id: 13, code: 'M13', title: 'Yolayrıcıların keçilməsi', count: 30 },
    { id: 14, code: 'M14', title: 'Piyada keçidləri', count: 10 },
    { id: 15, code: 'M15', title: 'Avtomagistrallarda hərəkət', count: 8 },
    { id: 16, code: 'M16', title: 'Dəmiryol keçidlərində hərəkət', count: 12 },
    { id: 24, code: 'M24', title: 'İlk tibbi yardım', count: 20 },
    { id: 27, code: 'M27', title: 'Avtomobilin quruluşu', count: 25 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onTopicClick(topic.id)}
          className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-card hover:border-primary-100 transition-all duration-300 group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex flex-col items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
            <span>{topic.code}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm truncate pr-2 group-hover:text-primary-700 transition-colors">
              {topic.title}
            </h4>
            <span className="text-xs text-gray-500 font-medium">{topic.count} sual</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-all shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      ))}
    </div>
  )
}
