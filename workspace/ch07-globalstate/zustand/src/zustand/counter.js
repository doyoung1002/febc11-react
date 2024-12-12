import { create } from 'zustand';

const useCounterState = create((set, get) => ({
  count: 6, // 상태 관리할 속성

  countUp: (step) => {
    const newState = { count: get().count + step };
    set(newState); // 예전 속성 값을 새로운 속성 값으로 변경
  },
}));

export default useCounterState;
