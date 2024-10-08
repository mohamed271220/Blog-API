import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Layout = () => {
    const mode = useSelector((state) => state.theme.mode);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        if (mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [mode]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 w-full p-4 bg-gray-100 dark:bg-gray-900 flex justify-between items-center z-50">
                <motion.button
                    className="p-2 text-xl dark:text-white rounded flex items-center"
                    onClick={toggleSidebar}
                    animate={{ rotate: isSidebarOpen ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                >
                    {isSidebarOpen ? <FaTimes /> : <FaBars />} {/* Show X when open, burger when closed */}
                </motion.button>
                <ThemeToggle />
            </header>
            <div className="flex flex-grow mt-16"> {/* Add margin-top to push main content below fixed header */}
                <Sidebar isOpen={isSidebarOpen} />
                <main className={`flex-grow p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} bg-white dark:bg-gray-900 text-black dark:text-white`}>
                    <Outlet />
                </main>
            </div>
            <Footer /> 
        </div>
    );
};

export default Layout;
