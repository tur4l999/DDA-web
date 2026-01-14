import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov Rəşad oğlu", subtext = "+994 50 123 45 67" }) {
  // Reduced item count slightly to prevent overcrowding, but increased container size
  // Using a 3x4 grid logic roughly, but with much more spacing
  const items = Array(12).fill(null)

  return (
    <div className="absolute inset-0 z-20 overflow-hidden select-none flex items-center justify-center pointer-events-none">
      {/*
        Rotated container with significantly larger dimensions and gaps to prevent overlap.
        pointer-events-none ensures clicks pass through to the parent for zoom/interaction,
        while the parent handles onContextMenu prevention.
      */}
      <div className="w-[200%] h-[200%] -rotate-12 grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32 opacity-[0.07] content-center">
        {items.map((_, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center p-4 ${index % 3 === 1 ? 'md:translate-y-12' : ''}`}
          >
            <span className="text-sm lg:text-xl font-black text-gray-900 uppercase tracking-widest leading-tight whitespace-nowrap">
              {text}
            </span>
            <span className="text-xs lg:text-base font-bold text-gray-800 tracking-wider mt-2 whitespace-nowrap">
              {subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
