import React, { useState } from 'react';
import { 
  Home, BookOpen, Calendar, Octagon, AlertTriangle, FileText, 
  Menu, X, Bell, Settings, Search, LogOut
} from 'lucide-react';
import { Button } from './ui/Button';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Əsas səhifə', icon: Home },
  { id: 'topics', label: 'Təlim mövzuları', icon: BookOpen },
  { id: 'classes', label: 'Onlayn dərslər', icon: Calendar },
  { id: 'road-signs', label: 'Yol nişanları', icon: Octagon },
  { id: 'penalties', label: 'Cərimələr', icon: AlertTriangle },
  { id: 'exam', label: 'İmtahan', icon: FileText },
];

function Sidebar({ currentPage, setCurrentPage, isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200
          transform transition-transform duration-300 ease-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-600/20">
                DA
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 leading-tight">Digital</span>
                <span className="font-bold text-slate-900 leading-tight">Academy</span>
              </div>
            </div>
            <button onClick={onClose} className="ml-auto lg:hidden text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    text-sm font-medium
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Profile / Footer */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                TQ
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">Tural Qarayev</p>
                <p className="text-xs text-slate-500 truncate">Student</p>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Layout({ currentPage, setCurrentPage, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 lg:h-20">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold text-slate-900 lg:hidden">
                {NAV_ITEMS.find(item => item.id === currentPage)?.label || 'Digital Academy'}
              </h1>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center w-64 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Axtar..." 
                  className="bg-transparent border-none outline-none text-sm ml-2 w-full text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
