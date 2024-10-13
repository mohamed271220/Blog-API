import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Button = ({
    onClick,
    children,
    className = '',
    color = 'blue',
    size = 'md',
    variant = 'solid',
    rounded = 'md',
    disabled = false,
    ...props
}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const sizeClasses = {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-4 text-md',
        lg: 'py-3 px-6 text-lg',
    };

    const colorClasses = {
        transparent:{
            solid: 'bg-transparent text-gray-500 hover:bg-gray-100',
            outline: 'text-gray-500 border border-gray-500 hover:bg-gray-100',
        },
        blue: {
            solid: isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600',
            outline: isDarkMode ? 'text-blue-400 border-blue-400 hover:bg-blue-700' : 'text-blue-500 border-blue-500 hover:bg-blue-100',
        },
        red: {
            solid: isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600',
            outline: isDarkMode ? 'text-red-400 border-red-400 hover:bg-red-700' : 'text-red-500 border-red-500 hover:bg-red-100',
        },
        green: {
            solid: isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600',
            outline: isDarkMode ? 'text-green-400 border-green-400 hover:bg-green-700' : 'text-green-500 border-green-500 hover:bg-green-100',
        },
        yellow: {
            solid: isDarkMode ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'bg-yellow-500 text-white hover:bg-yellow-600',
            outline: isDarkMode ? 'text-yellow-400 border-yellow-400 hover:bg-yellow-700' : 'text-yellow-500 border-yellow-500 hover:bg-yellow-100',
        },
        gray: {
            solid: isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
            outline: isDarkMode ? 'text-gray-400 border-gray-400 hover:bg-gray-600' : 'text-gray-600 border-gray-600 hover:bg-gray-200',
        }
    };

    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };

    const baseClasses = `transition ease-in-out duration-300 ${sizeClasses[size]} ${roundedClasses[rounded]} ${className}`;
    const variantClasses = colorClasses[color][variant];

    return (
        <motion.button
            className={`${baseClasses} ${variantClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            whileHover={{ scale: !disabled ? 1.05 : 1 }}
            whileTap={{ scale: !disabled ? 0.95 : 1 }}
            disabled={disabled}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
