import { useSelector } from 'react-redux';

const useAuth = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated;
};


export default useAuth;
