/**
 * Learn Store - Learning progress & lesson state / Öyrənmə tərəqqisi və dərs vəziyyəti
 */

import { create } from 'zustand';

export interface Topic {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  lessonCount: number;
  completedLessons: number;
  iconName: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  titleEn: string;
  titleRu: string;
  duration: number; // seconds
  videoUrl: string;
  thumbnailUrl: string;
  keyPoints: string[];
  completed: boolean;
  downloaded: boolean;
  progress: number; // 0-100
}

interface LearnState {
  topics: Topic[];
  lessons: Record<string, Lesson>;
  currentLessonId: string | null;
  
  // Actions
  setTopics: (topics: Topic[]) => void;
  setLessons: (lessons: Lesson[]) => void;
  markLessonComplete: (lessonId: string) => void;
  setLessonProgress: (lessonId: string, progress: number) => void;
  toggleDownload: (lessonId: string) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  getTopicProgress: (topicId: string) => number;
}

export const useLearnStore = create<LearnState>((set, get) => ({
  topics: [],
  lessons: {},
  currentLessonId: null,
  
  setTopics: (topics) => set({ topics }),
  
  setLessons: (lessons) => {
    const lessonsMap = lessons.reduce((acc, lesson) => {
      acc[lesson.id] = lesson;
      return acc;
    }, {} as Record<string, Lesson>);
    set({ lessons: lessonsMap });
  },
  
  markLessonComplete: (lessonId) => set((state) => ({
    lessons: {
      ...state.lessons,
      [lessonId]: {
        ...state.lessons[lessonId],
        completed: true,
        progress: 100,
      },
    },
  })),
  
  setLessonProgress: (lessonId, progress) => set((state) => ({
    lessons: {
      ...state.lessons,
      [lessonId]: {
        ...state.lessons[lessonId],
        progress: Math.min(100, Math.max(0, progress)),
      },
    },
  })),
  
  toggleDownload: (lessonId) => set((state) => ({
    lessons: {
      ...state.lessons,
      [lessonId]: {
        ...state.lessons[lessonId],
        downloaded: !state.lessons[lessonId].downloaded,
      },
    },
  })),
  
  setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
  
  getTopicProgress: (topicId) => {
    const state = get();
    const topicLessons = Object.values(state.lessons).filter(
      (l) => l.topicId === topicId
    );
    
    if (topicLessons.length === 0) return 0;
    
    const totalProgress = topicLessons.reduce((sum, l) => sum + l.progress, 0);
    return Math.round(totalProgress / topicLessons.length);
  },
}));
