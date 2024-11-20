import { useEffect, useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = '0' }) {
  console.log('Counter 렌더링');
  const initCount = Number(children);
  const [count, setCount] = useState(initCount);
  const [step, setStep] = useState(1);

  const handleDown = () => {
    setCount(count - step);
  };
  const handleUp = () => {
    setCount(count + step);
  };
  const handleReset = (event) => {
    setCount(initCount);
  };

  // useEffect 사용 안했을 때
  // 1초 후에 자동으로 값 한번 변경
  // 무한 렌더링 발생
  // setTimeout(() => {
  //   handleUp();
  // }, 1000);

  // 마운트 된 후 최초 한번 증가 - useEffect
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     'dependencies에 빈 배열을 지정하면 컴포넌트가 마운트 된 후 한번만 호출됨(업데이트 후에는 호출되지 않음'
  //   );
  // }, []);

  // 마운트 된 후와 업데이트 된 후 에값 증가 - useEffect
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('dependencies에 빈 배열을 지정하지 않으면 컴포넌트가 마운트 된 후, 업데이트 된 후에도 호출이 됨');
  // });

  // 마운트 된 후 값 증가 - useEffect
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log(
  //     'dependencies에 값을 지정하면 컴포넌트가 업데이트 될 때 지정한 값 중에 하나라도 수정되었을 경우 호출됨 '
  //   );
  // }, [step]);

  // useEffect(() => {
  //   console.log('setup 함수 호출');
  //   const timer = setInterval(() => {
  //     console.log(new Date());
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // setInterval, cleanup(clearInterval)
  // useEffect(() => {
  //   console.log(step, 'setup 함수 호출');
  //   const timer = setInterval(() => {
  //     console.log(step, new Date());
  //   }, 1000);
  //   return () => {
  //     console.log(step, 'cleanup 함수 호출');
  //     clearInterval(timer);
  //   };
  // }, [step]);

  return (
    <div id='counter'>
      <label htmlFor='step'>증감치</label>
      {/* 제어 컴포넌트 value, onClick 사용 */}
      <input
        id='step'
        type='number'
        style={{ width: '40px' }}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <Button
        color='red'
        onClick={handleDown}
      >
        -
      </Button>
      <Button onClick={handleReset}>{initCount}</Button>
      <Button
        color='blue'
        onClick={handleUp}
      >
        +
      </Button>
      <span>{count}</span>
    </div>
  );
}

export default Counter;
