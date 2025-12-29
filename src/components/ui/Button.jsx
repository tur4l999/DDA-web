import { forwardRef } from 'react'

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
  destructive: 'bg-error-500 hover:bg-error-600 text-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
