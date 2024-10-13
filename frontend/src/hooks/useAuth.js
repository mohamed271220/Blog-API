import { useSelector } from 'react-redux';

const useAuth = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated;
};

export const useUser = () => {
    const { user } = useSelector((state) => state.auth);
    return user;
};

export default useAuth;
