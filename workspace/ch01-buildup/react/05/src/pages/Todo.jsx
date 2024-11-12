import TodoInput from './TodoInput';
import TodoList from './TodoList';

function Todo(props) {
  return (
    <div id='main'>
      <div id='container'>
        <ul>
          <li>
            <h2>쇼핑 목록</h2>
            <TodoInput addItem={props.addItem} />
            <TodoList itemList={props.itemList} toggleDone={props.toggleDone} deleteItem={props.deleteItem} />
            {/* 무조건 ...props로 넘기면 안된다. 최대한 필요한 것만 전달하는 것이 좋다. */}
            {/* <TodoList {...props} /> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Todo;
