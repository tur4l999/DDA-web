import { Home, BookOpen, FileText, BarChart3, Car, HelpCircle, FileCheck, CreditCard, ShoppingBag, Monitor, Calendar, AlertTriangle, Signpost, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { icon: Home, label: 'Əsas səhifə', page: 'dashboard' },
  { icon: BookOpen, label: 'Təlim mövzuları', page: 'topics' },
  { icon: Signpost, label: 'Yol nişanları', page: 'roadsigns' },
  { icon: Calendar, label: 'Onlayn dərslər', page: 'classes' },
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
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white border-r border-gray-200 transform transition-all duration-200 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'} w-64`}
      >
        <div className="flex flex-col h-full">
          <div className={`flex items-center border-b border-gray-200 transition-all duration-200 ${isCollapsed ? 'justify-center p-4' : 'justify-between p-6'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">DDA</span>
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">Digital Driving</h1>
                  <p className="text-xs text-gray-500 whitespace-nowrap">Academy</p>
                </div>
              )}
            </div>
            {/* Mobile close button only */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 pb-16">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => item.page && setCurrentPage(item.page)}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center text-left transition-colors ${
                    isCollapsed ? 'justify-center px-4 py-3' : 'space-x-3 px-6 py-4'
                  } ${
                    currentPage === item.page
                      ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-semibold text-lg">{item.label}</span>}
                </button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === index && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-50 pointer-events-none">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Collapse button at bottom - Desktop only */}
          <div className="hidden lg:block border-t border-gray-200">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`w-full flex items-center justify-center p-4 hover:bg-[#007A3A]/5 text-gray-600 hover:text-[#007A3A] transition-all ${
                isCollapsed ? 'px-4' : 'px-6'
              }`}
              title={isCollapsed ? 'Menyunu genişləndir' : 'Menyunu yığışdır'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                  <span className="text-sm font-semibold">Menyunu gizlət</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
