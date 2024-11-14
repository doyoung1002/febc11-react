import { useState } from 'react';

function App() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  return (
    <>
      <h1>03 상태관리 대상이 객체일 경우 주의 사항</h1>
      <div
        onPointerMove={(event) => {
          // 속성을 직접 수정하면 리렌더링되지 않음
          // position.x = event.clientX;
          // position.y = event.clientY;

          // 객체는 속성만 변경이 되는 경우는 상태 변경되지 않는다.
          // 객체, 배열의 경우는 주소가 변경이 되어야 상태 변경이 되므로 새롭게 만들어줘야 한다.
          const newPosition = { x: event.clientX, y: event.clientY - 80 };

          setPosition(newPosition);
          console.log(position);
        }}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
            left: -10,
            top: -10,
            width: 20,
            height: 20,
          }}
        />
      </div>
    </>
  );
}

export default App;
