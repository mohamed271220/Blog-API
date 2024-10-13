import { FaHome, FaInfoCircle, FaEnvelope, FaUserCircle } from 'react-icons/fa'; // Importing icons
import useAuth, { useUser } from '../../hooks/useAuth';

const Sidebar = ({ isOpen }) => {
    const isAuthenticated = useAuth();
    const user = useUser();

    return (
        <aside
            className={`transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 p-4 bg-gradient-to-b fixed h-full`}
        >
            <div className="flex flex-col items-center mb-8">
                {isAuthenticated && (
                    <>
                        <FaUserCircle className="text-4xl mb-2" />
                        <p className="text-lg font-semibold">{user?.username}</p>
                    </>
                )}
            </div>
            <nav>
                <ul>
                    <li className="flex items-center mb-4 hover:bg-gray-600 bg-opacity-45 p-2 rounded">
                        <FaHome className="mr-3" />
                        <a href="#home" className="text-lg">Home</a>
                    </li>
                    {isAuthenticated && (
                        <li className="flex items-center mb-4 hover:bg-gray-600 bg-opacity-45 p-2 rounded">
                            <FaInfoCircle className="mr-3" />
                            <a href="#about" className="text-lg">Recommended</a>
                        </li>
                    )}
                    <li className="flex items-center mb-4 hover:bg-gray-600 bg-opacity-45 p-2 rounded">
                        <FaEnvelope className="mr-3" />
                        <a href="#contact" className="text-lg">Contact</a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
