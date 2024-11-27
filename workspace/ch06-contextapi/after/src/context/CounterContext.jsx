import { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

// 1. Context 객체 생성
const CounterContext = createContext();

CounterProvider.propTypes = {
  children: PropTypes.node,
};

// 3. Provider 컴포넌트를 작성해서 export
export function CounterProvider({ children }) {
  // 4, 데이터, 상태, 상태를 관리하는 함수 정의
  const [count, setCount] = useState(0);

  const countDown = function (step) {
    setCount(count - step);
  };
  const reset = function (step) {
    setCount(count + step);
  };
  const countUp = function (step) {
    setCount(count + step);
  };

  const values = {
    // state에 전달해주면 된다. 상태를
    state: { count },
    // actions에는 state를 제어하는 함수를 넘겨주면 된다.
    actions: { countDown, reset, countUp },
  };
  // 5. Context 객체의 Provider로 자식 컴포넌트를 감싸서 반환
  // value 속성에 전달할 Context 값 지정
  return <CounterContext.Provider value={values}>{children}</CounterContext.Provider>;
}

// 사용 방법
{
  /* <CounterProvider>
  <App />
</CounterProvider> */
}

{
  /* <CounterContext.Provider value={values}>
  <App />
  </CounterContext.Provider> */
}

// 2. Context 객체 export
export default CounterContext;
