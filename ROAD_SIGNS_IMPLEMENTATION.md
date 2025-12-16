# Yol Nişanları Səhifəsi - İmplementasiya Təfərrüatları

## 📋 Ümumi Baxış

Digital Driving Academy (DDA) üçün tam funksional, modern və istifadəçi dostu "Yol nişanları" səhifəsi yaradılmışdır. Dizayn Ruli Online nümunəsindən ilham alaraq, DDA brend rəngləri və müasir UI/UX prinsipləri ilə həyata keçirilmişdir.

## ✨ Əsas Xüsusiyyətlər

### 1. Layout və Struktur

#### Desktop Versiya (1024px+)
- **2 sütunlu layout:**
  - Sol sidebar (320px): Qruplar siyahısı
  - Sağ kontent sahəsi: Seçilmiş qrupun nişanları
- **Yapışqan header:** Axtarış və səhifə başlığı
- **Scroll davranışı:** Tək vertikal scroll, ayrı detail paneli yoxdur

#### Mobil Versiya (<1024px)
- **1 sütunlu layout:**
  - Qruplar dropdown selector ilə idarə olunur
  - Nişan kartları tam genişlikdə (full-width)
  - Bütün elementlər touch-friendly

### 2. Qrup Sidebar

#### Qrup Strukturu (7 qrup)
1. **Xəbərdarlıq nişanları** - 34 nişan
2. **Üstünlük nişanları** - 12 nişan
3. **Qadağan nişanları** - 28 nişan
4. **Məcburi nişanlar** - 16 nişan
5. **İnformasiya nişanları** - 22 nişan
6. **Xidmət nişanları** - 18 nişan
7. **Əlavə nişanlar** - 14 nişan

#### Vizual Elementlər
- Hər qrup üçün unikal ikon
- Aktiv qrup: yaşıl fon + sol kənarda 4px yaşıl zolaq
- Hover effekti: açıq boz fon
- Qrup sayı kiçik boz mətnlə göstərilir

### 3. Nişan Kartları

#### Kart Strukturu (3 əsas zona)

**1. Üst Hissə - Nişan Şəkli**
- 140-180px hündürlük
- Ağ fon, incə boz sərhəd
- Hover zamanı yaşıl sərhəd
- Klik ediləndə modal açılır (lightbox)

**2. Orta Hissə - Ad və Kateqoriya**
- Nişan kodu + adı (bold, 16-18px)
- Kateqoriya (kiçik boz mətn, 12-13px)

**3. Alt Hissə - Detallar və Əməliyyatlar**
- **İzah bloku:**
  - Mənası
  - Harada tətbiq olunur
  - Xüsusi hallar
- **Tag-lar:**
  - "İmtahan üçün vacib" (qırmızı)
  - "Orta əhəmiyyətli" (narıncı)
  - "Çox səhv edilir" (narıncı)
- **Əməliyyat düymələri:**
  - Primary: "Bu nişan üzrə sual həll et" (yaşıl)
  - Secondary: "Mövzuya bax" (outline)

#### Grid Layout
- Desktop: 2 sütun, 24px gap
- Tablet: 1-2 sütun (dinamik)
- Mobil: 1 sütun, full-width

#### Hover Effektləri
- Kart 2px yuxarı qalxır (`translateY(-2px)`)
- Kölgə güclənir
- İncə yaşıl sərhəd əlavə olunur
- Nişan şəkli ətrafındakı sərhəd tündləşir

### 4. Axtarış və Filterlər

#### Axtarış Funksiyası
- Real-time axtarış (live search)
- Nişan adı və koduna görə filter
- Seçilmiş qrupda və ya bütün nişanlarda axtarış

#### Filter Chip-lər
1. **Hamısı** - Bütün nişanları göstər
2. **İmtahana düşənlər** - Yalnız yüksək əhəmiyyətli nişanlar
3. **Ən çox səhv edilənlər** - Tez-tez səhv edilən nişanlar

- Aktiv filter: yaşıl fon, ağ mətn
- İnaktiv: ağ fon, boz mətn, outline

### 5. Modal (Lightbox)

#### Funksiyalar
- Nişan şəklinə klik edildikdə açılır
- Böyüdülmüş şəkil (300px+)
- Tam detallar göstərilir
- ESC düyməsi ilə və ya arxa fona klikləməklə bağlanır
- Açıq olduqda body scroll bloklanır

## 🎨 Dizayn Sistemi

### Rəng Paleti
```css
/* Fon rənglər */
--background: #F5F7FA
--card-background: #FFFFFF

/* Primary rənglər (DDA Yaşıl) */
--primary-50: #f0fdf4
--primary-100: #dcfce7
--primary-500: #22c55e
--primary-600: #16a34a
--primary-700: #15803d

/* Boz tonlar */
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-200: #E5E7EB
--gray-300: #D1D5DB
--gray-500: #6B7280
--gray-600: #4B5563
--gray-700: #374151
--gray-900: #111827
```

### Radius və Kölgələr
```css
/* Border radius */
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 20px
--radius-pill: 999px

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

### Typoqrafiya
```css
/* Font sizes */
--text-xs: 12px
--text-sm: 14px
--text-base: 16px
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px
--text-3xl: 30px

/* Line heights */
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.7
```

### Spacing
```css
/* Padding/Margin scale */
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
```

## 📱 Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px   /* Mobil Landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

### Responsive Davranış

#### < 640px (Kiçik Mobil)
- 1 sütun layout
- Qruplar dropdown
- Kartlar full-width
- Düymələr vertikal düzülür
- 16px padding kənarlardan

#### 640px - 1023px (Tablet)
- 1-2 sütun kartlar (dinamik)
- Qruplar dropdown
- Düymələr horizontal

#### 1024px+ (Desktop)
- 2 sütunlu ana layout (sidebar + kontent)
- Kartlar 2 sütunda
- Sidebar fixed genişlikdə
- Hover effektləri aktiv

## 📊 Məlumat Strukturu

### roadSignsData.js
```javascript
{
  1: [ /* Xəbərdarlıq nişanları */ ],
  2: [ /* Üstünlük nişanları */ ],
  3: [ /* Qadağan nişanları */ ],
  4: [ /* Məcburi nişanlar */ ],
  5: [ /* İnformasiya nişanları */ ],
  6: [ /* Xidmət nişanları */ ],
  7: [ /* Əlavə nişanlar */ ]
}
```

### Nişan Obyekti Strukturu
```javascript
{
  code: '3.1',
  name: 'Hərəkət qadağandır',
  meaning: 'Bu yoldan heç bir nəqliyyat vasitəsinin hərəkəti qadağandır.',
  application: 'Qapalı yollarda və ya təmirlər zamanı.',
  specialNote: 'Ümumi qadağa - heç kim keçə bilməz.',
  examImportance: 'high', // 'high', 'medium', 'low'
  commonMistakes: true // boolean
}
```

## 🗂️ Fayl Strukturu

```
src/components/RoadSigns/
├── index.jsx                 # Ana komponent (layout, state management)
├── GroupSidebar.jsx          # Qruplar sidebar komponenti
├── SignCard.jsx              # Nişan kartı komponenti
├── SignDetailModal.jsx       # Modal/lightbox komponenti
└── roadSignsData.js          # Bütün nişanların məlumatları (144 nişan)
```

## 🔄 State Management

### Ana State (index.jsx)
```javascript
const [selectedGroup, setSelectedGroup] = useState(1)
const [searchQuery, setSearchQuery] = useState('')
const [activeFilter, setActiveFilter] = useState('all')
```

### Filter Məntiqi
1. Seçilmiş qrupdan nişanlar götürülür
2. Axtarış sorğusu tətbiq edilir (ad və kod üzrə)
3. Aktiv filter tətbiq edilir (exam/mistakes)
4. Nəticələr render edilir

## ⚡ Performance Optimizasyaları

1. **Lazy rendering:** Yalnız görünən qrupun nişanları render edilir
2. **Search debouncing:** (əlavə edilə bilər)
3. **Virtual scrolling:** Böyük siyahılar üçün (gələcək təkmilləşdirmə)
4. **Image lazy loading:** Şəkillər əlavə edildikdə tətbiq ediləcək

## 🎯 İstifadəçi Təcrübəsi (UX)

### Navigasiya Axını
1. İstifadəçi səhifəyə daxil olur → İlk qrup aktiv
2. Sol paneldən qrup seçir → Sağ tərəfdə nişanlar göstərilir
3. Axtarış yazdıqca real-time filter
4. Filter chip seçir → Nəticələr instant dəyişir
5. Nişan şəklinə klik → Modal açılır, böyük şəkil görür
6. Düymələrə klik → Sual həlli və ya mövzu səhifəsinə yönlənir

### Accessibility (A11y)
- Keyboard navigation dəstəklənir (Tab, Enter, Esc)
- ARIA label-lar əlavə edilə bilər
- Contrast nisbətləri WCAG 2.1 AA standartlarına uyğundur
- Focus state-lər aydın şəkildə göstərilir

## 🔮 Gələcək Təkmilləşdirmələr

### Faza 1 (Priority)
- [ ] Real nişan şəkillərinin əlavə edilməsi
- [ ] Backend API inteqrasiyası
- [ ] Sual həlli səhifəsinə keçid
- [ ] Favoritlərə əlavə et funksiyası

### Faza 2
- [ ] Nişanları PDF-ə export et
- [ ] Çap etmə funksiyası
- [ ] Proqressiv yükləmə (infinite scroll)
- [ ] Test rejimi (quiz mode)

### Faza 3
- [ ] AR görüntüləmə (kamera ilə nişan tanıma)
- [ ] Səsli izah
- [ ] Video dərslər inteqrasiyası
- [ ] Şəxsi qeydlər əlavə et

## 🧪 Test Ssenariləri

### Funksional Testlər
1. ✅ Qrup seçimi işləyir
2. ✅ Axtarış filtrasiyası işləyir
3. ✅ Filter chip-lər düzgün filter edir
4. ✅ Modal açılıb bağlanır
5. ✅ Responsive layout düzgün işləyir
6. ✅ Hover effektləri göstərilir

### Responsive Testlər
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] Desktop (1920px)
- [ ] Ultrawide (2560px)

## 📝 İstifadə Təlimatları

### Komponenti necə import etmək olar:
```javascript
import RoadSigns from './components/RoadSigns'

// Istifadə
<RoadSigns onBack={() => setCurrentPage('dashboard')} />
```

### Yeni nişan əlavə etmək:
1. `roadSignsData.js` faylını aç
2. Uyğun qrup ID-sinə get (1-7)
3. Yeni obyekt əlavə et:
```javascript
{
  code: '3.29',
  name: 'Yeni nişan',
  meaning: 'İzah...',
  application: 'Harada tətbiq olunur...',
  specialNote: 'Əlavə qeydlər...',
  examImportance: 'high',
  commonMistakes: false
}
```

## 🤝 Töhfə Vermək

Bu layihəyə töhfə vermək istəyirsinizsə:
1. Yeni feature branch yaradın
2. Dəyişiklikləri edin
3. Test edin
4. Pull request göndərin

## 📞 Dəstək

Suallar və ya problemlər üçün: DDA Development Team

---

**Version:** 1.0.0  
**Last Updated:** December 16, 2025  
**Author:** DDA UI/UX Team
