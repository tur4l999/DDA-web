import { Home, BookOpen, FileText, BarChart3, Car, HelpCircle, FileCheck, CreditCard, ShoppingBag, Monitor, Calendar, AlertTriangle, X, ChevronLeft, ChevronRight, Octagon } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { icon: Home, label: 'Əsas səhifə', page: 'dashboard' },
  { icon: BookOpen, label: 'Təlim mövzuları', page: 'topics' },
  { icon: Calendar, label: 'Onlayn dərslər', page: 'classes' },
  { icon: Octagon, label: 'Yol nişanları', page: 'road-signs' },
  { icon: AlertTriangle, label: 'Cərimələr', page: 'penalties' },
  { icon: FileText, label: 'İmtahan', page: null },
  { icon: BarChart3, label: 'Nəticələrim', page: null },
  { icon: Car, label: 'Praktiki Təcrübə', page: null },
  { icon: HelpCircle, label: 'Sual-cavab', page: null },
  { icon: FileCheck, label: 'Appelyasiya', page: null },
  { icon: CreditCard, label: 'Ödənişlər', page: null },
  { icon: ShoppingBag, label: 'Online mağaza', page: null },
  { icon: Monitor, label: 'İmtahan simulyatoru', page: null },
]

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed, currentPage, setCurrentPage }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-20 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white border-r border-gray-100 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[80px]' : 'lg:w-72'} w-72 flex flex-col`}
      >
        <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center p-6' : 'justify-between px-8 py-8'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'}`}>
            <div className="w-10 h-10 bg-primary-600 rounded-xl shadow-lg shadow-primary-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-base font-bold text-gray-900 tracking-tight leading-tight">Digital Driving</h1>
                <p className="text-sm text-gray-500 font-medium">Academy</p>
              </div>
            )}
          </div>
          {/* Mobile close button only */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => item.page && setCurrentPage(item.page)}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center text-left transition-all duration-200 rounded-2xl ${
                  isCollapsed ? 'justify-center p-3' : 'space-x-3.5 px-4 py-3.5'
                } ${
                  currentPage === item.page
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-[22px] h-[22px] flex-shrink-0 transition-colors ${
                  currentPage === item.page ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} strokeWidth={currentPage === item.page ? 2.5 : 2} />
                
                {!isCollapsed && (
                  <span className={`font-medium text-[15px] ${
                    currentPage === item.page ? 'font-semibold' : ''
                  }`}>{item.label}</span>
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && hoveredItem === index && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Collapse button at bottom - Desktop only */}
        <div className="hidden lg:block p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full flex items-center justify-center p-3 rounded-2xl hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all duration-200 ${
              isCollapsed ? '' : 'px-4'
            }`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <div className="flex items-center gap-3">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Gizlət</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
