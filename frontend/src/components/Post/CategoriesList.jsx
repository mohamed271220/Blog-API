const CategoriesList = ({ categories }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category.id}
          className="dark:bg-gray-900 bg-gray-100 border border-gray-500
text-gray-600 hover:bg-gray-200 cursor-pointer hover:dark:bg-gray-800 py-1 px-3 rounded-full text-sm"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default CategoriesList;
