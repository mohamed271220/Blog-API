import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { setUser, setError } from '../features/authSlice';
import { signup } from '../api';

const Signup = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const mutation = useMutation( {
        mutationFn: signup,
        onSuccess: (data) => {
            dispatch(setUser(data.user));
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
            <h2>Signup</h2>
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
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
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
