export default function ProfileCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg p-6 text-white">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 ring-2 ring-white/20">
          <span className="text-3xl">👤</span>
        </div>
        <h3 className="text-lg font-bold mb-1">Tural Qarayev</h3>
        <p className="text-green-100 text-xs mb-5">Test Academy</p>

        <button className="w-full bg-white text-primary-700 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors text-sm mb-3">
          Avtoməktəbə qoşul
        </button>

        <button className="w-full bg-primary-600 hover:bg-primary-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm border border-white/30">
          Şəhadətnamə Müraciəti
        </button>
      </div>

      <div className="mt-5 pt-5 border-t border-white/20">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-green-100 text-sm">Tamamlanmış</span>
            <span className="font-bold text-lg">4</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-green-100 text-sm">Tamamlanmamış</span>
            <span className="font-bold text-lg">20</span>
          </div>
        </div>
      </div>
    </div>
  )
}
