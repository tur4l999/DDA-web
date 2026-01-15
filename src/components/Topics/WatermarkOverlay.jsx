import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov Rəşad oğlu", subtext = "+994 50 123 45 67" }) {
  // Increased density based on user feedback (blue scribbles image)
  // Using a larger grid with smaller gaps to cover the entire image area
  const items = Array(60).fill(null)

  return (
    <div className="absolute inset-0 z-20 overflow-hidden select-none flex items-center justify-center pointer-events-none">
      {/*
        Rotated container with significantly larger dimensions and tighter grid to ensure "everywhere" coverage.
        pointer-events-none ensures clicks pass through to the parent for zoom/interaction.
      */}
      <div className="w-[250%] h-[250%] -rotate-12 grid grid-cols-4 md:grid-cols-6 gap-6 md:gap-12 opacity-[0.10] content-center items-center">
        {items.map((_, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center p-2 transform ${index % 2 === 0 ? 'translate-x-6' : '-translate-x-6'}`}
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
