// src/store/useProgressStore.ts
import { create } from 'zustand';

interface ProgressData {
  status: string;
  message: string;
  percent: number;
}

interface ProgressState {
  // postId를 키(key)로 해서 여러 작업의 상태를 동시에 관리해요! 👿
  progressMap: Record<string, ProgressData>;
  setProgress: (postId: string, data: ProgressData) => void;
  removeProgress: (postId: string) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progressMap: {},
  setProgress: (postId, data) => 
    set((state) => ({
      progressMap: { ...state.progressMap, [postId]: data }
    })),
  removeProgress: (postId) =>
    set((state) => {
      const newMap = { ...state.progressMap };
      delete newMap[postId];
      return { progressMap: newMap };
    }),
}));