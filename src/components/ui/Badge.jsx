const variants = {
  success: 'bg-success-50 text-success-700',
  warning: 'bg-warning-50 text-warning-700',
  error: 'bg-error-50 text-error-700',
  info: 'bg-info-50 text-info-700',
  neutral: 'bg-gray-100 text-gray-700',
}

const Badge = ({ 
  children, 
  variant = 'neutral', 
  className = '',
  ...props 
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-md
        text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
