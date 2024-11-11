import index from '../../../index.js';

// 헤더 구성
function Header() {
  return (
    index.createElement('header', null,
      index.createElement('h1', null, 'Todo List - 컴포넌트 모듈화 :)'),
      index.createElement('p', null, '파일 경로: ',
        index.createElement('span', { id: 'filepath' }, `ch${document.URL.split('/ch')[1]}index.html`)))
  );
}

export default Header;