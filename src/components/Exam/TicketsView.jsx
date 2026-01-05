import React from 'react'
import { CheckCircle, Play } from 'lucide-react'

export default function TicketsView({ onTicketClick }) {
  // Generate 50 tickets
  const tickets = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    questionsCount: 10,
    status: i === 0 ? 'unlocked' : 'locked', // Just for visual variance logic, though we'll make all clickable
    score: null
  }))

  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
      {tickets.map((ticket) => (
        <button
          key={ticket.id}
          onClick={() => onTicketClick(ticket.id)}
          className="group relative flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 aspect-square"
        >
          <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-lg mb-2 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
            {ticket.number}
          </div>
          <span className="text-xs font-medium text-gray-500 group-hover:text-primary-600 transition-colors">
            {ticket.questionsCount} sual
          </span>

          {/* Optional: Hover Play Icon Overlay */}
          <div className="absolute inset-0 bg-primary-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      ))}
    </div>
  )
}
