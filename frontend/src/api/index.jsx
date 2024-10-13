import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient();


const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
});

export const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};


export const fetchPosts = async ({ signal, page = 1, searchQuery = '', limit = 10 }) => {
    const offset = (page - 1) * limit;
    const response = await api.get('/posts', {
        signal,
        params: {
            offset,
            limit,
            search: searchQuery,
        },
    });
    return response.data;
};


