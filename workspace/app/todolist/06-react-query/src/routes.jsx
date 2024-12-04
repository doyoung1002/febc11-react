import Layout from '@components/Layout';
import About from '@pages/About';
import ErrorPage from '@pages/ErrorPage';
import Home from '@pages/Home';
import TodoAdd from '@pages/TodoAdd';
import TodoDetail from '@pages/TodoDetail';
import TodoEdit from '@pages/TodoEdit';
import TodoList from '@pages/TodoList';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Navigate to='/home' /> },
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'list', element: <TodoList /> },
        { path: 'list/add', element: <TodoAdd /> },
        {
          path: 'list/:_id',
          // :를 추가해서 동적으로 변하는 url에 대해 :를 한다 -> 동적 세그먼트
          // 여기에 children을 추가하면 자식을 추가할 수 있음
          // }, 이와 같이 중첩구조로 사용이 가능하다. 자식 컴포넌도 가능
          // path: 'list/:_id/:hello/:world', //ist/3/a/b => {_id: 3, hello: 'a', world: 'b} -> useParams
          element: <TodoDetail />,
          children: [{ path: 'edit', element: <TodoEdit /> }],
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
