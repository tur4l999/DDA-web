export default function ProfileCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg p-6 text-white">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 ring-2 ring-white/20">
          <span className="text-3xl">👤</span>
        </div>
        <h3 className="text-lg font-bold mb-1">Tural Qarayev</h3>
        <p className="text-green-100 text-xs mb-4">Test Academy</p>

        <button className="w-full bg-white text-primary-700 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors text-sm">
          Avtoməktəbə qoşul
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-100">Tamamlanmış</span>
            <span className="font-semibold">4</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-100">Tamamlanmamış</span>
            <span className="font-semibold">20</span>
          </div>
        </div>
      </div>
    </div>
  )
}
