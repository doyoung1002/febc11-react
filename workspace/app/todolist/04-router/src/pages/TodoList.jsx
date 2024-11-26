import TodoListItem from '@pages/TodoListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// API 서버 완성되기전에 사용할 더미데이터를 이렇게 만들어서 프로젝트 진행
const dummyData = {
  items: [
    {
      _id: 1,
      title: '잠자기',
    },
    {
      _id: 2,
      title: '자바스크립트 복습',
      done: true,
    },
  ],
};

function TodoList() {
  const [data, setData] = useState();

  useEffect(() => {
    setData(dummyData);
  }, []); // 마운트된 후에 한번만 호출

  const itemList = data?.items.map((item) => (
    <TodoListItem
      key={item._id}
      item={item}
    />
  ));

  return (
    <div id='main'>
      <h2>할일 목록</h2>
      <div className='todo'>
        <Link to='/list/add'>추가</Link>
        {/* <a href='./add'>추가</a> 상대 경로 - 만약 경로가 복잡하게 된다면 상대경로가 나음 */}
        <br />
        <form className='search'>
          <input
            type='text'
            autoFocus
          />
          <button type='submit'>검색</button>
        </form>
        <ul className='todolist'>{itemList}</ul>
      </div>
    </div>
  );
}

export default TodoList;
