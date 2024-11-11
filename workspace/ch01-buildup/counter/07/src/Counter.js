import Index from '../index.js';

function Counter() {
  // let count = 0;
  // 여기 변수는 마음대로 작성이 가능하다. 하지만 그 기능에 맞게 작성하는 것이 좋다.
  const [count, setCount] = Index.useState(10);
  // const로 바꿔야 하고, 값만 바꾸는 것이 아닌 메서드 통해 변경을 해야한다.
  const handleDown = () => {
    setCount(count - 1);
  };
  const handleUp = () => {
    setCount(count + 1);
  };
  const handleReset = event => {
    setCount(0);
  };

  return (
    Index.createElement('div', { id: 'counter' },
      Index.createElement('button', { type: 'button', onclick: handleDown }, '-'),
      Index.createElement('button', { type: 'button', onclick: (event) => handleReset(event) }, 0),
      Index.createElement('button', { type: 'button', onclick: handleUp }, '+'),
      Index.createElement('span', null, count))
  );
}

export default Counter;