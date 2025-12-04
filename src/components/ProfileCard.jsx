export default function ProfileCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg p-6 text-white">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 ring-4 ring-white/30">
          <span className="text-4xl">👤</span>
        </div>
        <h3 className="text-xl font-bold mb-1">Tural Qarayev</h3>
        <p className="text-green-100 text-sm mb-6">Test Academy</p>

        <button className="w-full bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors">
          Avtoməktəbə qoşul
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-100">Tamamlanmış mövzular</span>
            <span className="font-semibold">0</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-100">Tamamlanmamış mövzular</span>
            <span className="font-semibold">24</span>
          </div>
        </div>
      </div>
    </div>
  )
}
