import React from 'react';

export default function PackagesScreen() {
  return (
    <div className="p-6 animate-in pb-20">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold mb-1">Paketini seç</div>
        <div className="text-sm text-gray-600">Bütün funksiyalara giriş əldə edin</div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-lg mb-4">
        <div className="font-bold text-xl mb-1">Pulsuz</div>
        <div className="text-3xl font-bold text-emerald-500 mb-4">0 AZN</div>
        <div className="space-y-2 mb-5 text-sm">
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>5 dərs</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>3 test gündə</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Reklam var</span>
          </div>
        </div>
        <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl">
          Cari paket
        </button>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-lg mb-4 border-2 border-emerald-500 relative">
        <div className="absolute -top-3 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Ən çox seçilən
        </div>
        <div className="font-bold text-xl mb-1">Standart</div>
        <div className="text-3xl font-bold text-emerald-500 mb-1">9.99 AZN</div>
        <div className="text-xs text-gray-500 mb-4">Aylıq</div>
        <div className="space-y-2 mb-5 text-sm">
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Bütün dərslər</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Limitsiz testlər</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Reklamsız</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Offline rejim</span>
          </div>
        </div>
        <button className="w-full bg-emerald-500 text-white font-semibold py-3 rounded-xl hover:bg-emerald-600 transition">
          İndi al
        </button>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-lg">
        <div className="font-bold text-xl mb-1">Premium</div>
        <div className="text-3xl font-bold text-emerald-500 mb-1">89.99 AZN</div>
        <div className="text-xs text-gray-500 mb-4">İllik (7.49 AZN/ay)</div>
        <div className="space-y-2 mb-5 text-sm">
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Standart + ...</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Prioritet dəstək</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>Müəllim rejimi</span>
          </div>
          <div className="flex items-center">
            <span className="text-emerald-500 mr-2">✓</span>
            <span>3D video dərslər</span>
          </div>
        </div>
        <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition">
          İndi al
        </button>
      </div>
    </div>
  );
}
