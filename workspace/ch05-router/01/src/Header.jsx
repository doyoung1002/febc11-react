import React from 'react';

function Header() {
  const handleClick = (e) => {
    // 브라우저의 기본 동작을 제거(a 태그 동작)
    e.preventDefault();
    // (state, title, url)
    // <a href='home.html'={handleClick}> home </a>
    // => pathname: /home.html
    window.history.pushState(null, '', e.target.pathname);
  };

  return (
    <>
      <header>
        <h1>리액트 라우터</h1>
        <a
          href='home.html'
          onClick={handleClick}
        >
          home
        </a>
        <br />
        <a
          href='page1.html'
          onClick={handleClick}
        >
          page1
        </a>
        <br />
        <a
          href='page2.html'
          onClick={handleClick}
        >
          page2
        </a>
      </header>
    </>
  );
}

export default Header;
