import { createSlice } from '@reduxjs/toolkit';

// 리듀서와 액션 생성자를 간단하게 작성
// createSlice가 반환하는 값은 객체 -> {reducer, actions, ...}
// reducer: 리듀서 함수, Redux 스토어에 전달해야 함
// actions: 각 리듀서에 해당하는 액션 생성자 객체
const counterSlice = createSlice({
  name: 'myCounter', // 슬라이스 이름(액션 타입의 접두사로 사용됨)
  // const initialState = { count: 5 };
  // initialState 는 초기 값 설정
  initialState: { count: 10 }, // 초기 상태

  // function counterReducer(state = initialState, action) {
  //   switch (action.type) {
  //     case COUNTER_ACTION.UP:
  //       // state.count += action.payload.step; // 불변성 x
  //       // return state;
  //       // 순수함수로 만들어야 하며, 불변성을 가지고 있어야 한다. state를 복사 후 복사본을 이용하여 값 변경
  //       return { ...state, count: state.count + action.payload.step };
  //     case COUNTER_ACTION.DOWN:
  //       return { ...state, count: state.count - action.payload.step };
  //     case COUNTER_ACTION.RESET:
  //       return { ...state, count: 0 };
  //     default:
  //       return state;
  //   }
  // }
  // reducers 가 위 부분과 같음
  reducers: {
    countUp: (state, action) => {
      // immer 라이브러리를 내부적으로 사용하기 때문에 state를 직접 수정해도 됨
      // 불변성이 자동으로 유지가 되기 때문에 따로 ...를 안써도 된다.
      state.count += action.payload;
    },
    countDown: (state, action) => {
      state.count -= action.payload;
    },
    countReset: (state) => {
      state.count = 0;
    },
  },
});

// 이는 액션 생성자이다. 이를 호출하면 액션 객체를 반환한다.
// countUp은 action Creator이다.
// countUp(2) => { type: 'myCounter_countUp', payload: 2}
export const { countUp, countDown, countReset } = counterSlice.actions;

export default counterSlice;
