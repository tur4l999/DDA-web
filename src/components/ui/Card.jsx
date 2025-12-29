import React from 'react';

export function Card({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  ...props 
}) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-slate-100 shadow-card
        ${hover ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-soft cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-5 pb-0 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-5 pt-0 ${className}`}>{children}</div>;
}
