import React from 'react';

const tabs = [
  { id: 'home', icon: '🏠', label: 'Ana səhifə' },
  { id: 'learn', icon: '📚', label: 'Öyrən' },
  { id: 'simulator', icon: '🎯', label: 'Simulator' },
  { id: 'packages', icon: '💎', label: 'Paketlər' },
  { id: 'profile', icon: '👤', label: 'Profil' },
];

export default function TabBar({ currentScreen, onScreenChange }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white border-t border-gray-200 flex justify-around items-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onScreenChange(tab.id)}
          className={`flex flex-col items-center p-2 transition-all ${
            currentScreen === tab.id ? 'text-emerald-500' : 'text-gray-600'
          } hover:opacity-70`}
        >
          <span style={{ fontSize: '24px' }}>{tab.icon}</span>
          <span style={{ fontSize: '10px', marginTop: '2px' }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
