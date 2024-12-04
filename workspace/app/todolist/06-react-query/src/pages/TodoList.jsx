import useAxiosInstance from '@hooks/useAxiosInstance';
import useFetch from '@hooks/useFetch';
import TodoListItem from '@pages/TodoListItem';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import '../Pagination.css';
import Pagination from '@components/pagination';
import { useQuery } from '@tanstack/react-query';

function TodoList() {
  const searchRef = useRef();

  // const [data, setData] = useState();

  // 쿼리 스트링 정보를 읽거나 설정
  // /list?keyword=환승&page=3 => new URLSearchParams('keyword=환승&page=3')
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get('keyword'),
    page: searchParams.get('page') || 1,
    limit: 5,
  };
  // axios 인스턴스
  const axios = useAxiosInstance();

  // const [data, setData] = useState();
  // 컴포넌트 마운트 직후와 삭제 후에 목록 조회를 해야 하므로 함수로 만듦
  // 🚨 이부분 params 넘기는 이해 안됨 -> 함수의 독립성
  // const fetchList = async (params = {}) => {
  // const fetchList = async () => {
  //   const res = await axios.get('/todolist', { params });
  //   setData(res.data);
  // };

  // useEffect(() => {
  //   fetchList();
  // }, [searchParams]); // 최초 마운트 후에 호출

  const { data, refetch } = useQuery({
    queryKey: ['todolist', params],
    queryFn: () => axios.get('/todolist', { params }),
    select: (res) => res.data,
    // 1분동안 캐싱을 해서 서버에 요청을 안하겠다.
    staleTime: 1000 * 60, // fresh => stale 전환되는데 걸리는 시간
    gcTime: 1000 * 60 * 5, // 기존 캐시된 것을 제거
  });

  // 삭제 작업
  const handleDelete = async (_id) => {
    try {
      // TODO: API 서버에 삭제 요청
      await axios.delete(`/todolist/${_id}`);
      alert('할 일이 삭제 되었습니다.');

      // TODO: 목록을 다시 조회
      refetch();
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
          // 제어 컴포넌트 - state 로 관리, 상태 변경될 때마다 리렌더링
          // 비제어 컴포넌트 - ref 로 관리, 원할 때만 리렌더링
        >
          <input
            type='text'
            autoFocus
            defaultValue={params.keyword}
            // 초기값은 params.keyword 로 지정, 최초에는 아무 값도 있지 않은 상태
            ref={searchRef}
          />
          <button type='submit'>검색</button>
        </form>
        <ul className='todolist'>{itemList}</ul>
      </div>
      {/* pagination 컴포넌트에 데이터가 있다면 pagination 의 totalPages 와 page 를 props 로 전달 */}
      {data && (
        <Pagination
          totalPages={data?.pagination.totalPages}
          current={data?.pagination.page}
        />
      )}
    </div>
  );
}

export default TodoList;
