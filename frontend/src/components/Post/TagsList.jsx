

const TagsList = ({ tags }) => {
    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span
                    key={tag.id}
                    className="dark:bg-gray-900 bg-gray-100 border border-gray-500
text-gray-600 hover:bg-gray-200 hover:dark:bg-gray-800 cursor-pointer py-1 px-3 rounded-full text-sm"
                >
                    #{tag.name}
                </span>
            ))}
        </div>
    );
};

export default TagsList;
