import { FaSearch } from 'react-icons/fa';

const Search = ({ searchRef, onSearch }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="relative mb-4">
            <input
                type="text"
                placeholder="Search posts..."
                ref={searchRef}
                onKeyPress={handleKeyPress}
                className="border text-black border-gray-300 rounded-lg p-2 w-full pr-10"
            />
            <button
                onClick={onSearch}
                className="absolute right-2 text-black top-1/2 transform -translate-y-1/2   rounded-full p-2 hover:bg-gray-200"
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default Search;
