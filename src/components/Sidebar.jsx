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
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white flex flex-col transform transition-all duration-200 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'} w-64`}
        style={{ 
          boxShadow: isOpen ? '0 0 40px rgba(0,0,0,0.1)' : 'none' 
        }}
      >
        {/* Header */}
        <div className={`flex items-center border-b border-neutral-100 transition-all duration-200 ${
          isCollapsed ? 'justify-center p-4' : 'justify-between px-5 py-4'
        }`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="text-base font-bold text-neutral-800 whitespace-nowrap">Digital Driving</h1>
                <p className="text-xs text-neutral-500 whitespace-nowrap">Academy</p>
              </div>
            )}
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 -m-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = currentPage === item.page
              
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => item.page && setCurrentPage(item.page)}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    disabled={!item.page}
                    className={`w-full flex items-center rounded-xl transition-all duration-150 ${
                      isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                    } ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : item.page
                          ? 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                          : 'text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <item.icon 
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? 'text-primary-600' : ''
                      }`} 
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    {!isCollapsed && (
                      <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                        {item.label}
                      </span>
                    )}
                    
                    {/* Active indicator */}
                    {isActive && !isCollapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === index && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-neutral-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-50 pointer-events-none animate-fade-in">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-800" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Collapse Button - Desktop only */}
        <div className="hidden lg:block border-t border-neutral-100 p-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full flex items-center rounded-xl p-3 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-all ${
              isCollapsed ? 'justify-center' : 'gap-3'
            }`}
            title={isCollapsed ? 'Menyunu genişləndir' : 'Menyunu yığışdır'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">Menyunu gizlət</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
