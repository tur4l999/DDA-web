import React from 'react';

export default function HomeScreen() {
  return (
    <div className="p-6 animate-in">
      <div className="mb-6">
        <div className="text-2xl font-bold mb-1">Salam, İstifadəçi! 👋</div>
        <div className="text-gray-600 text-sm">Gündəlik məqsəd: 5 dəqiqə</div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-24 h-24 rounded-full border-8 border-emerald-500 flex items-center justify-center">
            <div className="text-2xl font-bold">65%</div>
          </div>
          <div className="flex-1 ml-6">
            <div className="font-semibold mb-2">Tərəqqiniz</div>
            <div className="text-sm text-gray-600 mb-3">5 / 8 Dərslər</div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="font-bold text-lg">3 🔥</div>
                <div className="text-xs text-gray-500">ardıcıl gün</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">85%</div>
                <div className="text-xs text-gray-500">Son nəticə</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-lg font-semibold mb-3">Tez keçidlər</div>

      <div className="bg-white rounded-xl p-4 shadow-md mb-3 flex items-center cursor-pointer hover:shadow-lg transition">
        <div className="text-3xl mr-4">📚</div>
        <div className="flex-1">
          <div className="font-semibold">Dərsi davam etdir</div>
          <div className="text-sm text-gray-500">Davam et</div>
        </div>
        <div className="text-2xl text-gray-400">›</div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md mb-3 flex items-center cursor-pointer hover:shadow-lg transition">
        <div className="text-3xl mr-4">🎯</div>
        <div className="flex-1">
          <div className="font-semibold">10 suallıq test</div>
          <div className="text-sm text-gray-500">10 sual · 15 dəq</div>
        </div>
        <div className="text-2xl text-gray-400">›</div>
      </div>

      <div className="bg-emerald-500 rounded-xl p-6 shadow-lg text-white text-center mt-6">
        <div className="text-4xl mb-2">💎</div>
        <div className="font-bold text-lg mb-1">Premium funksiyalar</div>
        <div className="text-sm opacity-90 mb-3">Bütün dərslərə giriş, reklamsız təcrübə</div>
        <div className="bg-white text-emerald-500 px-4 py-2 rounded-lg inline-block font-semibold text-sm cursor-pointer hover:bg-gray-100 transition">
          Bax →
        </div>
      </div>
    </div>
  );
}
