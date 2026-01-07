import { X, Calendar, User, Clock, CheckCircle2, Video, Bookmark, XCircle, RotateCcw } from 'lucide-react'

export default function LessonDetailsModal({ lesson, isOpen, onClose, onJoin, onWatchReplay }) {
  if (!isOpen || !lesson) return null

  const getStatusConfig = (status, replayUrl) => {
    switch (status) {
      case 'started':
        return {
          label: 'Dərs başlayıb',
          color: 'text-green-600',
          bg: 'bg-green-100',
          border: 'border-green-200',
          icon: Video
        }
      case 'waiting':
        return {
          label: 'Gözlənilir',
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          border: 'border-blue-200',
          icon: Clock
        }
      case 'completed':
        return {
          label: replayUrl ? 'Video mövcuddur' : 'Tamamlanıb',
          color: replayUrl ? 'text-purple-600' : 'text-gray-600',
          bg: replayUrl ? 'bg-purple-100' : 'bg-gray-100',
          border: replayUrl ? 'border-purple-200' : 'border-gray-200',
          icon: replayUrl ? RotateCcw : CheckCircle2
        }
      case 'cancelled':
        return {
          label: 'Ləğv edilib',
          color: 'text-red-600',
          bg: 'bg-red-100',
          border: 'border-red-200',
          icon: XCircle
        }
      default:
        return {
          label: 'Naməlum',
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          icon: Clock
        }
    }
  }

  const statusConfig = getStatusConfig(lesson.status, lesson.replayUrl)
  const StatusIcon = statusConfig.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in relative">
        {/* Header Image/Gradient */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute -bottom-8 left-8 flex items-end">
            <div className="bg-white p-1 rounded-2xl shadow-lg">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold ${
                lesson.language === 'az' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
              }`}>
                {lesson.language.toUpperCase()}
              </div>
            </div>
            <div className="ml-4 mb-9">
              <span className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium border border-white/20">
                Kod: #{String(lesson.id).padStart(4, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-12 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h2>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <User className="w-4 h-4" />
                <span>{lesson.instructor}</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-semibold ${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Tarix
              </div>
              <div className="text-gray-900 font-bold text-lg">
                {new Date(lesson.date).toLocaleDateString('az-AZ')}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm font-medium mb-1 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Saat
              </div>
              <div className="text-gray-900 font-bold text-lg">
                {new Date(lesson.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-2">Dərs haqqında</h3>
            <p className="text-gray-600 leading-relaxed">
              {lesson.description || 'Bu dərsdə mövzu üzrə ətraflı məlumat veriləcək, praktiki nümunələr göstəriləcək və sual-cavab sessiyası keçiriləcək.'}
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {lesson.status === 'started' && (
              <button
                onClick={() => onJoin(lesson)}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5" />
                Dərsə qoşul
              </button>
            )}

            {lesson.status === 'completed' && lesson.replayUrl ? (
              <button
                disabled
                className="flex-1 bg-gray-100 text-gray-500 py-3.5 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-not-allowed border-2 border-gray-200"
              >
                <RotateCcw className="w-5 h-5" />
                Təkrarı telegramda izlə
              </button>
            ) : null}

            {lesson.status === 'completed' && !lesson.replayUrl && (
              <button
                disabled
                className="flex-1 bg-gray-100 text-gray-400 py-3.5 px-6 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
              >
                Video mövcud deyil
              </button>
            )}

            {lesson.status === 'waiting' && (
              <button
                className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 py-3.5 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                Xatırlat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
