import React from 'react';

const variants = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-slate-100 text-slate-700',
  primary: 'bg-primary-100 text-primary-700',
};

export function Badge({ variant = 'neutral', children, className = '' }) {
  return (
    <span
      className={`
        ${variants[variant]}
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${className}
      `}
    >
      {children}
    </span>
  );
}
