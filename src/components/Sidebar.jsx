import { Home, BookOpen, FileText, BarChart3, Car, HelpCircle, FileCheck, CreditCard, ShoppingBag, Monitor, Calendar, AlertTriangle, X, ChevronLeft, ChevronRight, Octagon, FileBadge } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { icon: Home, label: 'Əsas səhifə', page: 'dashboard' },
  { icon: BookOpen, label: 'Təlim mövzuları', page: 'topics' },
  { icon: Calendar, label: 'Onlayn dərslər', page: 'classes' },
  { icon: Octagon, label: 'Yol nişanları', page: 'road-signs' },
  { icon: AlertTriangle, label: 'Cərimələr', page: 'penalties' },
  { icon: FileText, label: 'İmtahan', page: null },
  { icon: BarChart3, label: 'Nəticələrim', page: 'results' },
  { icon: FileBadge, label: 'Şəhadətnamə', page: 'certificate' },
  { icon: Car, label: 'Praktiki Təcrübə', page: 'practical-experience' },
  { icon: HelpCircle, label: 'Sual-cavab', page: 'qa' },
  { icon: FileCheck, label: 'Appelyasiya', page: null },
  { icon: CreditCard, label: 'Ödənişlər', page: null },
  { icon: ShoppingBag, label: 'Online mağaza', page: null },
  { icon: Monitor, label: 'İmtahan simulyatoru', page: null },
]

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed, currentPage, setCurrentPage }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-gray-50 lg:bg-transparent transform transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1) ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[88px]' : 'lg:w-[260px]'} w-[260px] flex flex-col h-full lg:h-screen lg:sticky lg:top-0`}
      >
        <div className="flex flex-col h-full lg:p-3">
          <div className={`h-full flex flex-col bg-white lg:rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden transition-all duration-500`}>
            
            {/* Header / Logo */}
            <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center p-5' : 'justify-between px-6 py-6'}`}>
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-primary-500/20 transform hover:scale-105 transition-transform duration-300">
                   <Car className="w-4.5 h-4.5 text-white" />
                </div>
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-gray-900 tracking-tight leading-none">Digital</h1>
                    <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase mt-1">Academy</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
              {menuItems.map((item, index) => {
                 const isActive = currentPage === item.page;
                 return (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => item.page && setCurrentPage(item.page)}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`w-full flex items-center transition-all duration-300 rounded-xl ${
                        isCollapsed ? 'justify-center p-2.5' : 'px-4 py-3 gap-3'
                      } ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-semibold'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon 
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'
                        } ${isCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5'}`}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                      
                      {!isCollapsed && (
                        <span className={`text-[14px] ${isActive ? 'translate-x-0.5' : ''} transition-transform`}>
                          {item.label}
                        </span>
                      )}

                      {!isCollapsed && isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]" />
                      )}
                    </button>
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && hoveredItem === index && (
                      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                        {item.label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-gray-800"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-3 mt-auto">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`w-full flex items-center justify-center p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-300 group`}
                title={isCollapsed ? 'Menyunu genişləndir' : 'Menyunu yığışdır'}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
                ) : (
                  <div className="flex items-center gap-2">
                    <ChevronLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
                    <span className="text-xs font-medium">Gizlət</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
