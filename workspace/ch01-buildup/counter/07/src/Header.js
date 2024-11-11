import Index from '../index.js';

function Header() {
  return (
    Index.createElement('header', null,
      Index.createElement('h1', null, 'Counter - 컴포넌트 모듈화'),
      Index.createElement('p', null, '파일 경로: ',
        Index.createElement('span', { id: 'filepath' },
          `ch${document.URL.split('/ch')[1]}index.html`)))
  );
}

export default Header;