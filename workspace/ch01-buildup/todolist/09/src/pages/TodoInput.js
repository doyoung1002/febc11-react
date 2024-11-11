import index from '../../../index.js';

// 입력창 구성
function TodoInput({ handleAdd, handleAddKeyup }) {
  return (
    index.createElement('div', { class: 'todoinput' },
      index.createElement('input', { type: 'text', autofocus: '', onkeyup: event => handleAddKeyup(event) }),
      index.createElement('button', { type: 'button', onclick: handleAdd }, '추가'))
  );
}

export default TodoInput;