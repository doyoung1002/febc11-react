import { useState } from 'react';
import Button from './Button';

function Counter() {
  let [count, setCount] = useState(0);
  let [step, setStep] = useState(1);

  const handleDown = () => {
    setCount(count - 1);
  };
  const handleUp = () => {
    setCount(count + 1);
  };
  const handleReset = (event) => {
    setCount(0);
  };

  return (
    <div id='counter'>
      <label htmlFor='step'>증감치</label>
      <input
        id='step'
        type='number'
        style={{ width: '40px' }}
        value={step}
        onChange={(e) => setStep(e.target.value)}
      />
      <Button
        color='red'
        onClick={handleDown}
      >
        -
      </Button>
      <Button onClick={handleReset}>0</Button>
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
