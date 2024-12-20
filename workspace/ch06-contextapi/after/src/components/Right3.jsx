import CounterContext from '@context/CounterContext';
import { SimpleContext } from '@context/SimpleContext';
import { useContext, useEffect } from 'react';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  const simple = useContext(SimpleContext);

  // CounterContext 구독함(CounterContext의 상태변경이 라렌더링을 유발함)
  // CounterContext가 상태가 변하게 되면, 다른 Right1, 2는 구독하지 않았기에 렌더링이 되지 않는다
  // 하지만 현재 Right3에서는 구독하기 때문에 자신도 같이 렌더링이 된다. 상태가 변하지 않아도 렌더링이 된다.
  const {
    actions: { countDown, reset, countUp },
  } = useContext(CounterContext);

  return (
    <div>
      <h3>Right3 - {simple.hello}</h3>
      <button onClick={() => countDown(1)}>-1</button>
      <button onClick={() => reset()}>0</button>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
