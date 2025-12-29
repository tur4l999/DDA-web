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
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'} w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center p-4' : 'justify-between p-5'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                <span className="text-white font-bold text-sm">DDA</span>
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <h1 className="text-base font-bold text-slate-900 whitespace-nowrap">Digital Driving</h1>
                  <p className="text-xs text-slate-500 whitespace-nowrap">Academy</p>
                </div>
              )}
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => item.page && setCurrentPage(item.page)}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center gap-3 text-left transition-all duration-200 rounded-xl ${
                      isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'
                    } ${
                      currentPage === item.page
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${
                      currentPage === item.page ? 'text-primary-600' : ''
                    }`} strokeWidth={1.75} />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                    
                    {/* Active indicator */}
                    {currentPage === item.page && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === index && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-soft-lg z-50 pointer-events-none animate-fade-in">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-slate-800"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Collapse button - Desktop only */}
          <div className="hidden lg:block p-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`w-full flex items-center gap-3 p-3 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-xl transition-all duration-200 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? 'Menyunu genişləndir' : 'Menyunu yığışdır'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
                  <span className="text-sm font-medium">Menyunu gizlət</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
