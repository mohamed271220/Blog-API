import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { setUser, setError } from '../../features/authSlice';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            dispatch(setUser({ userId: data.userId, roles: data.roles }));
            navigate('/');
        },
        onError: (error) => {
            dispatch(setError(error.message));
        },
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Login</h2>
            {mutation.isError && (
                <p className="text-red-500 text-center mb-4">{mutation.error.message}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </div>
    );
};

export default Login;
