import React from 'react';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">🚗 DDA.az Mobile</h1>
            <p className="text-emerald-100">Production-Ready React Native App • TypeScript • Expo</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">✅ Complete</div>
            <div className="text-sm">15 Screens • AZ/EN/RU</div>
          </div>
        </div>
      </div>
    </div>
  );
}
