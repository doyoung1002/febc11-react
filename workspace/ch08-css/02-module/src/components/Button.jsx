import PropTypes from 'prop-types';
import styles from './Button.module.css';
import classNames from 'classnames';

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  // oneOf : 배열 값 중에 하나를 쓸 때 쓴다.
  color: PropTypes.oneOf(['blue', 'red', 'yellow']), // 글자 색상
  bg: PropTypes.oneOf(['blue', 'red', 'yellow', 'gray']), // 배경 색상
  onClick: PropTypes.func,
};

export default function Button({ children, type = 'button', bg, color, onClick: clickHandler }) {
  // const colorStyle = `${styles.button} ${styles[`color-${bg}-${color}`]}`;
  const colorStyle = classNames(styles.button, styles[`color-${bg}-${color}`]);
  return (
    <button
      className={colorStyle}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}

// function classNames(...names) {
//   let result = '';
//   for (cont name of names) {
//     result += name + ' ';
//   }
//   return result;
// }
