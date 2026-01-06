import React from 'react'
import { CheckCircle, Play, Lock } from 'lucide-react'

export default function TicketsView({ onTicketClick, onLockClick }) {
  // Generate 50 tickets
  const tickets = Array.from({ length: 50 }, (_, i) => {
    const isLocked = i >= 5; // First 5 free, rest locked

    // Mock progress for the first few unlocked tickets
    let progress = { current: 0, total: 10, percent: 0 };
    if (i === 0) progress = { current: 3, total: 10, percent: 30 };
    if (i === 1) progress = { current: 10, total: 10, percent: 100 };

    return {
      id: i + 1,
      number: i + 1,
      questionsCount: 10,
      isLocked,
      progress
    }
  })

  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
      {tickets.map((ticket) => (
        <button
          key={ticket.id}
          onClick={() => ticket.isLocked ? onLockClick() : onTicketClick(ticket.id)}
          className={`group relative flex flex-col items-center justify-between p-3 bg-white border rounded-2xl shadow-sm transition-all duration-300 aspect-square text-center ${
            ticket.isLocked
              ? 'border-gray-100 opacity-90'
              : 'border-gray-100 hover:shadow-md hover:border-primary-200 cursor-pointer'
          }`}
        >
          {/* Header/Title */}
          <span className={`text-xs font-semibold uppercase tracking-wide mb-1 ${ticket.isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
            Bilet {ticket.number}
          </span>

          {/* Large Number / Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl mb-1 transition-colors duration-300 ${
             ticket.isLocked
              ? 'bg-gray-50 text-gray-300'
              : 'bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white'
          }`}>
            {ticket.number}
          </div>

          {/* Progress / Status */}
          <div className="w-full">
            {ticket.isLocked ? (
              <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 mt-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Bağlıdır</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center justify-between text-[10px] font-semibold text-gray-400">
                  <span>{ticket.progress.current}/{ticket.progress.total}</span>
                  <span>{ticket.progress.percent}%</span>
                </div>
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ticket.progress.percent === 100 ? 'bg-green-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${ticket.progress.percent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Locked Overlay (Optional, but button click handles it) */}
          {ticket.isLocked && (
            <div className="absolute top-2 right-2">
              <Lock className="w-3.5 h-3.5 text-gray-300" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
