/**
 * Progress Bar Component
 * 
 * Variants: primary, success, warning
 * Sizes: sm, md, lg
 */
export default function Progress({ 
  value = 0, 
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
  ...props 
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const variants = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  }
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`flex-1 bg-neutral-100 rounded-full overflow-hidden ${sizes[size]}`} {...props}>
        <div 
          className={`h-full rounded-full transition-all duration-300 ${variants[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-neutral-600 min-w-[3ch] text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

/**
 * Progress Circle / Ring
 */
export function ProgressCircle({ 
  value = 0, 
  max = 100,
  size = 48,
  strokeWidth = 4,
  variant = 'primary',
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const colors = {
    primary: 'stroke-primary-500',
    success: 'stroke-success-500',
    warning: 'stroke-warning-500',
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-neutral-100"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={`${colors[variant]} transition-all duration-300`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-sm font-semibold text-neutral-700">
        {Math.round(percentage)}%
      </span>
    </div>
  )
}
