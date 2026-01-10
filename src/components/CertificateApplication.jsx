import { useState, useRef, useEffect } from 'react'
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
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    city: '',
    address: '',
    dob: '',
    termsAccepted: false
  })
  const [errors, setErrors] = useState({})

  const formRef = useRef(null)

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    // Optionally reset form if needed, or keep it. For now, keep it to be friendly.
    // Scroll to form after a short delay to allow render
    setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
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
    })

    // Handle special combined logic based on user provided text keys
    if (cat === 'B+E') reqs = [{ title: 'BE kateqoriyası', text: requirementsText.BE }]
    if (cat === 'C+E') reqs = [{ title: 'CE kateqoriyası', text: requirementsText.CE }]
    if (cat === 'D+E') reqs = [{ title: 'DE kateqoriyası', text: requirementsText.DE }]

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

    setSuccess(true)
  }

  if (success) {
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
          onClick={onBack}
          className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Şəhadətnamə Müraciəti</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-[1000px] mx-auto space-y-8">

          {/* Category Selection Grid - Always Visible */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kateqoriya seçimi</h2>
              <p className="text-gray-500">Zəhmət olmasa müraciət etmək istədiyiniz kateqoriyanı seçin</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-sm border transition-all duration-300 h-32 ${
                      isSelected
                        ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-500 ring-offset-2'
                        : 'bg-white border-gray-100 hover:border-primary-500 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform ${
                      isSelected
                        ? 'bg-primary-500 text-white'
                        : 'bg-primary-50 text-primary-600 group-hover:scale-110'
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <span className={`text-lg font-bold ${isSelected ? 'text-primary-700' : 'text-gray-900'}`}>
                      {cat}
                    </span>
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Details Section - Appears when category is selected */}
          {selectedCategory && (
            <div
              ref={formRef}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 animate-fade-in"
            >
              <div className="max-w-3xl mx-auto space-y-8">

                {/* Header: Selected Category */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Seçilən kateqoriya: <span className="text-primary-600">{selectedCategory}</span></h2>
                    <p className="text-gray-500 text-sm">Aşağıdakı məlumatları dolduraraq müraciət edə bilərsiniz</p>
                  </div>
                </div>

                {/* Requirements Section */}
                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full"/>
                    Tələblər
                  </h3>

                  <div className="space-y-4 pl-3">
                    {getRequirements(selectedCategory).map((req, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide opacity-80">{req.title}</h4>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm lg:text-base">
                          {req.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-primary-500 rounded-full"/>
                    Şəxsi məlumatlar
                  </h3>

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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
