import Layout from './Layout';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// 첫 번째는 라우터의 규칙(여러개로 생성 가능) / 두 번째는 옵션
const router = createBrowserRouter(
  [
    // 첫 번째 라우터의 규칙
    // {
    //   path: '/',
    //   element: <Home />,
    // },
    // {
    //   path: '/page1',
    //   element: <Page1 />,
    // },
    // {
    //   path: '/page2',
    //   element: <Page2 />,
    // },
    {
      path: '/',
      element: <Layout />,
      children: [
        // 같은 페이지로 들어와도 주소를 변경하고 싶을 때 Navigate로 쓴다
        { index: true, element: <Navigate to='/home' /> },
        {
          path: 'page1',
          element: <Page1 />,
        },
        {
          path: 'page2',
          element: <Page2 />,
        },
      ],
    },
  ],
  {
    future: {
      // 없으면 콘솔에 경고 표시
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
