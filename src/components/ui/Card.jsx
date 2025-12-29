const variants = {
  default: 'bg-white border border-gray-100',
  interactive: 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md cursor-pointer',
  subtle: 'bg-gray-50 border border-gray-100',
}

const Card = ({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}) => {
  return (
    <div
      className={`
        rounded-lg p-6 transition-all duration-200
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
