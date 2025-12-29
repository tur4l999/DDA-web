/**
 * Badge Component
 * 
 * Variants: primary, success, warning, error, info, neutral
 * Sizes: sm, md
 */
export default function Badge({ 
  children, 
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full'
  
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    error: 'bg-error-50 text-error-600',
    info: 'bg-info-50 text-info-600',
    neutral: 'bg-neutral-100 text-neutral-600',
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }

  const dotColors = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    info: 'bg-info-500',
    neutral: 'bg-neutral-400',
  }

  return (
    <span 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
}
