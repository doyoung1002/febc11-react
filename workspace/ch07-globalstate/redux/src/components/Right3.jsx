import counterActionCreator from '@redux/counterActionCreator';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // 상태값 수정
  //
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Right3</h3>
      {/* <button onClick={() => dispatch({ type: 'countUp', payload: { step: 2 } })}>+1</button> */}
      {/* ActionCreator를 통해 아래 코드가 위와 같이 반환이 되도록 하는 것이다. */}
      <button onClick={() => dispatch(counterActionCreator.countDown(1))}>-1</button>
      <button onClick={() => dispatch(counterActionCreator.countReset())}>0</button>
      <button onClick={() => dispatch(counterActionCreator.countUp(2))}>+2</button>
    </div>
  );
}

export default Right3;
