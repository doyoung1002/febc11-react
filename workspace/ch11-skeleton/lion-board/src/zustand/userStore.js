import { create } from 'Zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  resetUser: () => set({ user: null }),
}));

export default useUserStore;
