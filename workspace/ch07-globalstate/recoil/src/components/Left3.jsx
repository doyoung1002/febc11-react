import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { counterState } from '@recoil/atoms';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  const count = useRecoilValue(counterState); // atom 열기

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
