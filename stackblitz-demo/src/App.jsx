import React, { useState } from 'react';
import Header from './components/Header';
import PhonePreview from './components/PhonePreview';
import Features from './components/Features';
import ProjectStats from './components/ProjectStats';
import CodeViewer from './components/CodeViewer';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Phone Preview */}
          <PhonePreview currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
          
          {/* Right: Features & Code */}
          <div>
            <Features />
            <CodeViewer currentScreen={currentScreen} />
          </div>
        </div>

        <ProjectStats />
      </div>
    </div>
  );
}

export default App;
