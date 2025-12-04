export default function ProfileCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl shadow-xl p-6 text-white border-2 border-white/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 ring-4 ring-white/30 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <span className="text-4xl">👤</span>
        </div>
        <h3 className="text-xl font-black mb-1">Tural Qarayev</h3>
        <p className="text-green-100 text-sm font-medium mb-5">🎓 Test Academy</p>

        <button className="w-full bg-white hover:bg-gray-50 text-primary-700 font-bold py-3 px-5 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
          📜 Şəhadətnamə Müraciəti
        </button>
      </div>

      <div className="relative mt-6 pt-6 border-t-2 border-white/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all">
            <span className="text-green-100 text-sm font-semibold flex items-center space-x-2">
              <span>✅</span>
              <span>Tamamlanmış</span>
            </span>
            <span className="font-black text-xl bg-white/20 px-3 py-1 rounded-lg">4</span>
          </div>
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all">
            <span className="text-green-100 text-sm font-semibold flex items-center space-x-2">
              <span>📝</span>
              <span>Tamamlanmamış</span>
            </span>
            <span className="font-black text-xl bg-white/20 px-3 py-1 rounded-lg">20</span>
          </div>
        </div>
      </div>
    </div>
  )
}
