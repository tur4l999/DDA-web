import React from 'react';

export default function SimulatorScreen() {
  return (
    <div className="p-6 animate-in pb-20">
      <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
        <div className="font-bold text-lg mb-3">Statistikanız</div>
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-500">85%</div>
            <div className="text-xs text-gray-500 mt-1">Ən yaxşı</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-500">72%</div>
            <div className="text-xs text-gray-500 mt-1">Orta</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-700">12</div>
            <div className="text-xs text-gray-500 mt-1">Cəhdlər</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-lg mb-4">
        <div className="flex items-start mb-4">
          <div className="text-5xl mr-4">🎯</div>
          <div className="flex-1">
            <div className="font-bold text-xl mb-1">İmtahan rejimi</div>
            <div className="text-sm text-gray-600">10 sual · 15 dəqiqə</div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <span className="mr-2">⏱</span>
            <span>15 dəqiqə limit</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">❌</span>
            <span>Geri qayıtmaq olmaz</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            <span>Real imtahan şəraiti</span>
          </div>
        </div>

        <button className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-xl hover:bg-emerald-600 transition">
          İmtahana başla
        </button>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-lg">
        <div className="flex items-start mb-4">
          <div className="text-5xl mr-4">📝</div>
          <div className="flex-1">
            <div className="font-bold text-xl mb-1">Məşq rejimi</div>
            <div className="text-sm text-gray-600">Dərhal cavab öyrən</div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <span className="mr-2">⏸</span>
            <span>Müddət limiti yoxdur</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">💡</span>
            <span>Dərhal izah alın</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📚</span>
            <span>Öyrənmək üçün ideal</span>
          </div>
        </div>

        <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition">
          Məşqə başla
        </button>
      </div>
    </div>
  );
}
