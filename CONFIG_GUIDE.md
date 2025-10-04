# DDA.az Mobile - Configuration Guide

> **Konfiqurasiya Bələdçisi** / Production-ready React Native app üçün tənzimləmə təlimatları

## 📋 İçindəkilər / Table of Contents

1. [Başlanğıc Qurulum / Initial Setup](#başlanğıc-qurulum--initial-setup)
2. [Paketləri Redaktə Etmək / Edit Packages](#paketləri-redaktə-etmək--edit-packages)
3. [Sual Bankını İdxal Etmək / Import Question Bank](#sual-bankını-idxal-etmək--import-question-bank)
4. [3D Dərs Feedini Əlavə Etmək / Add 3D Lesson Feed](#3d-dərs-feedini-əlavə-etmək--add-3d-lesson-feed)
5. [Real API-ni Qoşmaq / Plug Real API](#real-api-ni-qoşmaq--plug-real-api)
6. [Ödəniş Sistemi / Payment Integration](#ödəniş-sistemi--payment-integration)
7. [Autentifikasiya / Authentication](#autentifikasiya--authentication)
8. [Tərcümələri İdarə Etmək / Manage Translations](#tərcümələri-idarə-etmək--manage-translations)
9. [Deep Links](#deep-links)
10. [Push Notifications](#push-notifications)
11. [Analytics](#analytics)
12. [EAS Build & Deploy](#eas-build--deploy)

---

## 🚀 Başlanğıc Qurulum / Initial Setup

### 1. Dependencies Yükləyin / Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

`.env.example` faylını `.env` kimi kopyalayın və dəyişdirin:

```bash
cp .env.example .env
```

`.env` faylında öz açarlarınızı əlavə edin:

```env
API_URL=https://your-api.dda.az/v1
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
SEGMENT_WRITE_KEY=your_segment_key
```

### 3. Tətbiqi Başlatın / Start the App

```bash
# Development mode
npm start

# iOS
npm run ios

# Android
npm run android
```

---

## 📦 Paketləri Redaktə Etmək / Edit Packages

Paket planlarını dəyişdirmək üçün:

**Fayl:** `src/services/mockData.ts` → `mockPackages` massivini redaktə edin

```typescript
export const mockPackages: Package[] = [
  {
    id: 'premium',
    name: 'Premium Plus',    // Paket adı (AZ)
    nameEn: 'Premium Plus',  // Paket adı (EN)
    nameRu: 'Премиум Плюс',  // Paket adı (RU)
    price: 99.99,            // İllik qiymət
    priceMonthly: 8.33,      // Aylıq ekvivalent
    currency: 'AZN',
    duration: 'yearly',      // 'monthly' | 'yearly' | 'lifetime'
    popular: true,           // En popüler badge
    features: [              // Xüsusiyyətlər (AZ)
      'Bütün dərslər',
      'Limitsiz testlər',
      // ...
    ],
    featuresEn: [...],       // Features (EN)
    featuresRu: [...],       // Features (RU)
    stripePriceId: 'price_xyz', // Stripe Price ID
  },
];
```

**Real backend ilə əlaqələndirmək üçün:**

`src/store/packagesStore.ts` faylında `setPackages` metodunu API çağırışı ilə əvəz edin:

```typescript
import { apiClient } from '@/services/api';

// In your component or hook
const loadPackages = async () => {
  const packages = await apiClient.get<Package[]>('/packages');
  setPackages(packages);
};
```

---

## ❓ Sual Bankını İdxal Etmək / Import Question Bank

### Mövcud Mock Suallara Əlavə Etmək

**Fayl:** `src/services/mockData.ts` → `mockQuestions` massivi

```typescript
export const mockQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Sual mətni (AZ)',
    textEn: 'Question text (EN)',
    textRu: 'Текст вопроса (RU)',
    options: ['Variant 1', 'Variant 2', 'Variant 3', 'Variant 4'],
    optionsEn: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    optionsRu: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4'],
    correctIndex: 1, // Doğru cavab indeksi (0-based)
    explanation: 'İzah (AZ)',
    explanationEn: 'Explanation (EN)',
    explanationRu: 'Объяснение (RU)',
    imageUrl: 'https://...', // Opsional şəkil
    category: 'rules', // Kateqoriya
  },
  // ...
];
```

### Real API-dən Yükləmək

`src/features/simulator/SimulatorScreen.tsx` faylında:

```typescript
import { apiClient } from '@/services/api';

const handleStartExam = async () => {
  // API-dən sualları yüklə
  const questions = await apiClient.get<Question[]>('/questions?mode=exam&count=10');
  
  navigation.navigate('Exam', { 
    mode: 'exam',
    questions 
  });
};
```

---

## 🎥 3D Dərs Feedini Əlavə Etmək / Add 3D Lesson Feed

### Mock Dərsləri Redaktə Etmək

**Fayl:** `src/services/mockData.ts` → `mockLessons` və `mockTopics`

```typescript
export const mockTopics: Topic[] = [
  {
    id: '1',
    title: 'Mövzu adı (AZ)',
    titleEn: 'Topic name (EN)',
    titleRu: 'Название темы (RU)',
    lessonCount: 5,
    completedLessons: 0,
    iconName: 'traffic-light', // İkon identifikatoru
  },
];

export const mockLessons: Lesson[] = [
  {
    id: 'l1',
    topicId: '1',
    title: 'Dərs adı (AZ)',
    titleEn: 'Lesson name (EN)',
    titleRu: 'Название урока (RU)',
    duration: 320, // saniyə
    videoUrl: 'https://cdn.dda.az/videos/lesson1.mp4', // HLS/MP4
    thumbnailUrl: 'https://cdn.dda.az/thumbs/lesson1.jpg',
    keyPoints: [
      'Əsas məqam 1',
      'Əsas məqam 2',
    ],
    completed: false,
    downloaded: false,
    progress: 0,
  },
];
```

### Real API-dən Dərsləri Yükləmək

`src/features/learn/LearnScreen.tsx`:

```typescript
useEffect(() => {
  const loadLessons = async () => {
    const topics = await apiClient.get<Topic[]>('/topics');
    const lessons = await apiClient.get<Lesson[]>('/lessons');
    
    setTopics(topics);
    setLessons(lessons);
  };
  
  loadLessons();
}, []);
```

### Video Player Konfiqurasiyası

Video oynatmaq üçün `expo-av` istifadə olunur. `src/features/learn/LessonDetailScreen.tsx` faylında:

```typescript
import { Video } from 'expo-av';

<Video
  source={{ uri: lesson.videoUrl }}
  style={styles.video}
  useNativeControls
  resizeMode="contain"
  shouldPlay={false}
/>
```

**Offline yükləmə üçün:** `expo-file-system` istifadə edərək videoları yükləyin və lokal path istifadə edin.

---

## 🌐 Real API-ni Qoşmaq / Plug Real API

### 1. API Base URL

`.env` faylında:

```env
API_URL=https://api.dda.az/v1
```

### 2. API Client

API client artıq konfiqurasiya olunub: `src/services/api.ts`

**Auth token avtomatik əlavə olunur:**

```typescript
// Request interceptor avtomatik olaraq Bearer token əlavə edir
config.headers.Authorization = `Bearer ${token}`;
```

### 3. Endpoint-ləri Əlavə Etmək

Yeni API endpoint-ləri əlavə etmək üçün `src/services/api.ts` faylında metodlar yaradın:

```typescript
export const lessonsApi = {
  getAll: () => apiClient.get<Lesson[]>('/lessons'),
  getById: (id: string) => apiClient.get<Lesson>(`/lessons/${id}`),
  markComplete: (id: string) => apiClient.post(`/lessons/${id}/complete`),
};

export const questionsApi = {
  getExam: (count: number) => apiClient.get<Question[]>(`/questions?mode=exam&count=${count}`),
  submitExam: (answers: ExamAttempt) => apiClient.post('/exams/submit', answers),
};
```

**Komponentlərdə istifadə:**

```typescript
import { lessonsApi } from '@/services/api';

const lessons = await lessonsApi.getAll();
```

---

## 💳 Ödəniş Sistemi / Payment Integration

### Stripe Integration

**1. Stripe açarlarını əlavə edin (.env):**

```env
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
```

**2. Stripe SDK-ni quraşdırın:**

```bash
npm install @stripe/stripe-react-native
```

**3. Payment flow:**

`src/features/packages/PackagesScreen.tsx` faylında `handlePurchase` funksiyasını yeniləyin:

```typescript
import { useStripe } from '@stripe/stripe-react-native';

const { initPaymentSheet, presentPaymentSheet } = useStripe();

const handlePurchase = async (packageId: string) => {
  // 1. Backend-dən Payment Intent al
  const { clientSecret } = await apiClient.post('/payments/create-intent', {
    packageId,
  });

  // 2. Payment Sheet-i başlat
  await initPaymentSheet({
    paymentIntentClientSecret: clientSecret,
    merchantDisplayName: 'DDA.az',
  });

  // 3. Payment Sheet-i göstər
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert('Xəta', error.message);
  } else {
    Alert.alert('Uğurlu', 'Ödəniş tamamlandı! 🎉');
    setCurrentPackage(packageId);
  }
};
```

### In-App Purchases (iOS/Android)

`react-native-iap` istifadə edin:

```bash
npm install react-native-iap
```

**Product ID-ləri:** Paket obyektlərində `iapProductId` əlavə edin.

---

## 🔐 Autentifikasiya / Authentication

### Phone/OTP Flow

**Backend endpoint-ləri:**

```
POST /auth/send-otp
Body: { phone: "+994501234567" }
Response: { success: true, expires_in: 300 }

POST /auth/verify-otp
Body: { phone: "+994501234567", code: "1234" }
Response: { token: "jwt_token", user: {...} }
```

**Frontend:**

`src/features/auth/LoginScreen.tsx` və `VerifyCodeScreen.tsx` fayllarında API çağırışlarını əlavə edin:

```typescript
// LoginScreen.tsx
const handleSendCode = async () => {
  await apiClient.post('/auth/send-otp', { phone });
  navigation.navigate('VerifyCode', { phone });
};

// VerifyCodeScreen.tsx
const handleVerify = async () => {
  const { token, user } = await apiClient.post('/auth/verify-otp', { phone, code });
  await login(user, token);
};
```

### Social Login (Apple/Google)

**Apple Sign In:**

```bash
expo install expo-apple-authentication
```

**Google Sign In:**

```bash
expo install @react-native-google-signin/google-signin
```

`src/features/auth/LoginScreen.tsx` faylında social login düymələrini əlavə edin.

---

## 🌍 Tərcümələri İdarə Etmək / Manage Translations

Tərcümə faylları `src/i18n/` qovluğundadır:

- `az.ts` - Azərbaycan
- `en.ts` - English
- `ru.ts` - Русский

### Yeni Key Əlavə Etmək

Hər 3 fayla eyni key əlavə edin:

```typescript
// az.ts
export default {
  common: {
    myNewKey: 'Yeni mətn',
  },
};

// en.ts
export default {
  common: {
    myNewKey: 'New text',
  },
};

// ru.ts
export default {
  common: {
    myNewKey: 'Новый текст',
  },
};
```

### Komponentdə İstifadə

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<Text>{t('common.myNewKey')}</Text>
```

### Dil Dəyişdirmək

```typescript
import i18n from '@/i18n';

i18n.changeLanguage('en'); // 'az' | 'en' | 'ru'
```

---

## 🔗 Deep Links

Deep link sxemi: `dda://`

### Konfiqurasiya

`app.json` faylında artıq konfiqurasiya olunub:

```json
{
  "scheme": "dda"
}
```

### URL Format

```
dda://lesson/:lessonId        → Dərs səhifəsinə get
dda://exam/start              → İmtahan başlat
dda://packages                → Paketlər səhifəsinə get
dda://redeem/:code            → Promo/Müəllim kodu tətbiq et
```

### Navigation Handling

Deep link-ləri idarə etmək üçün `src/app/navigation/RootNavigator.tsx` faylında:

```typescript
import * as Linking from 'expo-linking';

const linking = {
  prefixes: ['dda://'],
  config: {
    screens: {
      Main: {
        screens: {
          Learn: {
            screens: {
              LessonDetail: 'lesson/:lessonId',
            },
          },
        },
      },
    },
  },
};

<NavigationContainer linking={linking}>
```

---

## 🔔 Push Notifications

### Setup

`expo-notifications` artıq quraşdırılıb.

### Schedule Daily Reminder

```typescript
import { notificationService } from '@/services/notifications';

// 20:00-da gündəlik xatırlatma
await notificationService.scheduleDailyReminder(20, 0);
```

### Send Local Notification

```typescript
await notificationService.sendLocalNotification(
  'Dərs tamamlandı! 🎉',
  'Növbəti dərsə keçin'
);
```

### Backend Push Notifications

Push token-i backend-ə göndərin:

```typescript
const token = await notificationService.getPushToken();
await apiClient.post('/users/push-token', { token });
```

---

## 📊 Analytics

Analytics stub `src/services/analytics.ts` faylında mövcuddur.

### Segment/Expo Analytics İnteqrasiyası

```bash
npm install expo-analytics-segment
```

```typescript
// src/services/analytics.ts
import * as Segment from 'expo-analytics-segment';

Segment.initialize({ androidWriteKey: 'YOUR_KEY', iosWriteKey: 'YOUR_KEY' });

export const analytics = {
  trackScreen: (name: string) => {
    Segment.screen(name);
  },
  trackEvent: (event: string, properties?: object) => {
    Segment.track(event, properties);
  },
  identify: (userId: string, traits?: object) => {
    Segment.identify(userId, traits);
  },
};
```

### Hadisələri İzləmək / Track Events

```typescript
import { analytics } from '@/services/analytics';

// Ekran baxışı
analytics.trackScreen('LessonDetail');

// Hadisə
analytics.trackEvent('lesson_completed', { lessonId: 'l1', duration: 320 });

// İstifadəçi müəyyənləşdirmə
analytics.identify(user.id, { name: user.name, plan: 'premium' });
```

---

## 🚀 EAS Build & Deploy

### EAS CLI Quraşdırın

```bash
npm install -g eas-cli
eas login
```

### Build Profiles

`eas.json` yaradın:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "autoIncrement": true
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Build Commands

```bash
# Development build
eas build --profile development --platform android

# Production build
eas build --profile production --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## 📚 Əlavə Resurlar / Additional Resources

- **Expo Docs:** https://docs.expo.dev
- **React Navigation:** https://reactnavigation.org
- **i18next:** https://www.i18next.com
- **Zustand:** https://github.com/pmndrs/zustand
- **React Query:** https://tanstack.com/query

---

## ❓ Kömək / Support

Problemlər və ya suallar üçün:

- **Email:** support@dda.az
- **WhatsApp:** +994 XX XXX XX XX
- **GitHub Issues:** [repo-link]

---

**Built with ❤️ for DDA.az**
