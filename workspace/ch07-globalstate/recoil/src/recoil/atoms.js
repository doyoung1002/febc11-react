import { atom } from 'recoil';

export const counterState = atom({
  key: 'count', // atom 식별자로 모든 atom에서 고유해야 함
  default: 8,
});

export const loginState = atom({
  key: 'loginUser', // 이런식으로 고유하게 해야함
  default: null,
});
