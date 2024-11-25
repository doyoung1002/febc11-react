import { Link } from 'react-router-dom';

function TodoList() {
  return (
    <div className='todoapp'>
      <div id='main'>
        <h2>할일 목록</h2>
        <div className='todo'>
          <Link to='/add'>추가</Link> {/* 절대 경로 */}
          {/* <a href='./add'>추가</a> 상대 경로 - 만약 경로가 복잡하게 된다면 상대경로가 나음 */}
          <br />
          <form className='search'>
            <input
              type='text'
              autoFocus
            />
            <button type='submit'>검색</button>
          </form>
          <ul className='todolist'>
            <li>
              <span>1</span>
              <Link to='/list/1'>잠자기</Link>
              <Link to='/list'>삭제</Link>
            </li>
            <li>
              <span>2</span>
              <Link to='/list/2'>자바스크립트 복습</Link>
              <Link to='/list'>삭제</Link>
            </li>
            <li>
              <span>3</span>
              <Link to='/list/3'>
                <s>리액트 과제 하기</s>
              </Link>
              <Link to='/list'>삭제</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
