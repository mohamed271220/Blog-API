import { FaBars, FaTimes } from 'react-icons/fa';
import BurgerButton from '../Buttons/BurgerButton';
import ThemeToggle from '../Buttons/ThemeToggle';
import Button from '../Buttons/Button';
import useAuth from '../../hooks/useAuth';
import Logout from '../Buttons/Logout';
import { Link } from 'react-router-dom';
import { MdHome } from 'react-icons/md'; // Using home icon as the logo

const Header = ({ isSidebarOpen, toggleSidebar }) => {
    const isAuthenticated = useAuth();

    return (
        <header className="fixed top-0 left-0 w-full p-4 bg-gray-100 dark:bg-gray-900 flex justify-between items-center z-50">
            <div className="flex items-center">
                <BurgerButton
                    onClick={toggleSidebar}
                    className="dark:text-white"
                    isToggled={isSidebarOpen}
                >
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </BurgerButton>
            </div>
            <div className="flex-grow text-center">
                <Link to="/" className="text-xl font-bold dark:text-white flex justify-center items-center">
                    <MdHome size={24} />
                    <span className="ml-2">Logo</span>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <ThemeToggle />
                {isAuthenticated ? (
                    <Logout />
                ) : (
                    <Link to="/auth">
                        <Button color='gray' >
                            Login
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
