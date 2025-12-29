/**
 * Card Component
 * 
 * Variants: default, interactive, elevated
 * With optional padding sizes
 */
export default function Card({ 
  children, 
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  ...props 
}) {
  const baseStyles = 'bg-white rounded-2xl'
  
  const variants = {
    default: 'shadow-card',
    interactive: 'shadow-card cursor-pointer transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5',
    elevated: 'shadow-md',
    flat: 'border border-neutral-100',
  }
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * Card Header - For consistent card headers
 */
export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Card Title
 */
export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-neutral-800 ${className}`}>
      {children}
    </h3>
  )
}

/**
 * Card Description
 */
export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-sm text-neutral-500 mt-1 ${className}`}>
      {children}
    </p>
  )
}

/**
 * Card Content - Main content area
 */
export function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

/**
 * Card Footer - For actions
 */
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-4 pt-4 border-t border-neutral-100 ${className}`}>
      {children}
    </div>
  )
}
