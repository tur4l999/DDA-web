const Tabs = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`inline-flex p-1 bg-gray-100 rounded-lg ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-all
            ${activeTab === tab.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {tab.icon && <tab.icon className="w-4 h-4 inline-block mr-2" />}
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
