import { forwardRef } from 'react'

/**
 * Button Component
 * 
 * Variants: primary, secondary, ghost, outline, success, danger
 * Sizes: sm, md, lg
 */
const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500 shadow-sm',
    secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible:ring-neutral-400',
    ghost: 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 focus-visible:ring-neutral-400',
    outline: 'bg-transparent border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 focus-visible:ring-neutral-400',
    success: 'bg-success-600 text-white hover:bg-success-500 focus-visible:ring-success-500 shadow-sm',
    danger: 'bg-error-600 text-white hover:bg-error-500 focus-visible:ring-error-500 shadow-sm',
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2.5 text-sm min-h-[44px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : leftIcon}
      {children}
      {rightIcon}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
