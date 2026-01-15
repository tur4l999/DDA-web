import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov Rəşad oğlu", subtext = "+994 50 123 45 67" }) {
  // Reduced density significantly to prevent overlap and improve readability.
  // Using a sparse grid with large gaps.
  const items = Array(15).fill(null)

  return (
    <div className="absolute inset-0 z-20 overflow-hidden select-none flex items-center justify-center pointer-events-none">
      {/*
        Rotated container.
        Reduced dimensions slightly but kept enough for rotation coverage.
        Using grid-cols-3 with very large gaps to ensure text never overlaps.
      */}
      <div className="w-[200%] h-[200%] -rotate-12 grid grid-cols-3 gap-24 md:gap-32 opacity-[0.08] content-center items-center">
        {items.map((_, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center p-4 transform ${index % 2 === 0 ? 'translate-x-12' : '-translate-x-12'}`}
          >
            <span className="text-[12px] md:text-xl font-black text-gray-900 uppercase tracking-widest leading-tight whitespace-nowrap">
              {text}
            </span>
            <span className="text-[10px] md:text-base font-bold text-gray-800 tracking-wider mt-1 whitespace-nowrap">
              {subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
