/**
 * Chip / Filter Chip Component
 * 
 * For filter toggles and selections
 */
export default function Chip({ 
  children, 
  active = false,
  onClick,
  leftIcon,
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer min-h-[32px]'
  
  const stateStyles = active 
    ? 'border-primary-200 bg-primary-50 text-primary-700 hover:border-primary-300 hover:bg-primary-100'
    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${stateStyles} ${className}`}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  )
}

/**
 * Chip Group - For organizing multiple chips
 */
export function ChipGroup({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  )
}
