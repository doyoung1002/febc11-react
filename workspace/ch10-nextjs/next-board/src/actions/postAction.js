// 서버 컴포넌트로 만들겠다.
// 서버 컴포넌트 : 서버에서만 실행되는 컴포넌트
// 클라이언트 컴포넌트 : 서버와 클라이언트 둘다 실행되는 컴포넌트
// 액션의 경우는 서버 컴포넌트로 선언해야한다. use server 지시어를 명시
'use server';

// 게시물 추가
export async function addPost(formData) {
  console.log('서버 액션', formData);
  const data = {
    type: formData.get('type'),
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const res = await fetch('https://11.fesp.shop/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '00-board',
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
