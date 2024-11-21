import { useRef, useState } from 'react';
import { PropTypes } from 'prop-types';

function TodoInput({ addItem }) {
  const [title, setTitle] = useState('');

  // 포커스를 주기 위해서 DOM 객체에 직접 접근해야 한다.
  const titleElem = useRef();

  const handleAdd = () => {
    if (title.trim() !== '') {
      addItem(title);
      setTitle('');
      titleElem.current.focus();
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') handleAdd();
  };

  return (
    <div className='todoinput'>
      <input
        type='text'
        autoFocus
        onKeyUp={handleKeyUp}
        ref={titleElem}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button
        type='button'
        onClick={handleAdd}
      >
        추가
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default TodoInput;
