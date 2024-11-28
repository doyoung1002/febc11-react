import { useEffect } from 'react';
import useCounterState from '@zustand/counter';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  const { count } = useCounterState();

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
