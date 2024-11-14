import { useState } from 'react';

let count = 0;

export default function Message() {
  const [msg, setMsg] = useState('');

  const handleChange = (event) => {
    const inputMsg = event.target.value;
    setMsg(inputMsg);
    count++;
  };

  return (
    <div>
      <input type='text' onChange={handleChange} />
      <br />
      <span>입력 메세지: {msg}</span>
      <br />
      <span>입력 횟수: {count}</span>
    </div>
  );
}
