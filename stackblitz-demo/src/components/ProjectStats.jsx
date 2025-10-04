import React from 'react';

export default function ProjectStats() {
  return (
    <div className="mt-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg shadow-xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📊 Proyekt Statistikası</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold">80+</div>
          <div className="text-emerald-100">Fayllar</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">15</div>
          <div className="text-emerald-100">Ekranlar</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">8K+</div>
          <div className="text-emerald-100">Kod Sətri</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">100%</div>
          <div className="text-emerald-100">TypeScript</div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="text-lg mb-2">🚀 Real React Native proyekti işə salmaq üçün:</div>
        <code className="bg-emerald-700 px-4 py-2 rounded-lg inline-block">
          npm install && npm start
        </code>
      </div>
    </div>
  );
}
