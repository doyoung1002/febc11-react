import index from '../../../index.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

// 할 일 구성
function Todo(props) {
  return (
    index.createElement('div', { id: 'main' },
      index.createElement('div', { id: 'container' },
        index.createElement('ul', null,
          index.createElement('li', null,
            index.createElement('h2', null, '쇼핑 목록'),
            TodoInput({ handleAdd: props.handleAdd, handleAddKeyup: props.handleAddKeyup }),
            TodoList({ itemList: props.itemList, toggleDone: props.toggleDone, deleteItem: props.deleteItem })))))
  );
}

export default Todo;