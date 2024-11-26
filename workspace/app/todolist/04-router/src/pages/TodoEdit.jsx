import { Link, useOutletContext } from 'react-router-dom';

function TodoEdit() {
  // Outlet 컴포넌트의 context 속성에 전달되는 값 추출
  const { item } = useOutletContext();

  // 수정 작업
  const onSubmit = () => {};

  return (
    <>
      <h2>할일 수정</h2>
      <div className='todo'>
        <form onSubmit={onSubmit}>
          <label htmlFor='title'>제목 :</label>
          <input
            type='text'
            id='title'
            defaultValue={item.title}
            autoFocus
          />
          <br />
          <label htmlFor='content'>내용 :</label>
          <textarea
            id='content'
            cols='23'
            rows='5'
            defaultValue={item.content}
          />
          <br />
          <label htmlFor='done'>완료 :</label>
          <input
            type='checkbox'
            id='done'
            defaultChecked={item.done}
          />
          <br />
          <button type='submit'>수정</button>
          <Link to='/list/1'>취소</Link>
        </form>
      </div>
    </>
  );
}

export default TodoEdit;
