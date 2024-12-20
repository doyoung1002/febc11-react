const API_SERVER = 'https://todo-api.fesp.shop/api';
import React, { useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  //error가 발생하면 화면도 갱신 되어야함 -> error를 화면에 출력해야함
  const [isLoading, setIsLoading] = useState(false);

  // Todo API 서버에 ajax 요청을 보낸다.
  const fetchTodo = async (fetchParams) => {
    try {
      setIsLoading(true);
      const res = await fetch(API_SERVER + fetchParams.url);
      const jsonData = await res.json();
      console.log(res);
      console.log(jsonData);
      if (jsonData.ok) {
        setData(jsonData.items);
        setError(null);
      } else {
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      // 에러 처리
      console.error(err); // 서버로부터 데이터를 못받아올 때
      setError({ message: '일시적인 문제로 인해 작업 처리에 실패했습니다. 잠시 후 다시 요청해 주시길 바랍니다.' });
      setData(null);
    } finally {
      // 무조건 호출되어야하는 코드는 finally에 넣어준다 - 마무리 느낌
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchParams = { url: '/todolist?delay=3000' };
    fetchTodo(fetchParams);
  }, []);

  return (
    <>
      <h1>08 Custom Hook - 커스텀 훅 없이 fetch API 사용</h1>
      <h2>할일 목록</h2>
      {isLoading && (
        <PacmanLoader
          color='#5eeb34'
          size={18}
        />
      )}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
