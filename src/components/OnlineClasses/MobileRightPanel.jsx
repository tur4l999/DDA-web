import { ChevronUp, X } from 'lucide-react'
import { useState } from 'react'
import RightPanel from './RightPanel'

export default function MobileRightPanel(props) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl z-40 flex items-center gap-2 font-bold animate-bounce-subtle lg:hidden"
      >
        <ChevronUp className="w-5 h-5" />
        {props.activeTab === 'selectedDay' ? 'Günün cədvəli' : 'Saxlanılanlar'}
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in">
      <div className="bg-white rounded-t-3xl h-[80vh] shadow-2xl animate-slide-up flex flex-col relative overflow-hidden">
        <div className="flex justify-center pt-3 pb-1" onClick={() => setIsOpen(false)}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full cursor-pointer" />
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-hidden p-4">
          <RightPanel {...props} />
        </div>
      </div>
    </div>
  )
}
