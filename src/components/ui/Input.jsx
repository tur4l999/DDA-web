import { forwardRef } from 'react'
import { Search } from 'lucide-react'

/**
 * Input Component
 * 
 * With optional search icon and error state
 */
const Input = forwardRef(({ 
  type = 'text',
  placeholder,
  error,
  className = '',
  leftIcon,
  ...props 
}, ref) => {
  const baseStyles = 'w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl text-neutral-800 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 min-h-[44px]'
  
  const errorStyles = error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : ''

  if (leftIcon) {
    return (
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          {leftIcon}
        </div>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${baseStyles} ${errorStyles} pl-11 ${className}`}
          {...props}
        />
      </div>
    )
  }

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`${baseStyles} ${errorStyles} ${className}`}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input

/**
 * Search Input - Preset with search icon
 */
export function SearchInput({ placeholder = 'Axtar...', className = '', ...props }) {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      leftIcon={<Search className="w-5 h-5" />}
      className={className}
      {...props}
    />
  )
}
