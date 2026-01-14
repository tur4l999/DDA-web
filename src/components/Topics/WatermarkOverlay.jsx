import React from 'react'

export default function WatermarkOverlay({ text = "Tural Kazımov Rəşad oğlu", subtext = "+994 50 123 45 67" }) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] -rotate-12 transform scale-110">
        <div className="flex flex-col items-center justify-center text-center p-8">
            <span className="text-2xl lg:text-3xl font-black text-gray-900 uppercase tracking-widest leading-tight whitespace-nowrap drop-shadow-sm">
              {text}
            </span>
            <span className="text-lg lg:text-xl font-bold text-gray-800 tracking-wider mt-2 whitespace-nowrap drop-shadow-sm">
              {subtext}
            </span>
        </div>
      </div>

      {/* Repeated pattern for better coverage */}
      <div className="absolute top-4 left-4 opacity-[0.08] -rotate-12">
         <span className="text-xs font-bold text-gray-900 block">{text}</span>
         <span className="text-xs text-gray-800 block">{subtext}</span>
      </div>
      <div className="absolute bottom-4 right-4 opacity-[0.08] -rotate-12">
         <span className="text-xs font-bold text-gray-900 block">{text}</span>
         <span className="text-xs text-gray-800 block">{subtext}</span>
      </div>
    </div>
  )
}
