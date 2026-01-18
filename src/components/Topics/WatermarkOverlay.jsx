import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov Rəşad oğlu", subtext = "+994 50 123 45 67" }) {
  // Further refined based on user feedback "SUAL 2.png"
  // Steeper rotation (-30deg), staggered layout ("brick wall"), and massive spacing to prevent any overlap
  const items = Array(30).fill(null)

  return (
    <div className="absolute inset-0 z-20 overflow-hidden select-none flex items-center justify-center pointer-events-none">
      {/*
        Rotated container with significantly larger dimensions to cover corners.
        Using a grid with fewer columns and large gaps.
      */}
      <div className="w-[300%] h-[300%] -rotate-[30deg] grid grid-cols-3 md:grid-cols-4 gap-32 md:gap-48 opacity-[0.08] content-center items-center">
        {items.map((_, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center p-4 transform ${index % 2 === 0 ? 'translate-x-12 md:translate-x-24' : '-translate-x-12 md:-translate-x-24'}`}
          >
            <span className="text-[12px] sm:text-sm md:text-xl font-black text-gray-900 uppercase tracking-widest leading-tight whitespace-nowrap">
              {text}
            </span>
            <span className="text-[10px] sm:text-xs md:text-base font-bold text-gray-800 tracking-wider mt-1 md:mt-2 whitespace-nowrap">
              {subtext}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
