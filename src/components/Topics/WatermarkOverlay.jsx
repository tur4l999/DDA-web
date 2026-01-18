import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov Rəşad oğlu", subtext = "+994 50 123 45 67" }) {
  // Refined for cleaner look with no overlapping
  // Reduced density and increased gap
  const items = Array(40).fill(null)

  return (
    <div className="absolute inset-0 z-20 overflow-hidden select-none flex items-center justify-center pointer-events-none">
      {/*
        Rotated container with larger dimensions.
        Using flex wrap or grid with ample spacing to ensure no overlaps.
      */}
      <div className="w-[200%] h-[200%] -rotate-12 grid grid-cols-4 md:grid-cols-5 gap-16 md:gap-24 opacity-[0.08] content-center items-center">
        {items.map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center p-4"
          >
            <span className="text-[10px] sm:text-xs md:text-lg font-black text-gray-900 uppercase tracking-widest leading-tight whitespace-nowrap">
              {text}
            </span>
            <span className="text-[8px] sm:text-[10px] md:text-sm font-bold text-gray-800 tracking-wider mt-0.5 md:mt-1 whitespace-nowrap">
              {subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
