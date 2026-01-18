import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov", subtext = "+994 50 123 45 67" }) {
  // Increased density (60 items), smaller fonts, and staggered layout to satisfy user request.
  // Rotation -30deg.
  const items = Array(60).fill(null)

  return (
    <div className="absolute inset-0 z-20 overflow-hidden select-none flex items-center justify-center pointer-events-none">
      {/*
        Rotated container with significantly larger dimensions to cover corners.
        Using a grid with columns and reduced gap for higher density but safe spacing.
      */}
      <div className="w-[300%] h-[300%] -rotate-[30deg] grid grid-cols-4 md:grid-cols-5 gap-24 md:gap-32 opacity-[0.08] content-center items-center">
        {items.map((_, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center p-2 transform ${index % 2 === 0 ? 'translate-x-8 md:translate-x-16' : '-translate-x-8 md:-translate-x-16'}`}
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-black text-gray-900 uppercase tracking-widest leading-tight whitespace-nowrap">
              {text}
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-gray-800 tracking-wider mt-0.5 md:mt-1 whitespace-nowrap">
              {subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
