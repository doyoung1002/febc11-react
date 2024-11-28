import { useEffect } from 'react';
import useCounterState from '@zustand/counter';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  const { countUp } = useCounterState();

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
