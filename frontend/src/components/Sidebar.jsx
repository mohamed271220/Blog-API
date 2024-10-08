
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa'; // Importing icons

const Sidebar = ({ isOpen }) => {
    return (
        <aside
            className={`transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 p-4 bg-gray-200 dark:bg-gray-800 fixed h-full text-black dark:text-white`}
        >
            <nav>
                <ul>
                    <li className="flex items-center mb-2">
                        <FaHome className="mr-2" />
                        <a href="#home">Home</a>
                    </li>
                    <li className="flex items-center mb-2">
                        <FaInfoCircle className="mr-2" />
                        <a href="#about">About</a>
                    </li>
                    <li className="flex items-center mb-2">
                        <FaEnvelope className="mr-2" />
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
