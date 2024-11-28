import { COUNTER_ACTION } from '@redux/counterActionCreator';
// Reducer
// 상태를 관리해주는 reducer를 만들어야 한다.

// 초기 상태
const initialState = { count: 5 };

// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
// 상태가 복합 객체일 경우 immer 같은 라이브러리를 사용해서 불변성 유지해야 함
// 객체라면 복사해서 해야한다.
// 로직을 컴포넌트 내부에서 직접 구현하지 않고, 외부에서 구현
// state: 이전 상태(useReducer가 내부적으로 관리, 이전의 리턴값이 다음에 state로 전달)
// action: 동작을 정의한 객체(자유롭게 작성). 예시 {type: 'countUp', payload: { step: 2 } }
// 리턴값: 새로운 상태
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER_ACTION.UP:
      // state.count += action.payload.step; // 불변성 x
      // return state;
      // 순수함수로 만들어야 하며, 불변성을 가지고 있어야 한다. state를 복사 후 복사본을 이용하여 값 변경
      return { ...state, count: state.count + action.payload.step };
    case COUNTER_ACTION.DOWN:
      return { ...state, count: state.count - action.payload.step };
    case COUNTER_ACTION.RESET:
      return { ...state, count: 0 };
    default:
      return state;
  }
}

export default counterReducer;
