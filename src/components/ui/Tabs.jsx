import { createContext, useContext, useState } from 'react'

const TabsContext = createContext(null)

/**
 * Tabs Component - Segmented Control Style
 */
export function Tabs({ children, defaultValue, value, onChange, className = '' }) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue
  
  const handleChange = (newValue) => {
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onChange: handleChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

/**
 * Tabs List - Container for tabs
 */
export function TabsList({ children, className = '' }) {
  return (
    <div className={`inline-flex p-1 bg-neutral-100 rounded-xl ${className}`}>
      {children}
    </div>
  )
}

/**
 * Tab Trigger - Individual tab button
 */
export function TabsTrigger({ children, value, icon, disabled = false, className = '' }) {
  const context = useContext(TabsContext)
  const isActive = context?.value === value
  
  const baseStyles = 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2'
  const activeStyles = isActive 
    ? 'bg-white text-neutral-800 shadow-sm' 
    : 'text-neutral-500 hover:text-neutral-700'
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && context?.onChange(value)}
      className={`${baseStyles} ${activeStyles} ${disabledStyles} ${className}`}
    >
      {icon}
      {children}
    </button>
  )
}

/**
 * Tab Content - Content for each tab
 */
export function TabsContent({ children, value, className = '' }) {
  const context = useContext(TabsContext)
  
  if (context?.value !== value) return null
  
  return (
    <div className={`animate-fade-in ${className}`}>
      {children}
    </div>
  )
}
