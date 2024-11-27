import useAxiosInstance from '@hooks/useAxiosInstance';
import useFetch from '@hooks/useFetch';
import TodoListItem from '@pages/TodoListItem';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import '../Pagination.css';

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
  const [data, setData] = useState();

  // axios 인스턴스
  const axios = useAxiosInstance();

  const searchRef = useRef();

  // 쿼리 스트링 정보를 읽거나 설정
  // /list?keyword=환승&page=3 => new URLSearchParams('keyword=환승&page=3')
  // get, set
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get('keyword'),
    page: searchParams.get('page') || 1,
    limit: 20,
  };

  // const [data, setData] = useState();
  // useEffect(() => {
  //   setData(dummyData);
  // }, []); // 마운트된 후에 한번만 호출

  // API 서버에서 목록 조회
  // useEffect(() => {
  //   setData(dummyData);
  // }, []);

  // const { data } = useFetch({ url: '/todolist' });

  // 컴포넌트 마운트 직후와 삭제 후에 목록 조회를 해야 하므로 함수로 만듦
  // 🚨 이부분 params 넘기는 이해 안됨 -> 함수의 독립성
  // const fetchList = async (params = {}) => {
  const fetchList = async () => {
    const res = await axios.get('/todolist', { params });
    setData(res.data);
  };

  useEffect(() => {
    fetchList();
  }, [searchParams]); // 최초 마운트 후에 호출

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

  // 검색
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
  };

  const current = data?.pagination.page;

  // 페이지네이션
  let pageList = [];
  for (let page = 1; page <= data?.pagination.totalPages; page++) {
    searchParams.set('page', page);
    // 예시
    // keyword=황승&page=1
    // keyword=황승&page=2
    // keyword=황승&page=3
    let search = searchParams.toString();

    pageList.push(
      <li className={current === page ? 'active' : ''}>
        <Link to={`/list?${search}`}>{page}</Link>
      </li>
    );
  }

  return (
    <div id='main'>
      <h2>할일 목록</h2>
      <div className='todo'>
        <Link to='/list/add'>추가</Link>
        {/* <a href='./add'>추가</a> 상대 경로 - 만약 경로가 복잡하게 된다면 상대경로가 나음 */}
        <br />
        <form
          className='search'
          onSubmit={handleSearch}
        >
          <input
            type='text'
            autoFocus
            defaultValue={params.keyword}
            ref={searchRef}
          />
          <button type='submit'>검색</button>
        </form>
        <ul className='todolist'>{itemList}</ul>
      </div>

      <div className='pagination'>
        <ul>{pageList}</ul>
      </div>

      <Outlet />
    </div>
  );
}

export default TodoList;
