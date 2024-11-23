import Layout from '@components/Layout';
import About from '@pages/About';
import Home from '@pages/Home';
import TodoList from '@pages/TodoList';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'todolist', element: <TodoList /> },
    ],
  },
]);

export default router;
