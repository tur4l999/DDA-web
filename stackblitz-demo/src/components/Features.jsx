import React from 'react';

export default function Features() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Xüsusiyyətlər</h2>
      <div className="space-y-3">
        <div className="flex items-start">
          <span className="text-2xl mr-3">✅</span>
          <div>
            <div className="font-semibold">15 Ekran Tamamlandı</div>
            <div className="text-sm text-gray-600">Onboarding, Auth, Home, Learn, Simulator, Packages...</div>
          </div>
        </div>
        <div className="flex items-start">
          <span className="text-2xl mr-3">🌍</span>
          <div>
            <div className="font-semibold">3 Dil Dəstəyi</div>
            <div className="text-sm text-gray-600">Azərbaycan (defolt), English, Русский</div>
          </div>
        </div>
        <div className="flex items-start">
          <span className="text-2xl mr-3">📝</span>
          <div>
            <div className="font-semibold">30+ Sual Bankı</div>
            <div className="text-sm text-gray-600">İzahlarla, kateqoriyalarla</div>
          </div>
        </div>
        <div className="flex items-start">
          <span className="text-2xl mr-3">🎯</span>
          <div>
            <div className="font-semibold">İmtahan Simulyatoru</div>
            <div className="text-sm text-gray-600">10 sual • 15 dəqiqə • Real şərait</div>
          </div>
        </div>
        <div className="flex items-start">
          <span className="text-2xl mr-3">💎</span>
          <div>
            <div className="font-semibold">Premium Paketlər</div>
            <div className="text-sm text-gray-600">Pulsuz, Standart, Premium</div>
          </div>
        </div>
      </div>
    </div>
  );
}
