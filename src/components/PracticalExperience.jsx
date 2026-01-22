import { useState } from 'react'
import { Car, Truck, Bike, Calendar, Clock, MapPin, CheckCircle, ChevronRight, Star, X, CreditCard, ChevronLeft } from 'lucide-react'

export default function PracticalExperience({ onBack }) {
  const [activeTab, setActiveTab] = useState('signup') // 'signup' | 'history'

  // Selection States
  const [gearbox, setGearbox] = useState('automatic') // 'automatic' | 'manual'
  const [vehicle, setVehicle] = useState(null)
  const [vehicleModel, setVehicleModel] = useState(null)
  const [region, setRegion] = useState('')
  const [district, setDistrict] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Mock Data
  const regions = ['Bakı', 'Sumqayıt', 'Gəncə', 'Xırdalan']
  const bakuDistricts = ['Nərimanov', 'Yasamal', 'Binəqədi', 'Nəsimi', 'Səbail', 'Xətai', 'Nizami', 'Sabunçu', 'Suraxanı', 'Qaradağ', 'Xəzər', 'Pirallahı']

  const vehicleModels = {
    moto: [
      { id: 'm1', name: 'Yamaha MT-07', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop' },
      { id: 'm2', name: 'Honda CB650R', image: 'https://images.unsplash.com/photo-1615172282427-9a5752d6486d?w=400&h=300&fit=crop' },
      { id: 'm3', name: 'Kawasaki Z650', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=400&h=300&fit=crop' }
    ],
    sedan: [
      { id: 'c1', name: 'Kia Rio', image: 'https://images.unsplash.com/photo-1625231334106-35069f582b2d?w=400&h=300&fit=crop' },
      { id: 'c2', name: 'Hyundai Accent', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop' },
      { id: 'c3', name: 'Toyota Corolla', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop' },
      { id: 'c4', name: 'Chevrolet Cruze', image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop' }
    ]
  }

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

  const instructors = [
    { id: 1, name: 'Tural Məmmədov', rating: 4.9, experience: '5 il', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop' },
    { id: 2, name: 'Aysel Əliyeva', rating: 4.8, experience: '3 il', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { id: 3, name: 'Rəşad Kərimov', rating: 5.0, experience: '7 il', image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop' },
    { id: 4, name: 'Leyla Həsənova', rating: 4.7, experience: '4 il', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
  ]

  const history = [
    { id: 1, date: '2023-10-25', time: '14:00', instructor: 'Tural Məmmədov', status: 'completed', vehicle: 'Kia Rio' },
    { id: 2, date: '2023-11-02', time: '10:00', instructor: 'Aysel Əliyeva', status: 'upcoming', vehicle: 'Hyundai Accent' },
  ]

  const handleBookNow = () => {
    // Validation
    const isBaku = region === 'Bakı'
    const isDistrictValid = !isBaku || (isBaku && district)

    if (gearbox && vehicle && vehicleModel && region && isDistrictValid && selectedDate && selectedTime && selectedInstructor) {
      setShowPaymentModal(true)
    } else {
        alert("Zəhmət olmasa bütün xanaları seçin")
    }
  }

  // Handle vehicle type change to reset model
  const handleVehicleChange = (type) => {
    setVehicle(type)
    setVehicleModel(null)
  }

  // Handle region change to reset district
  const handleRegionChange = (e) => {
    setRegion(e.target.value)
    setDistrict('')
  }

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
                {onBack && (
                    <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </button>
                )}
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Praktiki Təcrübə</h1>
            </div>

          {/* Tabs */}
          <div className="bg-gray-100/50 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setActiveTab('signup')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Təcrübəyə yazıl
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Təcrübə tarixçəsi
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto pb-24">

          {activeTab === 'signup' ? (
            <div className="animate-fade-in space-y-8">

              <div className="max-w-3xl mx-auto space-y-8">

                    {/* 1. Gearbox Selection */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-bold">1</span>
                            Sürətlər qutusu
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: 'automatic', label: 'Avtomat', icon: 'A' },
                                { id: 'manual', label: 'Mexanika', icon: 'M' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setGearbox(item.id)}
                                    className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 group ${
                                        gearbox === item.id
                                        ? 'border-primary-500 bg-primary-50/50'
                                        : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-colors ${
                                        gearbox === item.id ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                    }`}>
                                        {item.icon}
                                    </div>
                                    <span className={`font-semibold ${gearbox === item.id ? 'text-primary-700' : 'text-gray-700'}`}>
                                        {item.label}
                                    </span>
                                    {gearbox === item.id && (
                                        <div className="absolute top-3 right-3 text-primary-500">
                                            <CheckCircle className="w-5 h-5 fill-primary-500 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 2. Instructor */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-bold">2</span>
                            Təlimçi seçimi
                        </h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {instructors.map((inst) => (
                                <button
                                    key={inst.id}
                                    onClick={() => setSelectedInstructor(inst)}
                                    className={`flex flex-col items-center gap-4 p-5 rounded-2xl border transition-all text-center group ${
                                        selectedInstructor?.id === inst.id
                                        ? 'border-primary-500 bg-primary-50/50 ring-1 ring-primary-500/20'
                                        : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                                    }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={inst.image}
                                            alt={inst.name}
                                            className={`w-20 h-20 rounded-full object-cover border-4 transition-all ${
                                                selectedInstructor?.id === inst.id ? 'border-white shadow-lg' : 'border-gray-50'
                                            }`}
                                        />
                                        {selectedInstructor?.id === inst.id && (
                                            <div className="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-1 border-2 border-white">
                                                <CheckCircle className="w-3.5 h-3.5 fill-current" />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className={`font-bold text-base transition-colors ${selectedInstructor?.id === inst.id ? 'text-primary-900' : 'text-gray-900'}`}>
                                            {inst.name}
                                        </h4>
                                        <div className="flex items-center justify-center gap-3 text-xs mt-2">
                                            <span className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 px-2 py-1 rounded-full">
                                                <Star className="w-3 h-3 fill-current" /> {inst.rating}
                                            </span>
                                            <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded-full font-medium">{inst.experience}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 3. Vehicle Type & Model */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-bold">3</span>
                            Nəqliyyat vasitəsi
                        </h3>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                                { id: 'moto', label: 'Motosiklet', icon: Bike, disabled: false },
                                { id: 'sedan', label: 'Avtomobil', icon: Car, disabled: false },
                                { id: 'truck', label: 'Yük', icon: Truck, disabled: true }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    disabled={item.disabled}
                                    onClick={() => !item.disabled && handleVehicleChange(item.id)}
                                    className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${
                                        item.disabled
                                        ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-100 grayscale'
                                        : vehicle === item.id
                                            ? 'border-primary-500 bg-primary-50/50'
                                            : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                        vehicle === item.id ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`font-semibold text-xs sm:text-sm ${vehicle === item.id ? 'text-primary-700' : 'text-gray-700'}`}>
                                        {item.label}
                                    </span>
                                    {vehicle === item.id && (
                                        <div className="absolute top-2 right-2 text-primary-500">
                                            <CheckCircle className="w-4 h-4 fill-primary-500 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Vehicle Models Sub-selection */}
                        {vehicle && vehicleModels[vehicle] && (
                            <div className="animate-slide-up">
                                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Model seçimi</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {vehicleModels[vehicle].map((model) => (
                                        <button
                                            key={model.id}
                                            onClick={() => setVehicleModel(model)}
                                            className={`group relative overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 ${
                                                vehicleModel?.id === model.id
                                                    ? 'border-primary-500 ring-4 ring-primary-500/10'
                                                    : 'border-transparent hover:border-gray-200'
                                            }`}
                                        >
                                            <div className="aspect-[4/3] w-full">
                                                <img
                                                    src={model.image}
                                                    alt={model.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <span className="text-white font-bold text-sm block truncate">{model.name}</span>
                                            </div>
                                            {vehicleModel?.id === model.id && (
                                                <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
                                                    <CheckCircle className="w-4 h-4 fill-current" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* 4. Location */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-bold">4</span>
                            Məkan
                        </h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={region}
                                    onChange={handleRegionChange}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl appearance-none text-gray-900 font-medium focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all cursor-pointer hover:border-gray-300"
                                >
                                    <option value="" disabled>Regionu seçin</option>
                                    {regions.map(r => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rotate-90 pointer-events-none" />
                            </div>

                            {/* District Dropdown for Baku */}
                            {region === 'Bakı' && (
                                <div className="relative animate-slide-up">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl appearance-none text-gray-900 font-medium focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all cursor-pointer hover:border-gray-300"
                                    >
                                        <option value="" disabled>Rayonu seçin</option>
                                        {bakuDistricts.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rotate-90 pointer-events-none" />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* 5. Date & Time */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-bold">5</span>
                            Tarix və Saat
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Tarix seçin</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Saat seçin</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {timeSlots.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                                                selectedTime === time
                                                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

              </div>

              {/* Action Button */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 z-20 flex justify-center lg:static lg:bg-transparent lg:border-none lg:p-0 lg:mt-8">
                <button
                    onClick={handleBookNow}
                    disabled={!gearbox || !vehicle || !vehicleModel || !region || (region === 'Bakı' && !district) || !selectedDate || !selectedTime || !selectedInstructor}
                    className="w-full lg:max-w-xs bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                >
                    İndi yazıl
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-4 animate-fade-in max-w-4xl mx-auto">
              {history.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.vehicle} • {item.instructor}</h4>
                      <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> {item.date}
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <Clock className="w-3.5 h-3.5" /> {item.time}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                     item.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                    {item.status === 'completed' ? 'Tamamlandı' : 'Gözlənilir'}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Payment/Summary Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-scale-in">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Sifarişin təsdiqi</h3>
                    <button onClick={() => setShowPaymentModal(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 text-sm">Sürətlər qutusu</span>
                        <span className="font-semibold text-gray-900 capitalize">{gearbox === 'automatic' ? 'Avtomat' : 'Mexanika'}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 text-sm">Təlimçi</span>
                        <span className="font-semibold text-gray-900">{selectedInstructor?.name}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 text-sm">Nəqliyyat</span>
                        <span className="font-semibold text-gray-900 capitalize">{vehicleModel?.name || (vehicle === 'moto' ? 'Motosiklet' : 'Avtomobil')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 text-sm">Məkan</span>
                        <span className="font-semibold text-gray-900">
                             {region} {district ? `/ ${district}` : ''}
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-500 text-sm">Zaman</span>
                        <span className="font-semibold text-gray-900">{selectedDate} / {selectedTime}</span>
                    </div>

                    <div className="border-t border-dashed border-gray-200 my-4"></div>

                    <div className="flex justify-between items-end">
                        <span className="text-gray-500 font-medium">Yekun məbləğ</span>
                        <span className="text-2xl font-bold text-primary-600">30.00 ₼</span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        alert('Ödəniş səhifəsinə yönləndirilir...')
                        setShowPaymentModal(false)
                    }}
                    className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <CreditCard className="w-5 h-5" />
                    Ödəniş et
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
