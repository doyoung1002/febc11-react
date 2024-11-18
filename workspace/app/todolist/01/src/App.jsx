import { useState } from 'react';
import Header from '@components/Header';
import Todo from '@pages/Todo';
import Footer from '@components/Footer';

function App() {
  // 샘플 목록
  const [itemList, setItemList] = useState([
    { _id: 1, title: '두부', done: true },
    { _id: 2, title: '계란', done: false },
    { _id: 3, title: '라면', done: true },
  ]);

  const addItem = (item) => {
    // ✨ 속성을 바꿔봐야 리액트는 인식을 못하기 때문에, 새로운 객체로 만들고 배열로 만들어줘야 갱신이 된다.
    const newItemList = [...itemList, item]; // 객체일 경우 새로운 객체로 만들어야 화면 갱신이 됨
    setItemList(newItemList); // setter를 이용해야 회면 갱신이 됨
  };

  return (
    <div id='todo'>
      <Header />
      <Todo
        itemList={itemList}
        addItem={addItem}
      />
      <Footer />
    </div>
  );
}

export default App;