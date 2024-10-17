import { useSelector } from "react-redux";

const useUser = () => {
    const { user } = useSelector((state) => state.auth);
    return user;
};

export default useUser;