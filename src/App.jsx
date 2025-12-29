import { useState } from 'react'
import SidebarNew from './components/SidebarNew'
import DashboardNew from './components/DashboardNew'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNew 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <DashboardNew
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default App
