import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function TodoAdd() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
    // mode: '', // 최초 검증 시점, default onSubmit
    // revalidateMode // 재검증 시점
    // criteriaMode // errors 객체에 첫 오류 하나만 포함하거나(firstError) 전부 포함(all), default firstError
  } = useForm();

  const onSubmit = (item) => {
    console.log('서버에 전송', item);

    const timer = setTimeout(() => {
      xhr.abort(); // 요청 취소
    }, 2000);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://todo-api.fesp.shop/api/todolist?delay=1000000');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json'; // xhr.response에 지정되는 응답 데이터가 JSON.parse() 결과로 저장됨

    // 서버로부터 응답이 도착하면 호출되는 함수
    xhr.onload = () => {
      clearTimeout(timer); // 완료가 되면 타이머 중지

      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
        alert('할 일이 추가되었습니다.');
        setFocus('title');
        reset();
      } else {
        // 4xx, 5xx
        console.error('서버에서 에러 응답', xhr.status, xhr.response);
        alert(xhr.response.error?.message || '할 일 추가에 실패했습니다.');
      }
    };

    xhr.onabort = () => {
      alert('타임 아웃');
    };
    // 네트워크 오류는 따로 아래와 같이 onerror로 처리해야함
    xhr.onerror = () => {
      console.log('네트워크 오류');
      alert('할 일 추가에 실패했습니다.');
    };

    xhr.send(JSON.stringify(item));
  };

  return (
    <div id='main'>
      <h2>할일 추가</h2>
      <div className='todo'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='title'>제목 :</label>
          <input
            type='text'
            id='title'
            autoFocus
            {...register('title', {
              required: '제목을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.title?.message}</div>
          <br />
          <label htmlFor='content'>내용 :</label>
          <textarea
            id='content'
            cols='23'
            rows='5'
            {...register('content', {
              required: '내용을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.content?.message}</div>
          <br />
          <button type='submit'>추가</button>
          <Link to='/list'>취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;
