/**
 * Simulator Store - Exam & practice state / İmtahan və məşq vəziyyəti
 */

import { create } from 'zustand';

export interface Question {
  id: string;
  text: string;
  textEn: string;
  textRu: string;
  options: string[];
  optionsEn: string[];
  optionsRu: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
  explanationRu: string;
  imageUrl?: string;
  category: string;
}

export interface ExamAttempt {
  id: string;
  mode: 'practice' | 'exam';
  questions: Question[];
  answers: (number | null)[];
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  startedAt: string;
  completedAt?: string;
  timeSpent: number; // seconds
}

interface SimulatorState {
  currentAttempt: ExamAttempt | null;
  history: ExamAttempt[];
  currentQuestionIndex: number;
  timeRemaining: number; // seconds for exam mode
  isPaused: boolean;
  
  // Actions
  startExam: (questions: Question[], mode: 'practice' | 'exam') => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitExam: () => void;
  setTimeRemaining: (time: number) => void;
  pauseExam: () => void;
  resumeExam: () => void;
  addToHistory: (attempt: ExamAttempt) => void;
  clearCurrentAttempt: () => void;
  getBestScore: () => number;
  getAverageScore: () => number;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  currentAttempt: null,
  history: [],
  currentQuestionIndex: 0,
  timeRemaining: 15 * 60, // 15 minutes
  isPaused: false,
  
  startExam: (questions, mode) => {
    const attempt: ExamAttempt = {
      id: Date.now().toString(),
      mode,
      questions,
      answers: new Array(questions.length).fill(null),
      score: 0,
      totalQuestions: questions.length,
      correctAnswers: 0,
      startedAt: new Date().toISOString(),
      timeSpent: 0,
    };
    
    set({
      currentAttempt: attempt,
      currentQuestionIndex: 0,
      timeRemaining: mode === 'exam' ? 15 * 60 : 0,
      isPaused: false,
    });
  },
  
  answerQuestion: (answerIndex) => set((state) => {
    if (!state.currentAttempt) return state;
    
    const newAnswers = [...state.currentAttempt.answers];
    newAnswers[state.currentQuestionIndex] = answerIndex;
    
    return {
      currentAttempt: {
        ...state.currentAttempt,
        answers: newAnswers,
      },
    };
  }),
  
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: Math.min(
      state.currentQuestionIndex + 1,
      (state.currentAttempt?.questions.length || 1) - 1
    ),
  })),
  
  previousQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
  })),
  
  submitExam: () => set((state) => {
    if (!state.currentAttempt) return state;
    
    let correctAnswers = 0;
    state.currentAttempt.questions.forEach((q, idx) => {
      if (state.currentAttempt!.answers[idx] === q.correctIndex) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / state.currentAttempt.questions.length) * 100);
    const timeSpent = state.currentAttempt.mode === 'exam' 
      ? (15 * 60) - state.timeRemaining
      : 0;
    
    const completedAttempt: ExamAttempt = {
      ...state.currentAttempt,
      score,
      correctAnswers,
      completedAt: new Date().toISOString(),
      timeSpent,
    };
    
    return {
      currentAttempt: completedAttempt,
      history: [completedAttempt, ...state.history],
    };
  }),
  
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  
  pauseExam: () => set({ isPaused: true }),
  
  resumeExam: () => set({ isPaused: false }),
  
  addToHistory: (attempt) => set((state) => ({
    history: [attempt, ...state.history].slice(0, 50), // Keep last 50
  })),
  
  clearCurrentAttempt: () => set({
    currentAttempt: null,
    currentQuestionIndex: 0,
    timeRemaining: 15 * 60,
    isPaused: false,
  }),
  
  getBestScore: () => {
    const { history } = get();
    if (history.length === 0) return 0;
    return Math.max(...history.map((a) => a.score));
  },
  
  getAverageScore: () => {
    const { history } = get();
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, a) => acc + a.score, 0);
    return Math.round(sum / history.length);
  },
}));
