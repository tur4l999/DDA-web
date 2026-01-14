import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov Rəşad oğlu", subtext = "+994 50 123 45 67" }) {
  // Create an array to map over for the grid pattern
  const items = Array(12).fill(null)

  return (
    <div className="absolute inset-0 z-20 overflow-hidden select-none flex items-center justify-center">
      {/* Rotated container for the grid */}
      <div className="w-[150%] h-[150%] -rotate-12 grid grid-cols-3 gap-8 opacity-[0.07]">
        {items.map((_, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center p-4">
            <span className="text-sm lg:text-lg font-black text-gray-900 uppercase tracking-widest leading-tight whitespace-nowrap">
              {text}
            </span>
            <span className="text-xs lg:text-sm font-bold text-gray-800 tracking-wider mt-1 whitespace-nowrap">
              {subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
