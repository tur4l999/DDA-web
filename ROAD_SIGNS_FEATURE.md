# Yol Nişanları Səhifəsi - Feature Dokumentasiyası

## 📋 Ümumi Baxış

Digital Driving Academy (DDA) üçün tam yeni "Yol Nişanları" səhifəsi dizayn edilib və implementasiya olunub. Bu səhifə Ruli Online nümunəsindən ilham alaraq, daha modern və istifadəçi dostu interfeysə malikdir.

## ✨ Əsas Xüsusiyyətlər

### 1. Layout və Struktur

#### Desktop Versiya (≥1024px)
- **Sol Sidebar (280-320px)**: Yol nişanı qruplarının siyahısı
  - Hər qrup üçün ikon, ad və say göstərilir
  - Aktiv qrup yaşıl fonda, sol kənarda indicator zolağı ilə vurğulanır
  - Sticky pozisiyası - scroll zamanı görünməyə davam edir

- **Sağ Kontent Sahəsi**: Nişan kartlarının əsas sahəsi
  - 2 sütunlu grid layout
  - Hər kart ayrı-ayrılıqda tam məlumatı göstərir
  - Ayrıca detail panel YOXDUR - hər şey kart içindədir

#### Mobil Versiya (<1024px)
- Sol sidebar dropdown menyu ilə əvəz olunur
- Kartlar tək sütunlu görünür
- Barmaqla rahat skroll və touch-friendly düymələr
- Tam responsive və adaptiv

### 2. Yol Nişanı Qrupları

Sistemdə 8 əsas qrup mövcuddur:

1. **Hamısı** - Bütün nişanlar
2. **Xəbərdarlıq nişanları** ⚠️ - Yol təhlükələri
3. **Üstünlük nişanları** 🔺 - Hərəkət prioriteti
4. **Qadağan nişanları** 🚫 - Qadağan olunan hərəkətlər
5. **Məcburi nişanlar** 🔵 - Məcburi istiqamətlər
6. **İnformasiya nişanları** ℹ️ - Yol şəraiti məlumatları
7. **Xidmət nişanları** 🔧 - Xidmət məntəqələri
8. **Əlavə nişanlar** ➕ - Tamamlayıcı nişanlar

### 3. Nişan Kartı Komponenti

Hər nişan kartı aşağıdakı elementləri ehtiva edir:

#### Üst Hissə - Nişan Şəkli
- 140-180px hündürlükdə mərkəzləşdirilmiş şəkil
- Ağ fon, kölgə və incə sərhəd
- Hover effekti: zoom göstəricisi
- Klikləndikdə modal açılır

#### Orta Hissə - Ad və Kod
- Başlıq: "Kod + Ad" (məs: "3.1 Hərəkət qadağandır")
- Alt başlıq: Kateqoriya adı

#### Alt Hissə - Detallar
- **Mənası**: Nişanın əsas mənası
- **Harada tətbiq olunur**: Tətbiq sahələri
- **Xüsusi hallar**: Xüsusi şərtlər və qeydlər

#### Tag-lar
- İmtahan vacibliyi: Yüksək/Orta/Aşağı (rəng kodlu)
- Çox səhv edilənlər: Orange tag

#### Hərəkət Düymələri
- **Əsas düymə**: "Bu nişan üzrə sual həll et" (yaşıl)
- **İkinci düymə**: "Mövzuya bax" (outline)

### 4. Axtarış və Filter Funksiyaları

#### Axtarış
- Üst başlıqda yerləşir
- Real-time axtarış
- Nişan adı, kodu və izahı üzrə axtarış edir
- Placeholder: "Nişan adı və ya nömrə ilə axtar…"

#### Filter Chip-ləri
- **Hamısı**: Bütün nişanlar
- **İmtahana düşənlər**: Yalnız yüksək prioritetli nişanlar
- **Ən çox səhv edilənlər**: Tez-tez səhv edilən nişanlar

### 5. Modal / Lightbox

Nişan kartına klik edildikdə açılan modal:
- Böyüdülmüş nişan şəkli
- Tam ətraflı məlumat
- Rəng kodlu məlumat blokları:
  - Yaşıl (primary): Mənası
  - Boz: Tətbiq sahəsi
  - Sarı: Xüsusi hallar
  - Ağ: Əlavə detallar
- Tag-lar və hərəkət düymələri
- X düyməsi ilə bağlanır

## 🎨 Dizayn Detalları

### Rəng Palitri
- **Fon**: #F5F7FA (açıq boz)
- **Kart**: #FFFFFF (ağ)
- **Primary**: DDA yaşıl (#22c55e, #16a34a, #15803d)
- **Mətn**: #4B5563, #6B7280 (boz tonlar)
- **Qırmızı**: Yüksək prioritet tag-ları
- **Sarı**: Orta prioritet tag-ları
- **Orange**: Səhv edilmə göstəricisi

### Border Radius
- Kartlar: 16px
- Modal: 24px
- Chip-lər: 9999px (pill)
- Düymələr: 12px

### Kölgə və Effektlər
- Kart kölgəsi: shadow-sm
- Hover kölgəsi: shadow-lg
- Hover transform: -translateY(2px)
- Modal kölgəsi: shadow-2xl

### Typoqrafiya
- Səhifə başlığı: 24-28px, bold
- Qrup adı: 16-18px, semi-bold
- Nişan adı: 18px, bold
- Kateqoriya: 12px, normal
- İzah: 14px, line-height 1.5

## 📱 Responsivlik

### Breakpoint-lər
- **Desktop**: ≥1024px - 2 sütunlu sidebar + grid layout
- **Tablet**: 768-1023px - 1-2 sütunlu kartlar
- **Mobil**: <768px - Tək sütun, dropdown qruplar

### Mobil Optimizasiyalar
- Touch-friendly düymələr (min 48px hündürlük)
- Dropdown qrup seçici
- Tam genişlikdə kartlar
- Azaldılmış padding və margin
- Daha kompakt mətn

## 🚀 Texniki Detallar

### Komponent Strukturu
```
RoadSigns/
├── index.jsx           # Əsas səhifə komponenti
├── RoadSignCard.jsx    # Fərdi nişan kartı
├── RoadSignModal.jsx   # Detail modal
└── roadSignsData.js    # Nişan məlumatları
```

### State Management
- `selectedGroup`: Seçilmiş qrup ID-si
- `searchQuery`: Axtarış mətni
- `activeFilter`: Aktiv filter (all/exam/mistakes)
- `isMobileGroupsOpen`: Mobil dropdown state

### Performans
- `useMemo` hook-dan istifadə - filter və axtarış üçün
- Lazy image loading
- Optimized re-render-lər

### Accessibility
- Semantic HTML
- ARIA label-lar (tətbiq edilə bilər)
- Keyboard navigation (tətbiq edilə bilər)
- Screen reader friendly

## 📊 Məlumat Strukturu

Hər nişan obyekti:
```javascript
{
  id: 'w1',                    // Unikal ID
  code: '1.1',                 // Rəsmi kod
  name: 'Təhlükəli döngə',     // Ad
  category: 'warning',         // Kateqoriya
  image: 'url',               // Şəkil URL-i
  meaning: '...',             // Əsas məna
  application: '...',         // Tətbiq sahəsi
  specialCases: '...',        // Xüsusi hallar
  examImportance: 'high',     // Prioritet
  commonMistake: true,        // Səhv edilir?
  detailedDescription: '...'  // Ətraflı məlumat
}
```

## 🔄 İstifadə Ssenarisi

1. İstifadəçi səhifəyə daxil olur
2. Sol sidebar-da və ya dropdown-da qrup seçir
3. Həmin qrupun nişanları sağda görünür
4. Axtarış qutusu ilə spesifik nişan axtar
5. Filter chip-ləri ilə nəticələri daralt
6. Nişan kartına klik edərək ətraflı məlumat gör
7. Modal-dan sual həll et və ya mövzuya keç

## ✅ Acceptance Criteria Yoxlaması

- ✅ Desktop-də sol qruplar, sağ böyük kartlar
- ✅ Ayrı sağ detail panel YOXDUR
- ✅ Mobil-də dropdown qruplar
- ✅ Bütün detallar kart içində
- ✅ Ruli Online-ə bənzər, amma daha modern
- ✅ DDA brend rəngləri
- ✅ Tam responsive
- ✅ Axtarış və filter funksional
- ✅ Modal detail view
- ✅ Hover effektləri
- ✅ Touch-friendly mobil
- ✅ Azərbaycan dilində

## 🎯 Gələcək Təkmilləşdirmələr

Potensial əlavələr:
1. **Backend inteqrasiyası**: API-dən real data
2. **Favoritlər**: İstifadəçi sevimlilərini saxlaya bilsin
3. **Share**: Nişanı paylaş funksiyası
4. **Print**: Print-friendly versiya
5. **Quiz**: Nişan üzərindən birbaşa sual açılsın
6. **Statistics**: Hansı nişanlara daha çox baxılır
7. **Offline support**: PWA və offline cache
8. **Animations**: Daha zəngin keçid animasiyaları

## 📝 Qeydlər

- Bütün mətnlər Azərbaycan dilindədir
- Dizayn Figma-ya uyğun olaraq kodlanıb
- Tailwind CSS istifadə edilib
- Lucide React icon library-dən istifadə
- Vite build tool ilə optimize edilib
- Production build uğurla tamamlandı

---

**Yaradılma tarixi**: 21 Dekabr 2025  
**Versiya**: 1.0.0  
**Status**: ✅ Tamamlandı və test edildi
