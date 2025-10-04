import React from 'react';

export default function LearnScreen() {
  return (
    <div className="p-6 animate-in pb-20">
      <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
        <div className="flex items-center mb-3">
          <div className="text-4xl mr-4">🚦</div>
          <div className="flex-1">
            <div className="font-bold text-lg">Yol Hərəkəti Qaydaları</div>
            <div className="text-sm text-gray-500">3 dərs · 45%</div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: '45%' }}></div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between py-2 border-t cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2">
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-center leading-8 text-sm font-semibold mr-3">1</div>
              <div>
                <div className="font-medium text-sm">Piyada Keçidi</div>
                <div className="text-xs text-gray-500">5 dəq</div>
              </div>
            </div>
            <div className="text-emerald-500 text-lg">✓</div>
          </div>
          <div className="flex items-center justify-between py-2 border-t cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2">
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-center leading-8 text-sm font-semibold mr-3">2</div>
              <div>
                <div className="font-medium text-sm">Sürət Məhdudiyyətləri</div>
                <div className="text-xs text-gray-500">4 dəq</div>
              </div>
            </div>
            <div className="text-yellow-500 text-lg">⏸</div>
          </div>
          <div className="flex items-center justify-between py-2 border-t cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2">
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-center leading-8 text-sm font-semibold mr-3">3</div>
              <div>
                <div className="font-medium text-sm">Manevr Qaydaları</div>
                <div className="text-xs text-gray-500">6 dəq</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
        <div className="flex items-center mb-3">
          <div className="text-4xl mr-4">🪧</div>
          <div className="flex-1">
            <div className="font-bold text-lg">Yol Nişanları</div>
            <div className="text-sm text-gray-500">2 dərs · 0%</div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full"></div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center mb-3">
          <div className="text-4xl mr-4">🚗</div>
          <div className="flex-1">
            <div className="font-bold text-lg">Texniki Vəziyyət</div>
            <div className="text-sm text-gray-500">2 dərs · 0%</div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
