import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const UserStore = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
});

// const useUserStore = create(UserStore); // 스토리지를 사용하지 않을 경우

// 스토리지를 사용할 경우
// 첫 번째 인자로 함수, 두 번째는 객체
const useUserStore = create(
  persist(UserStore, {
    name: 'user',
    storage: createJSONStorage(() => sessionStorage), // 기본은 localStorage
  })
);

export default useUserStore;
