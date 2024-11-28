import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { counterState } from '@recoil/atoms';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // getter, setter 모두 사용(구독)
  // useRecoilState를 하게된다면 Right도 렌더링이 된다.
  // const [count, setCount] = useRecoilState(counterState);
  // const countUp = (step) => {
  //   setCount(count + step);
  // };

  // setter 사용(읽기 x, 변경)
  // 이는 상태값은 left만 변경이 되기 때문에 left만 렌더링이 된다.
  const setCount = useSetRecoilState(counterState);
  const countUp = (step) => {
    setCount((count) => count + step);
  };

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
