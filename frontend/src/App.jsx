import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/main';

function Home() {
  return <div className='w-full h-[100vh]'>
    <h1 className="text-3xl font-bold">Hello, Tailwind CSS!</h1>
  </div>
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
