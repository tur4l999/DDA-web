import React from 'react';

export default function ProfileScreen() {
  return (
    <div className="p-6 animate-in pb-20">
      <div className="bg-white rounded-xl p-6 shadow-lg mb-4 text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
          İ
        </div>
        <div className="font-bold text-xl mb-1">İstifadəçi</div>
        <div className="text-sm text-gray-600 mb-3">+994 50 123 45 67</div>
        <div className="inline-block bg-emerald-50 px-4 py-1 rounded-full">
          <span className="text-sm font-semibold text-emerald-700">💎 Pulsuz</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
        <div className="flex justify-around">
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">3 🔥</div>
            <div className="text-xs text-gray-500">Ardıcıl gün</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">12</div>
            <div className="text-xs text-gray-500">Tamamlandı</div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">85%</div>
            <div className="text-xs text-gray-500">Orta bal</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition">
          <span className="text-2xl mr-3">⚙️</span>
          <div className="flex-1 font-medium">Parametrlər</div>
          <span className="text-2xl text-gray-400">›</span>
        </div>
        <div className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition">
          <span className="text-2xl mr-3">👨‍🏫</span>
          <div className="flex-1 font-medium">Müəllim Rejimi</div>
          <span className="text-2xl text-gray-400">›</span>
        </div>
        <div className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition">
          <span className="text-2xl mr-3">ℹ️</span>
          <div className="flex-1">
            <div className="font-medium">Haqqında</div>
            <div className="text-xs text-gray-500">Version 1.0.0</div>
          </div>
          <span className="text-2xl text-gray-400">›</span>
        </div>
        <div className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition">
          <span className="text-2xl mr-3">💬</span>
          <div className="flex-1">
            <div className="font-medium">Əlaqə</div>
            <div className="text-xs text-gray-500">WhatsApp dəstək</div>
          </div>
          <span className="text-2xl text-gray-400">›</span>
        </div>
      </div>

      <button className="w-full py-3 text-red-500 font-semibold hover:bg-red-50 rounded-lg transition">
        Çıxış
      </button>
    </div>
  );
}
