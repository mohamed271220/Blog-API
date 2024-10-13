import { useEffect, useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const toggleAuthMode = () => {
        setIsLogin((prev) => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            {isLogin ? <Login /> : <Signup />}
            <button
                onClick={toggleAuthMode}
                className="mt-4 p-2 text-blue-500 dark:text-blue-400 rounded underline hover:opacity-80"
            >
                Switch to {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
};

export default AuthPage;
