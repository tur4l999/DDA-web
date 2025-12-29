import { Home, BookOpen, Calendar, Octagon, AlertTriangle, FileText, BarChart3, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { icon: Home, label: 'Əsas səhifə', page: 'dashboard' },
  { icon: BookOpen, label: 'Təlim mövzuları', page: 'topics' },
  { icon: Calendar, label: 'Onlayn dərslər', page: 'classes' },
  { icon: Octagon, label: 'Yol nişanları', page: 'road-signs' },
  { icon: AlertTriangle, label: 'Cərimələr', page: 'penalties' },
  { icon: FileText, label: 'İmtahan', page: null, badge: 'Tezliklə' },
  { icon: BarChart3, label: 'Nəticələrim', page: null },
]

export default function SidebarNew({ isOpen, setIsOpen, isCollapsed, setIsCollapsed, currentPage, setCurrentPage }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 bg-white border-r border-gray-100 transform transition-all duration-200 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`border-b border-gray-100 transition-all duration-200 ${isCollapsed ? 'p-4' : 'p-6'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
              <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                {!isCollapsed && (
                  <div>
                    <h1 className="text-base font-semibold text-gray-900">Digital Driving</h1>
                    <p className="text-xs text-gray-500">Academy</p>
                  </div>
                )}
              </div>
              
              {/* Mobile close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => {
                      if (item.page) {
                        setCurrentPage(item.page)
                        setIsOpen(false)
                      }
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    disabled={!item.page}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-sm font-medium transition-colors
                      ${isCollapsed ? 'justify-center' : ''}
                      ${currentPage === item.page
                        ? 'bg-primary-50 text-primary-700'
                        : item.page 
                          ? 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          : 'text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === index && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg z-50 pointer-events-none">
                      {item.label}
                      {item.badge && <span className="ml-2 opacity-60">({item.badge})</span>}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Collapse toggle - Desktop only */}
          <div className="hidden lg:block border-t border-gray-100">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              title={isCollapsed ? 'Genişləndir' : 'Yığışdır'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 mx-auto" strokeWidth={2} />
              ) : (
                <>
                  <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                  <span>Yığışdır</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
