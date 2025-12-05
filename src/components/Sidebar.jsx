import { Home, BookOpen, FileText, BarChart3, Car, HelpCircle, FileCheck, CreditCard, ShoppingBag, Monitor, X } from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Əsas səhifə', active: true },
  { icon: BookOpen, label: 'Təlim mövzuları', active: false },
  { icon: FileText, label: 'İmtahan', active: false },
  { icon: BarChart3, label: 'Nəticələrim', active: false },
  { icon: Car, label: 'Praktiki Təcrübə', active: false },
  { icon: HelpCircle, label: 'Sual-cavab', active: false },
  { icon: FileCheck, label: 'Appelyasiya', active: false },
  { icon: CreditCard, label: 'Ödənişlər', active: false },
  { icon: ShoppingBag, label: 'Online mağaza', active: false },
  { icon: Monitor, label: 'İmtahan simulyatoru', active: false },
]

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DDA</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Digital Driving</h1>
                <p className="text-xs text-gray-500">Academy</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${
                  item.active
                    ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-semibold text-lg">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
