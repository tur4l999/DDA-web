import { AlertTriangle, Ban, Shield, Car, Play, Clock } from 'lucide-react'

const penalties = [
  {
    id: 1,
    icon: AlertTriangle,
    title: 'Sürət limitinin pozulması',
    fineRange: '40-200 manat',
    hasVideo: true,
    videoDuration: '2:15',
    description: 'Yaşayış zonalarında və avtomagistrallarda sürət limitləri'
  },
  {
    id: 2,
    icon: Ban,
    title: 'Qadağan edən nişanın pozulması',
    fineRange: '60-150 manat',
    hasVideo: true,
    videoDuration: '1:45',
    description: 'Qadağan nişanlarının növləri və cərimələri'
  },
  {
    id: 3,
    icon: Shield,
    title: 'Təhlükəsizlik kəmərinin taxılmaması',
    fineRange: '30-50 manat',
    hasVideo: true,
    videoDuration: '1:20',
    description: 'Kəmər taxmaq məcburiyyəti və istisnalar'
  },
  {
    id: 4,
    icon: Car,
    title: 'Yolun solunda hərəkət',
    fineRange: '100-300 manat',
    hasVideo: false,
    description: 'Əks istiqamətdə hərəkət qaydaları'
  }
]

export default function PenaltiesContent({ topicRelated = false, onVideoClick }) {
  return (
    <div className="max-w-[860px] mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Bu mövzu ilə əlaqəli cərimələr</h2>
        <p className="text-slate-500">Yol hərəkəti qaydalarının pozulmasına görə cərimələr</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {penalties.map((penalty) => {
          const Icon = penalty.icon
          return (
            <div key={penalty.id} className="card-interactive p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{penalty.title}</h3>
                  <p className="text-sm font-medium text-primary-600">{penalty.fineRange}</p>
                </div>
              </div>
              
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{penalty.description}</p>
              
              {penalty.hasVideo && (
                <button
                  onClick={() => onVideoClick?.(penalty)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Videoya bax</span>
                  <span className="flex items-center gap-1 text-slate-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {penalty.videoDuration}
                  </span>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
