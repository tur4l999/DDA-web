import { X, Crown, Check, Zap } from 'lucide-react'

const packages = [
  {
    id: 'standard',
    name: 'Standart',
    price: '29',
    features: [
      'Video dərslər',
      'Test imtahanları',
      'Əsas materiallar'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '49',
    features: [
      'Bütün video dərslər',
      'Sınaq imtahanları',
      'Müəllimlə əlaqə',
      'Şəxsi mentor',
      'Sertifikat'
    ],
    popular: true
  }
]

export default function PaywallModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-soft-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="text-center px-6 py-8 border-b border-slate-100">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Paketi Yüksəldin</h2>
          <p className="text-slate-500">Bu xüsusiyyətə daxil olmaq üçün paketinizi yüksəldin</p>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Packages */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                pkg.popular
                  ? 'border-primary-500 bg-primary-50/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full shadow-soft">
                    <Zap className="w-3 h-3" />
                    Populyar
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold text-slate-900 mb-2">{pkg.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900">{pkg.price}</span>
                <span className="text-slate-500"> AZN/ay</span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-accent-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all ${
                  pkg.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                Seç
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
