import index from '../../../index.js';

// 할 일 아이템 하나 구성
// 구조분해할당으로 
// function TodoItem(props) { 에서 아래로 교체
function TodoItem({ item, toggleDone, deleteItem }) {
  return (
    index.createElement('li', { 'data-no': item.no },
      index.createElement('span', null, item.no),
      index.createElement('span', { onclick: () => toggleDone(item.no) },
        item.done ? index.createElement('s', null, item.title) : item.title),
      index.createElement('button', { onclick: () => deleteItem(item.no) }, '삭제'))
  );
}

export default TodoItem;