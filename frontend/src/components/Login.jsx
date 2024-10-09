import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { setUser, setError } from '../features/authSlice';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log(data);
            
            dispatch(setUser(data.userId));
            navigate('/')
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
        <div>
            <h2>Login</h2>
            {mutation.isError && <p>{mutation.error.message}</p>}
            <form onSubmit={handleSubmit}>
            <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={mutation.isLoading}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
