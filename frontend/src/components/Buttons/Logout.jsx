import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../features/authSlice';
import Button from './Button';

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/v1/auth/logout');
            if (response.status === 200) {
                dispatch(logout());
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Button onClick={handleLogout} color='gray'>
            Logout
        </Button>
    );
};

export default Logout;
