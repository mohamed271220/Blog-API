const Footer = () => {
    return (
        <footer className="p-4 bg-gray-100 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-300">
            <p>© {new Date().getFullYear()} Specter. All rights reserved.</p>
        </footer>
    );
};

export default Footer;