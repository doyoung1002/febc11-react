import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  // redux
  // useSelector() 훅으로 스토어 접근(자동으로 구독이 됨): 변경된 데이터가 있다면
  // 다시 렌더링이 되어 변경 데이터를 받아온다.
  // store에 변경 사항이 있다면, 렌더링이 된다.
  // const count = useSelector((state) => state.count); // 이는 일부분만 꺼낸거, 상태에서 count만 꺼냄
  // 위 코드는 count만 변경이 되었을 때 렌더링이 된다. 이는 내가 필요한 속성만 꺼내는 것
  // 만약 count, date, name이라는 속성이 있다면 count, date는 렌더링이 되고 name은 안하고싶다. 라고 하면
  // const count = useSelector((state) => state.count);
  // const count = useSelector((state) => state.date);
  // 이렇게 각각 꺼내면 된다. 불필요한 렌더링이 발생하지 않도록 성능 최적화에 좋다.
  // 🚨 리덕스를 사용할 때 최적화를 할 때 처음부터 생각해야한다. 선 조치부터 시작하고,
  // 🚨 메모이제이션은 후 조치한다.

  // const state = useSelector((state) => state); // 이는 state를 모두 꺼내는 것
  //   return (
  //     <div>
  //       <h3>Left3</h3>
  //       <span>{count}</span>
  //       {/* 만약 state를 전부 꺼낸다고 하면 state.count로 값을 꺼내야 한다. */}
  //       {/* <span>{state.count}</span>  */}
  //     </div>
  //   );
  // }

  // redux-toolkit
  const count = useSelector((state) => state.counterStore.count);
  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
