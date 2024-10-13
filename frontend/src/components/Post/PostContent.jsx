const PostContent = ({ title, content, username, createdAt }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 flex-grow">{content}</p>
            <div className="mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">By {username}</span>
            </div>
            <div className="mt-2 text-gray-500 dark:text-gray-400">
                {new Date(createdAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default PostContent;
