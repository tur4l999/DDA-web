const Progress = ({ 
  value = 0, 
  max = 100,
  size = 'md',
  showLabel = false,
  className = '' 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-primary-600">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]}`}>
        <div 
          className={`bg-primary-500 ${heights[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default Progress
