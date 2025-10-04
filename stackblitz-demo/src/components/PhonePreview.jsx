import React from 'react';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import SimulatorScreen from './screens/SimulatorScreen';
import PackagesScreen from './screens/PackagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import TabBar from './TabBar';

const screens = {
  home: HomeScreen,
  learn: LearnScreen,
  simulator: SimulatorScreen,
  packages: PackagesScreen,
  profile: ProfileScreen,
};

export default function PhonePreview({ currentScreen, onScreenChange }) {
  const ScreenComponent = screens[currentScreen];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2">📱 Live Preview</h2>
        <p className="text-gray-600">Ekranlara baxın və test edin</p>
      </div>
      
      <div className="phone-frame">
        <div className="screen">
          <ScreenComponent />
        </div>
        
        <TabBar currentScreen={currentScreen} onScreenChange={onScreenChange} />
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center max-w-md">
        💡 Real React Native proyekti üçün: <code className="bg-gray-200 px-2 py-1 rounded">npm install && npm start</code>
      </div>
    </div>
  );
}
