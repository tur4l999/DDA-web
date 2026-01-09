import { useState } from 'react'
import { ArrowLeft, Check, Calendar, MapPin, Building, ChevronDown, Award } from 'lucide-react'

const categories = [
  'A', 'B', 'C', 'D',
  'A+B', 'A+C', 'A+B+C',
  'B+C', 'B+E', 'C+E', 'D+E'
]

const cities = [
  'Bakı', 'Gəncə', 'Sumqayıt', 'Mingəçevir', 'Şirvan',
  'Naxçıvan', 'Lənkəran', 'Şəki', 'Yevlax', 'Quba',
  'Xaçmaz', 'Masallı', 'Cəlilabad', 'Şəmkir', 'Tovuz'
]

const requirementsText = {
  A: "18 yaş",
  B: "18 yaş",
  C: "18 yaş",
  BE: "19 yaş\nB 1 il sürücü təcrübə (B üzrə staj olmalıdır)",
  CE: "21 yaş\nC üzrə 3 il təcrübə",
  D: `23 yaş
B və ya C üzrə 5 il təcrübə
Həqiqətəndə şəxsin adına 5 il maşın olmalıdır. Etibarnamə ola bilər. Lakin sizdən sonra başqasına etibarnamə verilirsə adınızdan çıxmış kimi görünür. Bunun üçün arayış alanda ora ilə dəqiqləşdirin.
2 arayış alınmalıdır.
Son 2 il ərzində qəza törədib bədən xəsarəti vurmamısan, spirtli içki ilə maşın sürməmisən, narkotik istifadə edərək sürməməsinən`,
  DE: "26 yaş və D üzrə 3 il staj. Adına avtobus və ya Təşkilatdan sürmə haqqında arayış alınmalıdır."
}

export default function CertificateApplication({ onBack }) {
  const [step, setStep] = useState('category') // 'category', 'form', 'success'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [formData, setFormData] = useState({
    city: '',
    address: '',
    dob: '',
    termsAccepted: false
  })
  const [errors, setErrors] = useState({})

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    setStep('form')
  }

  const getRequirements = (cat) => {
    if (!cat) return []

    // Split combined categories (e.g. "A+B" -> ["A", "B"])
    const parts = cat.split('+')
    let reqs = []

    parts.forEach(part => {
      if (part === 'A') reqs.push({ title: 'A kateqoriyası', text: requirementsText.A })
      if (part === 'B') reqs.push({ title: 'B kateqoriyası', text: requirementsText.B })
      if (part === 'C') reqs.push({ title: 'C kateqoriyası', text: requirementsText.C })
      if (part === 'D') reqs.push({ title: 'D kateqoriyası', text: requirementsText.D })
      // Specific checks for combined logic if needed, but user gave specific text for BE, CE, DE
    })

    // Handle special combined logic based on user provided text keys
    if (cat === 'B+E') reqs = [{ title: 'BE kateqoriyası', text: requirementsText.BE }]
    if (cat === 'C+E') reqs = [{ title: 'CE kateqoriyası', text: requirementsText.CE }]
    if (cat === 'D+E') reqs = [{ title: 'DE kateqoriyası', text: requirementsText.DE }]

    // Fallback/Cleanup for basic combinations that don't match special keys
    // If we have distinct parts like A+B, we showed A and B above.
    // If it is BE, CE, DE, we replaced it.

    return reqs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.city) newErrors.city = 'Şəhər/rayon seçilməlidir'
    if (!formData.address) newErrors.address = 'Ünvan qeyd olunmalıdır'
    if (!formData.dob) newErrors.dob = 'Doğum tarixi qeyd olunmalıdır'
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Şərtləri qəbul etməlisiniz'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="flex-1 flex flex-col h-full bg-gray-50 p-4 lg:p-8">
        <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mt-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Müraciətiniz qəbul olundu!</h2>
          <p className="text-gray-500 mb-8">
            Sizin {selectedCategory} kateqoriyası üzrə şəhadətnamə müraciətiniz qeydə alındı.
            Tezliklə sizinlə əlaqə saxlanılacaq.
          </p>
          <button
            onClick={onBack}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Ana səhifəyə qayıt
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/50 px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
        <button
          onClick={step === 'category' ? onBack : () => setStep('category')}
          className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Şəhadətnamə Müraciəti</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-[1000px] mx-auto">

          {step === 'category' ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Kateqoriya seçimi</h2>
                <p className="text-gray-500">Zəhmət olmasa müraciət etmək istədiyiniz kateqoriyanı seçin</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary-500 hover:shadow-md transition-all duration-300 h-32"
                  >
                    <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">

              {/* Form Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-lg text-sm">
                    {selectedCategory}
                  </span>
                  Məlumatların doldurulması
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City Select */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Şəhər / Rayon</label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className={`w-full pl-11 pr-10 py-3 bg-gray-50 border ${errors.city ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} rounded-xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all appearance-none cursor-pointer text-gray-900`}
                        >
                          <option value="">Seçin...</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.city && <p className="text-xs text-red-500 font-medium">{errors.city}</p>}
                    </div>

                    {/* DOB Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Doğum tarixi</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.dob ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} rounded-xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-900`}
                        />
                      </div>
                      {errors.dob && <p className="text-xs text-red-500 font-medium">{errors.dob}</p>}
                    </div>

                    {/* Address Input */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700">Qeydiyyat ünvanı</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                        <textarea
                          rows={2}
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="Tam ünvanı daxil edin..."
                          className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.address ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary-500'} rounded-xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-900 resize-none`}
                        />
                      </div>
                      {errors.address && <p className="text-xs text-red-500 font-medium">{errors.address}</p>}
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-300 transition-all checked:border-primary-600 checked:bg-primary-600 hover:border-primary-500"
                      />
                      <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} />
                    </div>
                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                      Şərtlərlə tanış oldum və qəbul edirəm
                      {errors.termsAccepted && <span className="block text-red-500 text-xs mt-1 font-medium">{errors.termsAccepted}</span>}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 transition-all active:scale-[0.98]"
                  >
                    Müraciət et
                  </button>
                </form>
              </div>

              {/* Requirements Sidebar */}
              <div className="space-y-6">
                 <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 sticky top-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      Tələblər
                    </h3>

                    <div className="space-y-6">
                      {getRequirements(selectedCategory).map((req, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="font-bold text-gray-800 text-sm">{req.title}</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                            {req.text}
                          </p>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}
