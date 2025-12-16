import { useEffect, useMemo, useState } from 'react'
import { Menu, Search, ChevronDown, X } from 'lucide-react'

const BRAND = '#007A3A'

const GROUPS = [
  { id: 'warning', name: 'Xəbərdarlıq nişanları', shape: 'triangle' },
  { id: 'priority', name: 'Üstünlük nişanları', shape: 'diamond' },
  { id: 'prohibitory', name: 'Qadağan nişanları', shape: 'circle' },
  { id: 'mandatory', name: 'Məcburi nişanlar', shape: 'circleFill' },
  { id: 'information', name: 'İnformasiya nişanları', shape: 'rect' },
  { id: 'service', name: 'Xidmət nişanları', shape: 'rectRound' },
  { id: 'additional', name: 'Əlavə nişanlar', shape: 'plate' },
]

const SIGNS = [
  // Warning
  {
    id: 'w-1-1',
    groupId: 'warning',
    code: '1.1',
    name: 'Təhlükəli döngə',
    meaning: 'Qarşıda kəskin döngə var, sürəti əvvəlcədən azaldın.',
    where: 'Dağ yolları, şəhər kənarı magistrallar, görünüş məhdud olan sahələr.',
    exceptions: 'Əlavə lövhəciklə məsafə göstərilə bilər.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: false,
  },
  {
    id: 'w-1-2',
    groupId: 'warning',
    code: '1.5',
    name: 'Piyada keçidi',
    meaning: 'Qarşıda piyada keçidi var, ehtiyatlı olun.',
    where: 'Məktəb, dayanacaq, sıx piyada axını olan yerlər.',
    exceptions: 'Yol nişanlanması ilə birlikdə tətbiq oluna bilər.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: true,
  },
  {
    id: 'w-1-3',
    groupId: 'warning',
    code: '1.20',
    name: 'Yol işləri',
    meaning: 'Yol işləri aparılır, hərəkət rejimi dəyişə bilər.',
    where: 'Təmir olunan yol sahələri.',
    exceptions: 'Müvəqqəti nişanlar üstünlük təşkil edir.',
    importance: 'Orta',
    isExam: false,
    isCommonMistake: true,
  },

  // Priority
  {
    id: 'p-2-1',
    groupId: 'priority',
    code: '2.1',
    name: 'Baş yol',
    meaning: 'Siz baş yoldasınız, kəsişmədə üstünlüyünüz var.',
    where: 'Tənzimlənməyən yolayrıcılar.',
    exceptions: 'Svetofor/nizamlayıcı varsa, onların siqnalı üstündür.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: true,
  },
  {
    id: 'p-2-2',
    groupId: 'priority',
    code: '2.4',
    name: 'Yol ver',
    meaning: 'Üstün yolu olanlara yol verməlisiniz.',
    where: 'Tənzimlənməyən yolayrıcılar, çıxışlar.',
    exceptions: 'Nizamlayıcı/svetofor qaydaları üstündür.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: true,
  },
  {
    id: 'p-2-3',
    groupId: 'priority',
    code: '2.5',
    name: 'Dayan və yol ver',
    meaning: 'Tam dayanıb sonra yol verməlisiniz.',
    where: 'Görünüşün məhdud olduğu kəsişmələr.',
    exceptions: 'Stop xətti varsa, onun arxasında dayanılır.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: false,
  },

  // Prohibitory
  {
    id: 'pr-3-1',
    groupId: 'prohibitory',
    code: '3.1',
    name: 'Hərəkət qadağandır',
    meaning: 'Bütün nəqliyyat vasitələrinin hərəkəti qadağandır.',
    where: 'Piyada zonaları, təmir/iş sahələri.',
    exceptions: 'Xüsusi icazə və ya əlavə lövhəciklə istisna verilə bilər.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: true,
  },
  {
    id: 'pr-3-2',
    groupId: 'prohibitory',
    code: '3.27',
    name: 'Dayanma qadağandır',
    meaning: 'Dayanma qadağandır (durma qısa müddətli ola bilər).',
    where: 'Dar küçələr, dayanacaq yaxınlığı, görünüşü bağlayan yerlər.',
    exceptions: 'Əlavə lövhəciklə vaxt/günlər göstərilə bilər.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: true,
  },
  {
    id: 'pr-3-3',
    groupId: 'prohibitory',
    code: '3.28',
    name: 'Durma qadağandır',
    meaning: 'Həm dayanma, həm də durma qadağandır.',
    where: 'Sıx hərəkətli hissələr, tunellər, təhlükəli sahələr.',
    exceptions: 'Məcburi dayanma (qəza) halları istisnadır.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: true,
  },

  // Mandatory
  {
    id: 'm-4-1',
    groupId: 'mandatory',
    code: '4.1.1',
    name: 'Yalnız düz',
    meaning: 'Yalnız düz istiqamətdə hərəkət etməlisiniz.',
    where: 'Yolayrıcılar, hərəkətin təşkil olunduğu yerlər.',
    exceptions: 'Marşrut NV-ləri üçün əlavə lövhəciklə istisna ola bilər.',
    importance: 'Orta',
    isExam: true,
    isCommonMistake: false,
  },
  {
    id: 'm-4-2',
    groupId: 'mandatory',
    code: '4.1.2',
    name: 'Yalnız sağa',
    meaning: 'Yalnız sağa dönmək icazəlidir.',
    where: 'Kəsişmələr, tək istiqamətə yönləndirmə.',
    exceptions: 'Nizamlayıcı siqnalı üstündür.',
    importance: 'Orta',
    isExam: true,
    isCommonMistake: true,
  },

  // Information
  {
    id: 'i-5-1',
    groupId: 'information',
    code: '5.16',
    name: 'Piyada keçidi (məlumat)',
    meaning: 'Piyada keçidinin yeri göstərilir.',
    where: 'Şəhər yolları, piyada keçidləri.',
    exceptions: 'Nişanlanma ilə birlikdə tətbiq oluna bilər.',
    importance: 'Orta',
    isExam: false,
    isCommonMistake: false,
  },
  {
    id: 'i-5-2',
    groupId: 'information',
    code: '5.5',
    name: 'Tək istiqamətli yol',
    meaning: 'Yolda hərəkət yalnız bir istiqamətdədir.',
    where: 'Şəhər küçələri.',
    exceptions: 'Daxil olma qadağası ayrıca nişanlarla göstərilə bilər.',
    importance: 'Yüksək',
    isExam: true,
    isCommonMistake: false,
  },

  // Service
  {
    id: 's-6-1',
    groupId: 'service',
    code: '6.4',
    name: 'Yanacaqdoldurma məntəqəsi',
    meaning: 'YDM yaxınlıqda yerləşir.',
    where: 'Magistral və şəhər kənarı yollar.',
    exceptions: 'Məsafə əlavə lövhəciklə göstərilə bilər.',
    importance: 'Aşağı',
    isExam: false,
    isCommonMistake: false,
  },
  {
    id: 's-6-2',
    groupId: 'service',
    code: '6.11',
    name: 'Tibbi yardım',
    meaning: 'Tibbi yardım məntəqəsi var.',
    where: 'Şəhər çıxışları, xidmət zonaları.',
    exceptions: '—',
    importance: 'Aşağı',
    isExam: false,
    isCommonMistake: false,
  },

  // Additional
  {
    id: 'a-7-1',
    groupId: 'additional',
    code: '7.2.1',
    name: 'Təsir zonası',
    meaning: 'Nişanın təsir zonasını göstərir.',
    where: 'Qadağan/məcburi nişanlarla birlikdə.',
    exceptions: 'Göstərilən məsafə daxilində keçərlidir.',
    importance: 'Orta',
    isExam: true,
    isCommonMistake: true,
  },
  {
    id: 'a-7-2',
    groupId: 'additional',
    code: '7.4.1',
    name: 'Yük avtomobilləri',
    meaning: 'Nişan yalnız yük avtomobillərinə aiddir.',
    where: 'Məhdudiyyət nişanları ilə birlikdə.',
    exceptions: 'Kütlə/ölçü kriteriyası lövhəcikdə göstərilə bilər.',
    importance: 'Orta',
    isExam: true,
    isCommonMistake: false,
  },
]

function ShapeIcon({ shape, active }) {
  const stroke = active ? BRAND : '#6B7280'
  const fillSoft = active ? `${BRAND}14` : '#F3F4F6'

  switch (shape) {
    case 'triangle':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3L2.5 20h19L12 3Z" fill={fillSoft} stroke={stroke} strokeWidth="1.75" />
        </svg>
      )
    case 'diamond':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5 21.5 12 12 21.5 2.5 12 12 2.5Z" fill={fillSoft} stroke={stroke} strokeWidth="1.75" />
        </svg>
      )
    case 'circle':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill={fillSoft} stroke={stroke} strokeWidth="1.75" />
        </svg>
      )
    case 'circleFill':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill={active ? BRAND : '#E5E7EB'} />
          <circle cx="12" cy="12" r="9" fill="none" stroke={active ? BRAND : '#6B7280'} strokeWidth="1.75" />
        </svg>
      )
    case 'rect':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="6" width="16" height="12" rx="2.5" fill={fillSoft} stroke={stroke} strokeWidth="1.75" />
        </svg>
      )
    case 'rectRound':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5" width="16" height="14" rx="4" fill={fillSoft} stroke={stroke} strokeWidth="1.75" />
        </svg>
      )
    case 'plate':
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="8" width="17" height="8" rx="2.5" fill={fillSoft} stroke={stroke} strokeWidth="1.75" />
        </svg>
      )
  }
}

function SignVisual({ sign, size = 'md', emphasized = false }) {
  const group = GROUPS.find(g => g.id === sign.groupId)
  const shape = group?.shape || 'rect'
  const isProhibitory = sign.groupId === 'prohibitory'
  const isWarning = sign.groupId === 'warning'
  const isMandatory = sign.groupId === 'mandatory'
  const isPriority = sign.groupId === 'priority'
  const isInfo = sign.groupId === 'information'
  const isService = sign.groupId === 'service'
  const isAdditional = sign.groupId === 'additional'

  const w = size === 'lg' ? 260 : 140
  const h = size === 'lg' ? 200 : 110

  const border = isProhibitory ? '#DC2626' : isWarning ? '#DC2626' : isMandatory ? '#2563EB' : isPriority ? '#DC2626' : isInfo ? '#2563EB' : isService ? '#2563EB' : '#9CA3AF'
  const inner = isProhibitory ? '#FFFFFF' : isWarning ? '#FFFFFF' : isMandatory ? '#2563EB' : isPriority ? '#FBBF24' : isInfo ? '#2563EB' : isService ? '#2563EB' : '#FFFFFF'
  const text = isMandatory || isInfo || isService ? '#FFFFFF' : '#111827'

  const strokeW = size === 'lg' ? 10 : 7
  const inset = size === 'lg' ? 16 : 12

  const outline = emphasized ? `${BRAND}` : '#E5E7EB'

  const commonWrapper = (
    <div
      className={`w-full h-full rounded-2xl bg-white border transition-colors ${emphasized ? 'border-[#007A3A]' : 'border-gray-200'}`}
      style={{ boxShadow: emphasized ? '0 10px 24px rgba(17,24,39,0.10)' : '0 6px 18px rgba(17,24,39,0.06)' }}
    >
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl border" style={{ borderColor: outline }}>
        <svg width={w} height={h} viewBox="0 0 260 200" aria-label={`${sign.code} ${sign.name}`}>
          {/* Shape */}
          {shape === 'triangle' && (
            <>
              <path d="M130 18 L240 182 H20 Z" fill="#fff" stroke={border} strokeWidth={strokeW} />
              <path d="M130 44 L214 176 H46 Z" fill={inner} opacity={0.06} />
            </>
          )}
          {shape === 'diamond' && (
            <>
              <path d="M130 18 L240 100 L130 182 L20 100 Z" fill="#fff" stroke={border} strokeWidth={strokeW} />
              <path d="M130 42 L214 100 L130 158 L46 100 Z" fill={inner} opacity={0.25} />
            </>
          )}
          {shape === 'circle' && (
            <>
              <circle cx="130" cy="100" r="78" fill="#fff" stroke={border} strokeWidth={strokeW} />
              <circle cx="130" cy="100" r="58" fill={inner} opacity={0.06} />
            </>
          )}
          {shape === 'circleFill' && (
            <>
              <circle cx="130" cy="100" r="78" fill={inner} />
              <circle cx="130" cy="100" r="78" fill="none" stroke={border} strokeWidth={strokeW} />
            </>
          )}
          {(shape === 'rect' || shape === 'rectRound') && (
            <>
              <rect x={inset} y={36} width={260 - inset * 2} height={128} rx={shape === 'rectRound' ? 26 : 12} fill={inner} />
              <rect x={inset} y={36} width={260 - inset * 2} height={128} rx={shape === 'rectRound' ? 26 : 12} fill="none" stroke={border} strokeWidth={strokeW} />
            </>
          )}
          {shape === 'plate' && (
            <>
              <rect x={22} y={60} width={216} height={80} rx={16} fill="#fff" stroke="#9CA3AF" strokeWidth={strokeW - 2} />
              <rect x={40} y={76} width={180} height={48} rx={12} fill={inner} opacity={0.08} />
            </>
          )}

          {/* Code */}
          <text x="130" y="102" textAnchor="middle" fontSize="30" fontWeight="800" fill={text} fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif">
            {sign.code}
          </text>
          <text x="130" y="132" textAnchor="middle" fontSize="14" fontWeight="700" fill={text} opacity={isMandatory || isInfo || isService ? 0.9 : 0.8} fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif">
            {isAdditional ? 'Əlavə lövhəcik' : isService ? 'Servis' : isInfo ? 'Məlumat' : isPriority ? 'Üstünlük' : isProhibitory ? 'Qadağa' : isWarning ? 'Xəbərdarlıq' : 'Nişan'}
          </text>
        </svg>
      </div>
    </div>
  )

  return commonWrapper
}

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-[#007A3A] text-white shadow-sm'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

export default function RoadSignsPage({ onMenuClick }) {
  const [groupsCollapsed, setGroupsCollapsed] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState('warning')
  const [selectedSignId, setSelectedSignId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [quickFilter, setQuickFilter] = useState('all') // all | exam | mistakes
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)

  const groupCounts = useMemo(() => {
    const counts = Object.fromEntries(GROUPS.map(g => [g.id, 0]))
    for (const s of SIGNS) counts[s.groupId] = (counts[s.groupId] || 0) + 1
    return counts
  }, [])

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredAcrossAll = useMemo(() => {
    let list = [...SIGNS]

    if (quickFilter === 'exam') list = list.filter(s => s.isExam)
    if (quickFilter === 'mistakes') list = list.filter(s => s.isCommonMistake)

    if (!normalizedQuery) return list

    return list.filter(s => {
      const groupName = GROUPS.find(g => g.id === s.groupId)?.name || ''
      return (
        s.name.toLowerCase().includes(normalizedQuery) ||
        s.code.toLowerCase().includes(normalizedQuery) ||
        groupName.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [normalizedQuery, quickFilter])

  const visibleSigns = useMemo(() => {
    if (normalizedQuery) return filteredAcrossAll
    return filteredAcrossAll.filter(s => s.groupId === selectedGroupId)
  }, [filteredAcrossAll, normalizedQuery, selectedGroupId])

  const selectedSign = useMemo(() => {
    return SIGNS.find(s => s.id === selectedSignId) || null
  }, [selectedSignId])

  // Default selected sign (first of default group), and keep selection valid
  useEffect(() => {
    if (selectedSignId && SIGNS.some(s => s.id === selectedSignId)) return
    const first = SIGNS.find(s => s.groupId === selectedGroupId) || SIGNS[0]
    setSelectedSignId(first?.id || null)
  }, [selectedGroupId, selectedSignId])

  useEffect(() => {
    // If current selection isn't visible after filter/search changes, move to first visible.
    if (!visibleSigns.length) return
    const stillVisible = visibleSigns.some(s => s.id === selectedSignId)
    if (!stillVisible) setSelectedSignId(visibleSigns[0].id)
  }, [visibleSigns, selectedSignId])

  const headerMeta = useMemo(() => {
    if (normalizedQuery) return `${visibleSigns.length} nəticə`
    const group = GROUPS.find(g => g.id === selectedGroupId)
    return `${group?.name || 'Qrup'} · ${visibleSigns.length} nişan`
  }, [normalizedQuery, selectedGroupId, visibleSigns.length])

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId)
  }

  const handleSelectSign = (signId) => {
    setSelectedSignId(signId)
    // Mobile / tablet: open bottom sheet
    if (window.matchMedia && window.matchMedia('(max-width: 1023px)').matches) {
      setMobileDetailOpen(true)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-start gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden mt-0.5 w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Menyu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-2xl lg:text-[28px] font-semibold text-gray-900">Yol nişanları</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Burada bütün yol nişanlarını qruplar üzrə görə, hər nişanın şəkli və izahı ilə tanış ola bilərsən.
                  </p>
                </div>

                {/* Search */}
                <div className="w-full lg:w-[420px] relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nişan adı və ya nömrə ilə axtar…"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#007A3A]/25 focus:border-[#007A3A] font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 lg:px-6 py-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_400px] gap-5">
              {/* Left panel: Groups */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm lg:sticky lg:top-24 h-fit">
                <button
                  onClick={() => setGroupsCollapsed(v => !v)}
                  className="w-full px-5 py-4 flex items-center justify-between border-b border-gray-100"
                >
                  <div className="text-left">
                    <h2 className="text-lg font-semibold text-gray-900">Qruplar</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Yol nişanları qrupları</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${groupsCollapsed ? '-rotate-90' : 'rotate-0'}`}
                  />
                </button>

                {!groupsCollapsed && (
                  <div className="p-3">
                    <div className="space-y-1.5">
                      {GROUPS.map(g => {
                        const active = selectedGroupId === g.id
                        return (
                          <button
                            key={g.id}
                            onClick={() => handleSelectGroup(g.id)}
                            className={`w-full group relative rounded-2xl text-left transition-all ${
                              active ? 'bg-[#007A3A]/8' : 'hover:bg-gray-50'
                            }`}
                            style={{ borderRadius: 14 }}
                          >
                            <div className="flex items-center gap-3 px-3.5 py-3">
                              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:shadow-sm transition-all">
                                <ShapeIcon shape={g.shape} active={active} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className={`text-sm ${active ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                                  {g.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">{groupCounts[g.id] || 0} nişan</div>
                              </div>
                            </div>
                            {/* Active indicator */}
                            {active && (
                              <div className="absolute right-0 top-2 bottom-2 w-1 rounded-full bg-[#007A3A]" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </section>

              {/* Middle panel: Grid */}
              <section className="min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{normalizedQuery ? 'Axtarış nəticələri' : 'Nişanlar'}</h2>
                    <p className="text-sm text-gray-600 font-semibold">{headerMeta}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap sm:justify-end">
                    <Chip active={quickFilter === 'all'} onClick={() => setQuickFilter('all')}>Hamısı</Chip>
                    <Chip active={quickFilter === 'exam'} onClick={() => setQuickFilter('exam')}>İmtahana düşənlər</Chip>
                    <Chip active={quickFilter === 'mistakes'} onClick={() => setQuickFilter('mistakes')}>Ən çox səhv edilənlər</Chip>
                  </div>
                </div>

                {visibleSigns.length > 0 ? (
                  <div
                    key={`${selectedGroupId}-${normalizedQuery}-${quickFilter}`}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-slide-up"
                  >
                    {visibleSigns.map(sign => {
                      const isSelected = sign.id === selectedSignId
                      const groupName = GROUPS.find(g => g.id === sign.groupId)?.name
                      return (
                        <button
                          key={sign.id}
                          onClick={() => handleSelectSign(sign.id)}
                          className={`group text-left bg-white rounded-2xl border transition-all overflow-hidden ${
                            isSelected ? 'border-[#007A3A] shadow-md' : 'border-gray-200 hover:border-[#007A3A]'
                          } hover:-translate-y-0.5 hover:shadow-lg`}
                          style={{ borderRadius: 16 }}
                        >
                          <div className="p-3">
                            <div className="rounded-2xl overflow-hidden bg-gray-50 border transition-colors group-hover:border-[#007A3A]" style={{ borderColor: isSelected ? BRAND : '#E5E7EB' }}>
                              <div className="aspect-square sm:aspect-[4/3] flex items-center justify-center p-2">
                                <div className="w-full max-w-[240px]">
                                  <SignVisual sign={sign} emphasized={isSelected} />
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-sm font-extrabold text-gray-900">{sign.code}</div>
                                <div className="text-sm font-semibold text-gray-800 truncate">{sign.name}</div>
                              </div>
                              {sign.isExam && (
                                <span className="shrink-0 text-[11px] font-bold px-2 py-1 rounded-lg bg-[#007A3A]/10 text-[#007A3A] border border-[#007A3A]/20">
                                  İmtahan
                                </span>
                              )}
                            </div>

                            {normalizedQuery && groupName && (
                              <div className="mt-2 text-xs text-gray-500 font-semibold">
                                Kateqoriya: <span className="text-gray-700">{groupName}</span>
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                    <p className="text-lg font-semibold text-gray-900">Heç nə tapılmadı</p>
                    <p className="text-sm text-gray-600 mt-1">Axtarış sözünü və ya filtri dəyişin.</p>
                  </div>
                )}
              </section>

              {/* Right panel: Detail (Desktop) */}
              <aside className="hidden lg:block">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm lg:sticky lg:top-24 overflow-hidden">
                  {selectedSign ? (
                    <div key={selectedSign.id} className="animate-slide-up">
                      <div className="px-6 py-5 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedSign.code}. {selectedSign.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Kateqoriya: {GROUPS.find(g => g.id === selectedSign.groupId)?.name || '—'}
                        </p>
                      </div>

                      <div className="p-6">
                        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-3">
                          <SignVisual sign={selectedSign} size="lg" emphasized />
                        </div>

                        <div className="mt-5">
                          <h4 className="text-sm font-semibold text-gray-900">İzah</h4>
                          <ul className="mt-2 space-y-2 text-sm text-gray-700">
                            <li className="flex gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#007A3A]" />
                              <span><span className="font-semibold">Mənası:</span> {selectedSign.meaning}</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#007A3A]" />
                              <span><span className="font-semibold">Harada tətbiq olunur:</span> {selectedSign.where}</span>
                            </li>
                            <li className="flex gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#007A3A]" />
                              <span><span className="font-semibold">Xüsusi hallar:</span> {selectedSign.exceptions}</span>
                            </li>
                          </ul>

                          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                              <div className="text-gray-500 font-semibold">İmtahan üçün vaciblik</div>
                              <div className="text-gray-900 font-extrabold mt-1">{selectedSign.importance}</div>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                              <div className="text-gray-500 font-semibold">Səhv edilən suallar</div>
                              <div className="text-gray-900 font-extrabold mt-1">{selectedSign.isCommonMistake ? 'Bəli' : 'Xeyr'}</div>
                            </div>
                          </div>

                          <div className="mt-5 flex items-center gap-3">
                            <button
                              onClick={() => alert('Bu nişan üzrə suallar tezliklə əlavə ediləcək')}
                              className="flex-1 px-4 py-3 rounded-2xl font-bold text-sm text-white shadow-sm hover:shadow-md transition-all"
                              style={{ background: BRAND }}
                            >
                              Bu nişan üzrə sual həll et
                            </button>
                            <button
                              onClick={() => alert('Mövzu səhifəsi tezliklə əlavə ediləcək')}
                              className="flex-1 px-4 py-3 rounded-2xl font-bold text-sm border border-[#007A3A] text-[#007A3A] hover:bg-[#007A3A]/5 transition-all"
                            >
                              Mövzuya bax
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6">
                      <p className="text-sm text-gray-600">Detalları görmək üçün bir nişan seçin.</p>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile / Tablet Bottom Sheet */}
      {mobileDetailOpen && selectedSign && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileDetailOpen(false)}
            aria-label="Bağla"
          />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl max-h-[88vh] overflow-hidden animate-slide-up">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-1.5 rounded-full bg-gray-200 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
                <div className="min-w-0 pt-2">
                  <div className="text-sm font-extrabold text-gray-900 truncate">{selectedSign.code}. {selectedSign.name}</div>
                  <div className="text-xs text-gray-500 font-semibold truncate">
                    {GROUPS.find(g => g.id === selectedSign.groupId)?.name || '—'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileDetailOpen(false)}
                className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Bağla"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-3">
                <SignVisual sign={selectedSign} size="lg" emphasized />
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-900">İzah</h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#007A3A]" />
                    <span><span className="font-semibold">Mənası:</span> {selectedSign.meaning}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#007A3A]" />
                    <span><span className="font-semibold">Harada:</span> {selectedSign.where}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#007A3A]" />
                    <span><span className="font-semibold">Xüsusi hallar:</span> {selectedSign.exceptions}</span>
                  </li>
                </ul>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <div className="text-gray-500 font-semibold">Vaciblik</div>
                    <div className="text-gray-900 font-extrabold mt-1">{selectedSign.importance}</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <div className="text-gray-500 font-semibold">Səhv edilənlər</div>
                    <div className="text-gray-900 font-extrabold mt-1">{selectedSign.isCommonMistake ? 'Bəli' : 'Xeyr'}</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => alert('Bu nişan üzrə suallar tezliklə əlavə ediləcək')}
                    className="px-4 py-3 rounded-2xl font-bold text-sm text-white shadow-sm hover:shadow-md transition-all"
                    style={{ background: BRAND }}
                  >
                    Bu nişan üzrə sual həll et
                  </button>
                  <button
                    onClick={() => alert('Mövzu səhifəsi tezliklə əlavə ediləcək')}
                    className="px-4 py-3 rounded-2xl font-bold text-sm border border-[#007A3A] text-[#007A3A] hover:bg-[#007A3A]/5 transition-all"
                  >
                    Mövzuya bax
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

