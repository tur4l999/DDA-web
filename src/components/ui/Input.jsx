import { forwardRef } from 'react'

const Input = forwardRef(({ 
  type = 'text',
  placeholder,
  error,
  icon: Icon,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 
          ${Icon ? 'pl-10' : ''}
          bg-white border rounded-lg
          text-gray-900 placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error ? 'border-error-500' : 'border-gray-200'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-error-600">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
