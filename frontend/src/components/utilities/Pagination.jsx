const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map((_, i) => i + 1);

    return (
        <div className="flex justify-center mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`mx-1 px-4 py-2 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
                        }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
