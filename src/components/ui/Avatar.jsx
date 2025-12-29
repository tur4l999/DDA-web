/**
 * Avatar Component
 * 
 * Sizes: sm, md, lg, xl
 */
export default function Avatar({ 
  src, 
  alt = '',
  name,
  size = 'md',
  className = '',
  ...props 
}) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?'
    const words = name.split(' ')
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }

  // Fallback to initials
  return (
    <div 
      className={`rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center ${sizes[size]} ${className}`}
      {...props}
    >
      {getInitials(name)}
    </div>
  )
}

/**
 * Avatar Group - For showing multiple avatars
 */
export function AvatarGroup({ children, max = 3, className = '' }) {
  const avatars = Array.isArray(children) ? children : [children]
  const visible = avatars.slice(0, max)
  const remaining = avatars.length - max

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {visible.map((avatar, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          {avatar}
        </div>
      ))}
      {remaining > 0 && (
        <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 text-sm font-medium flex items-center justify-center ring-2 ring-white">
          +{remaining}
        </div>
      )}
    </div>
  )
}
