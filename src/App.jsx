import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import OnlineClasses from './components/OnlineClasses'
import TopicsPage from './components/Topics'
import PenaltiesPage from './components/PenaltiesPage'
import RoadSigns from './components/RoadSigns'
import Exam from './components/Exam'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />
      case 'classes':
        return <OnlineClasses onBack={() => setCurrentPage('dashboard')} />
      case 'topics':
        return <TopicsPage onBack={() => setCurrentPage('dashboard')} />
      case 'penalties':
        return <PenaltiesPage onBack={() => setCurrentPage('dashboard')} />
      case 'road-signs':
        return <RoadSigns />
      case 'exam':
        return <Exam onBack={() => setCurrentPage('dashboard')} />
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderContent()}
    </Layout>
  )
}

export default App
