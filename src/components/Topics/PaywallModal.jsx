import { X, Lock, Check, Sparkles } from 'lucide-react'

export default function PaywallModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const packages = [
    {
      name: 'Standart',
      price: '49 AZN',
      period: 'aylıq',
      features: [
        'Bütün təlim mövzuları',
        'Sual-cavab dəstəyi',
        'İmtahan simulyatoru',
        'Onlayn dərslər'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: '99 AZN',
      period: 'aylıq',
      features: [
        'Standart paketin bütün üstünlükləri',
        'Video dərslər (HD)',
        '3D video materiallar',
        'Fərdi müəllim dəstəyi',
        'Rəqabət sıralama'
      ],
      popular: true
    }
  ]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#007A3A] to-[#005A2A] px-6 py-5 rounded-t-3xl flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Video dərslər paketə daxildir</h2>
                <p className="text-sm text-white/80">Bu bölməni aktiv etmək üçün uyğun paketi əldə etməlisən</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Packages */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl border-2 p-6 transition-all hover:shadow-xl ${
                    pkg.popular
                      ? 'border-[#007A3A] bg-gradient-to-br from-[#007A3A]/5 to-transparent'
                      : 'border-gray-200 hover:border-[#007A3A]/30'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#007A3A] to-[#005A2A] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        Ən populyar
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-[#007A3A]">{pkg.price}</span>
                      <span className="text-gray-500 font-medium">/ {pkg.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#007A3A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#007A3A]" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#007A3A] to-[#005A2A] text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Paketi al
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Daha sonra
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
