import counterSlice from '@redux-toolkit/counterSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  // reducers의 객체를 reducer라는 이름으로 전달해줌
  reducer: {
    counterStore: counterSlice.reducer,
  },
});

export default store;
