import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/UI/Sidebar';
import Footer from '../components/UI/Footer';
import Header from '../components/UI/Header';

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
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
