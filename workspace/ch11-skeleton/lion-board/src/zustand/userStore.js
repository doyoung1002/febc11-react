import { create } from 'Zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      resetUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage), // 기본은 local storage
    }
  )
);
// 첫 번째 인자로 함수, 두 번째는 객체

export default useUserStore;
