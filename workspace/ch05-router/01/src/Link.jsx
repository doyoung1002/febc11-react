import PropTypes from 'prop-types';
import React from 'react';

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

function Link({ children, to }) {
  const handleClick = (e) => {
    // 브라우저의 기본 동작을 제거(a 태그 동작)
    e.preventDefault();
    // (state, title, url)
    // <a href='home.html'={handleClick}> home </a>
    // => pathname: /home.html
    window.history.pushState(null, '', e.target.pathname);
  };
  return (
    <a
      href={to}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default Link;
