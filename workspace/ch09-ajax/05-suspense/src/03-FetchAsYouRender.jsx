import axios from 'axios';
import { useSuspenseQuery } from '@tanstack/react-query';

// 게시글 조회 API 호출
function fetchPost() {
  return axios.get('https://11.fesp.shop/posts/1?type=brunch&delay=3000', {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 상세 조회 페이지
function FetchAsYouRender() {
  // const { data } = useeQuery({
  // suspense: true
  // suspense: true를 안줘도 된다 아래와 같은 코드를 입력하게 되면
  const { data } = useSuspenseQuery({
    queryKey: ['post', 1],
    queryFn: () => fetchPost(),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  return (
    <>
      <h4>{data.item.title}</h4>
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchReplies() {
  return axios.get('https://11.fesp.shop/posts/1/replies?delay=2000', {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 댓글 목록 페이지
export function Replies() {
  const { data } = useSuspenseQuery({
    queryKey: ['post', 1, 'replies'],
    queryFn: () => fetchReplies(),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchAsYouRender;
