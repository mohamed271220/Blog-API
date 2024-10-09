import { useState } from 'react';
import Login from '../components/login';
import Signup from '../components/Signup';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                {isLogin ? 'Login' : 'Signup'}
            </h1>
            {isLogin ? <Login /> : <Signup />}
            <button
                onClick={toggleAuthMode}
                className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
};

export default AuthPage;