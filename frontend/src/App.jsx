import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/main';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/authPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api';
import { useSelector } from 'react-redux';

function Home() {
  const isAuthenticated = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  
  return <div className='w-full h-[100vh]'>
    <h1 className="text-3xl font-bold">Hello, Tailwind CSS!</h1>
  </div>
}

function ProtectedStuff() {
  return <div className='w-full h-[100vh]'>
    <h1 className="text-3xl font-bold">Protected stuff</h1>
  </div>
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    id: 'root',
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/protected',
        element: <ProtectedRoute>
          <ProtectedStuff />
        </ProtectedRoute>
      }
    ]
  }
])

function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>

}

export default App;
