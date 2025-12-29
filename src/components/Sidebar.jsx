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
      {/* Modern overlay with subtle blur */}
      <div
        className={`fixed inset-0 bg-neutral-900/30 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'} w-64 shadow-soft-lg lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          {/* Header with modern styling */}
          <div className={`flex items-center transition-all duration-200 ${isCollapsed ? 'justify-center p-4' : 'justify-between px-6 py-5'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-soft-md">
                <span className="text-white font-bold text-xl">DDA</span>
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <h1 className="text-base font-semibold text-neutral-900 whitespace-nowrap">Digital Driving</h1>
                  <p className="text-base font-semibold text-neutral-900 whitespace-nowrap">Academy</p>
                </div>
              )}
            </div>
            {/* Mobile close button only */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-neutral-500 hover:text-neutral-700 transition-colors p-1 rounded-lg hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation with modern styling */}
          <nav className="flex-1 overflow-y-auto py-2 px-3 pb-16">
            {menuItems.map((item, index) => (
              <div key={index} className="relative mb-1">
                <button
                  onClick={() => item.page && setCurrentPage(item.page)}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center text-left transition-smooth rounded-xl ${
                    isCollapsed ? 'justify-center px-3 py-3' : 'space-x-3 px-4 py-3'
                  } ${
                    currentPage === item.page
                      ? 'bg-primary-50 text-primary-700 shadow-soft'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={currentPage === item.page ? 2 : 1.5} />
                  {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                </button>
                
                {/* Modern tooltip for collapsed state */}
                {isCollapsed && hoveredItem === index && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-neutral-900 text-white px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap shadow-soft-lg z-50 pointer-events-none animate-fade-in">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-neutral-900"></div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Modern collapse button at bottom - Desktop only */}
          <div className="hidden lg:block px-3 pb-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`w-full flex items-center justify-center p-3 rounded-xl hover:bg-primary-50 text-neutral-600 hover:text-primary-600 transition-smooth ${
                isCollapsed ? 'px-3' : 'px-4'
              }`}
              title={isCollapsed ? 'Menyunu genişləndir' : 'Menyunu yığışdır'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                  <span className="text-xs font-medium">Menyunu gizlət</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
