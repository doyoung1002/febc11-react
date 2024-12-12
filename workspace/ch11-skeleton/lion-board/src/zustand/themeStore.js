import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

const ThemeStore = (set) => ({
  // isDarkMode: false,
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark').matches ? true : false,
  // 위는 사용자 환경설정에 따라 다크모드 설정해줌, Dark모드가 true면 다크모드, 아니면 다시 라이트모드로 변경
  // 홈페이지를 끄고 다시 와도 기본 시스템설정의 모드에 따라 변경이 됨
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
});

const useThemeStore = create(
  persist(ThemeStore, {
    name: 'themeStore',
  })
);

export default useThemeStore;
