import useAxiosInstance from '@hooks/useAxiosInstance';
import useFetch from '@hooks/useFetch';
import TodoListItem from '@pages/TodoListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// API 서버 완성되기전에 사용할 더미데이터를 이렇게 만들어서 프로젝트 진행
// const dummyData = {
//   items: [
//     {
//       _id: 1,
//       title: '잠자기',
//     },
//     {
//       _id: 2,
//       title: '자바스크립트 복습',
//       done: true,
//     },
//   ],
// };

function TodoList() {
  // axios 인스턴스
  const axios = useAxiosInstance();

  // const [data, setData] = useState();
  // useEffect(() => {
  //   setData(dummyData);
  // }, []); // 마운트된 후에 한번만 호출

  // API 서버에서 목록 조회
  const [data, setData] = useState();
  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  // const { data } = useFetch({ url: '/todolist' });

  // 컴포넌트 마운트 직후와 삭제 후에 목록 조회를 해야 하므로 함수로 만듦
  const fetchList = async () => {
    const res = await axios.get('/todolist');
    setData(res.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 삭제 작업
  const handleDelete = async (_id) => {
    try {
      // TODO: API 서버에 삭제 요청
      await axios.delete(`/todolist/${_id}`);
      alert('할 일이 삭제 되었습니다.');

      // TODO: 목록을 다시 조회
      // const response = await axios.get('/todolist');
      // setData(response.data);
      fetchList();
    } catch (err) {
      console.error(err);
      alert('할 일 삭제에 실패했습니다.');
    }
  };

  const itemList = data?.items.map((item) => (
    <TodoListItem
      key={item._id}
      item={item}
      handleDelete={handleDelete}
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
