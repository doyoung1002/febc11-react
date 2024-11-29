import { useEffect } from 'react';
import useCounterState from '@zustand/counter';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // count를 사용하지 않더라도 자동으로 구독이 되기 때문에 count 변경 시 리렌더링이 됨
  // const { countUp } = useCounterState();

  // 필요한 state만 반환 받을 수 있다.
  // 렌더링 최적화를 위해 수동으로 필요한 부분만 지정
  const countUp = useCounterState((state) => state.countUp);

  // function hello(fn)

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
