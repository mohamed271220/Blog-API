import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/main';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api';
import FeedPage from './pages/feedPage';
import Post from './pages/postPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    id: 'root',
    children: [
      {
        index: true,
        element: <FeedPage />
      },
      {
        path: '/post/:id',
        element: <Post />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
    ]
  }
])

function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>

}

export default App;
