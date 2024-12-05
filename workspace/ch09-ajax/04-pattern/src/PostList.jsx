import FetchOnRender from './01-FetchOnRender';
import axios from 'axios';
import { useEffect, useState } from 'react';

// 게시글 목록 조회 API 호출
function fetchPostList() {
  return axios.get('https://11.fesp.shop/posts/?type=brunch&delay=4000', {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 목록 조회 페이지
function PostList() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPostList().then((res) => {
      setData(res.data);
    });
  }, []);

  // 마운트 시점에는 데이터가 없어서 data를 못불러온다.
  // 근데 없다는 문구와 함께 렌더링을 한다.
  // 그리고 렌더 이후 데이터를 출력하여 다시 렌더한다.
  if (!data) {
    return <div>게시물 목록 로딩중...</div>;
  }

  return (
    <>
      <h2>게시물 {data.item.length} 건이 있습니다.</h2>
      <h3>Fetch-on-render 방식</h3>
      <FetchOnRender />
    </>
  );
}

export default PostList;
