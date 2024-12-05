import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get('https://11.fesp.shop/posts/1?type=brunch', {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchPost().then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return <>게시물 로딩중...</>;
  }

  return (
    <>
      <h4>{data.item.title}</h4>
    </>
  );
}

export default FetchOnRender;
