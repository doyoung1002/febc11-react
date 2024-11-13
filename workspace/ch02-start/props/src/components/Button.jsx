import './Button.css';

export default function Button({ children, type = 'button', onClick: clickHandler }) {
  return (
    <button className='rounded-button' type={type} onClick={clickHandler}>
      {children}
    </button>
  );
}
