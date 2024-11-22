import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import { createBrowserRouter } from 'react-router-dom';

// 첫 번째는 라우터의 규칙(여러개로 생성 가능) / 두 번째는 옵션
const router = createBrowserRouter(
  [
    // 첫 번째 라우터의 규칙
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/page1',
      element: <Page1 />,
    },
    {
      path: '/page2',
      element: <Page2 />,
    },
  ],
  {}
);

export default router;
