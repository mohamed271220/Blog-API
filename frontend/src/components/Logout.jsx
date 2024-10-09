import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../features/authSlice';

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/v1/auth/logout');
            if (response.data.success) {
                dispatch(logout());
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button onClick={handleLogout} className="p-2 text-xl dark:text-white rounded flex items-center">
            Logout
        </button>
    );
};

export default Logout;