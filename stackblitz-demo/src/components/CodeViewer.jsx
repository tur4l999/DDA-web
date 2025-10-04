import React from 'react';

const codeExamples = {
  home: `// HomeScreen.tsx
import { useAuthStore } from '@/store/authStore';
import { ProgressRing, Card } from '@/components';

export const HomeScreen = () => {
  const { user } = useAuthStore();
  const { lessons } = useLearnStore();
  
  const progress = calculateProgress(lessons);
  
  return (
    <ScrollView>
      <Text>Salam, {user?.name}! 👋</Text>
      <Card>
        <ProgressRing progress={progress} />
        <Stats streak={user?.streak} />
      </Card>
      <QuickActions />
    </ScrollView>
  );
};`,
  learn: `// LearnStore.ts - Zustand
export const useLearnStore = create((set) => ({
  topics: [],
  lessons: {},
  
  markLessonComplete: (id) => set((state) => ({
    lessons: {
      ...state.lessons,
      [id]: { 
        ...state.lessons[id], 
        completed: true 
      },
    },
  })),
  
  setLessonProgress: (id, progress) => 
    set((state) => ({
      lessons: {
        ...state.lessons,
        [id]: { ...state.lessons[id], progress },
      },
    })),
}));`,
  simulator: `// SimulatorStore.ts
export const useSimulatorStore = create((set) => ({
  startExam: (questions, mode) => {
    set({ 
      currentAttempt: {
        id: Date.now().toString(),
        mode,
        questions,
        answers: Array(questions.length).fill(null),
        startedAt: new Date().toISOString(),
      },
      timeRemaining: mode === 'exam' ? 15*60 : 0
    });
  },
  
  submitExam: () => set((state) => {
    const correct = state.currentAttempt.questions
      .filter((q, i) => 
        state.currentAttempt.answers[i] === q.correctIndex
      ).length;
    
    return { 
      currentAttempt: {
        ...state.currentAttempt,
        score: (correct / questions.length) * 100
      }
    };
  }),
}));`,
  packages: `// PackagesStore.ts
export const usePackagesStore = create((set) => ({
  packages: [],
  
  purchasePackage: async (id) => {
    set({ purchaseInProgress: true });
    
    // Stripe integration
    const { clientSecret } = await api.post(
      '/payments/create-intent', 
      { packageId: id }
    );
    
    const { error } = await presentPaymentSheet({
      clientSecret
    });
    
    if (!error) {
      set({ currentPackage: id });
      analytics.track('purchase_completed');
    }
    
    set({ purchaseInProgress: false });
  },
}));`,
  profile: `// SettingsStore.ts
export const useSettingsStore = create((set) => ({
  language: 'az',
  theme: 'system',
  
  setLanguage: async (lang) => {
    set({ language: lang });
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('lang', lang);
  },
  
  setTheme: async (theme) => {
    set({ theme });
    await AsyncStorage.setItem('theme', theme);
  },
  
  loadSettings: async () => {
    const stored = await AsyncStorage.getItem(
      'appSettings'
    );
    if (stored) set(JSON.parse(stored));
  },
}));`
};

export default function CodeViewer({ currentScreen }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💻 Kod Nümunəsi</h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
        <code>{codeExamples[currentScreen]}</code>
      </pre>
    </div>
  );
}
