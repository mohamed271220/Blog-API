import { FaMoon } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';
import { motion } from 'framer-motion';
import { PiSunBold } from "react-icons/pi";

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    return (
        <motion.button
            onClick={() => dispatch(toggleTheme())}
            className="flex items-center cursor-pointer w-16 h-8 bg-gray-200 dark:bg-gray-800 rounded-full p-1"
            initial={{ backgroundColor: 'gray', borderRadius: '9999px' }}
            animate={{ backgroundColor: mode === 'light' ? '#cacfd9' : 'white' }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white bg-opacity-30 dark:bg-yellow-500 dark:bg-opacity-50 
                            border border-gray-300 dark:border-gray-100 
                            shadow-lg"
                initial={{ x: 0 }}
                animate={{ x: mode === 'light' ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            >
                {mode === 'light' ? (
                    <FaMoon className='text-gray-800' />
                ) : (
                    <PiSunBold  className='text-gray-800' />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
