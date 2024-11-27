import useAxios from '@hooks/useAxios';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function TodoDetail() {
  // URL의 파라미터 추출 - useParams
  // 라우터에 'list/:_id'로 등록된 컴포넌트가 호출되는 경우
  // URL이 list/3일 때 useParams()는 { _id: 3 }을 반환
  const { _id } = useParams();
  console.log(_id);

  const [data, setData] = useState();
  // 더미 데이터로 만든 것
  // useEffect(() => {
  //   // TODO: API 서버 통신

  //   setData(dummyData);
  // }, []);

  // const { data } = useAxios({ url: `/todolist/${_id}` });

  // 실제 서버에서 호출
  const axios = useAxiosInstance();
  // API 서버에서 상세 정보를 조회
  const fetchDetail = async () => {
    const res = await axios.get(`/todolist/${_id}`);
    setData(res.data);
  };

  // 화면 맨 처음에만 구성하기 위해 한번만 호출
  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div id='main'>
      <h2>할일 상세 보기</h2>
      {data && (
        <>
          <div className='todo'>
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.item.done ? '완료' : '미완료'}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>
            <Link to='./edit'>수정</Link> {/* 상대경로 */}
            {/* <Link to={'/list/${_id}/edit'}>수정</Link>  절대경로*/}
            <Link to='/list'>목록</Link>
          </div>
          <Outlet context={{ item: data.item, refetch: fetchDetail }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
