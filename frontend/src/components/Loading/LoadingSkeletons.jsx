import { motion } from 'framer-motion';

const SkeletonLoader = ({ mode }) => {
    const postSkeleton = (
        <motion.div
            className="bg-gray-100 dark:bg-gray-700 p-4 mb-4 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
            <div className="bg-gray-300 dark:bg-gray-600 h-6 mb-2 rounded w-3/4"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-4 mb-2 rounded w-full"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-4 mb-2 rounded w-5/6"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-40 mb-4 rounded-lg"></div>
            <div className="flex space-x-2">
                <div className="bg-gray-300 dark:bg-gray-600 h-6 w-10 rounded"></div>
                <div className="bg-gray-300 dark:bg-gray-600 h-6 w-10 rounded"></div>
            </div>
        </motion.div>
    );

    const singlePostSkeleton = (
        <motion.div
            className="bg-gray-100 dark:bg-gray-700 p-4 mb-4 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
            <div className="bg-gray-300 dark:bg-gray-600 h-8 mb-4 rounded w-1/2"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-6 mb-2 rounded w-full"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-6 mb-2 rounded w-5/6"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-80 mb-4 rounded-lg"></div>
            <div className="flex space-x-2">
                <div className="bg-gray-300 dark:bg-gray-600 h-6 w-10 rounded"></div>
                <div className="bg-gray-300 dark:bg-gray-600 h-6 w-10 rounded"></div>
            </div>
        </motion.div>
    );

    const commentSkeleton = (
        <motion.div
            className="bg-gray-100 dark:bg-gray-700 p-2 mb-2 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
            <div className="bg-gray-300 dark:bg-gray-600 h-4 mb-2 rounded w-3/4"></div>
            <div className="bg-gray-300 dark:bg-gray-600 h-4 mb-2 rounded w-full"></div>
        </motion.div>
    );

    const dropdownSkeleton = (
        <motion.div
            className="bg-gray-100 dark:bg-gray-700 p-2 mb-2 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
            <div className="bg-gray-300 dark:bg-gray-600 h-4 mb-2 rounded w-3/4"></div>
        </motion.div>
    );

    const skeletons = {
        mainPosts: Array(8).fill(postSkeleton),
        singlePost: [singlePostSkeleton],
        comments: Array(5).fill(commentSkeleton),
        dropdown: [dropdownSkeleton],
        spinner: (
            <motion.div
                className="w-16 h-16 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 border-solid rounded-full animate-spin mx-auto mt-4"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
            />
        ),
    };

    if (mode === 'spinner') {
        return (
            <div className="flex justify-center items-center h-full">
                {skeletons[mode]}
            </div>
        );
    }

    return (
        <div className="p-4">
            {skeletons[mode].map((skeleton, index) => (
                <div key={index}>{skeleton}</div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
