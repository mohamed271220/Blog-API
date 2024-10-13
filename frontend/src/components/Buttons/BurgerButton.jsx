import { motion } from 'framer-motion';

const AnimatedButton = ({ onClick, children, className, ...props }) => {
    return (
        <motion.button
            className={`p-2 text-xl rounded flex items-center ${className}`}
            onClick={onClick}
            animate={{ rotate: props.isToggled ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
