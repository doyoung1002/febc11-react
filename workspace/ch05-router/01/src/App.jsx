import Page1 from './Page1';
import Page2 from './Page2';
import Home from './Home';
import { useEffect, useState } from 'react';

function App() {
  const [path, setPath] = useState(window.location.pathname);
  console.log('현재 페이지', path);
  useEffect(() => {
    const handleNavigate = (e) => {
      // 어느 주소인지 꺼내볼 수 있다.
      setPath(e.destination.url.split(location.host).pop());
    };
    window.navigation.addEventListener('navigate', handleNavigate);
    return () => {
      // 계속 이벤트리스너가 작동하지 않도록 cleanup 함수 호출, 그래서 이벤트리스너 삭제
      window.navigation.removeEventListener('navigate', handleNavigate);
    };
  }, []); // 최초 한번만 호출

  return (
    <>
      {(path === '/' || path === '/home.html') && <Home />}
      {path === '/page1.html' && <Page1 />}
      {path === '/page2.html' && <Page2 />}
    </>
  );
}

export default App;
