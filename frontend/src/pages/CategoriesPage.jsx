import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/Post/PostCard.jsx';
import Pagination from '../components/utilities/Pagination.jsx';
import { fetchPostsByCategory, fetchCategories } from '../api/index.jsx';
import SkeletonLoader from '../components/Loading/LoadingSkeletons.jsx';

const CategoryPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialCategoryId = '1e63a691-0a71-44aa-9a80-2a4dde6588aa';
    const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', selectedCategory, page],
        queryFn: ({ signal }) => fetchPostsByCategory({ signal, selectedCategory, page, limit }),
        enabled: !!selectedCategory,
    });

    useEffect(() => {
        if (selectedCategory) {
            navigate(`?category=${selectedCategory}`);
        }
    }, [selectedCategory, navigate]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setPage(1);
    };

    if (isError) return <div>Error fetching posts: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Posts by Category</h1>

            <div className="flex flex-wrap justify-start">
                {categoriesLoading ? (
                    <SkeletonLoader mode="spinner" />
                ) : (
                    categories?.categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`rounded-full px-4 py-2 m-2 transition-colors duration-300 ease-in-out
                                ${selectedCategory === category.id
                                    ? 'bg-blue-500 text-white scale-105'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))
                )}
            </div>

            <div className="mt-4">
                {isLoading ? (
                    <SkeletonLoader mode="mainPosts" />
                ) : (
                    <>
                        {data?.posts?.map((item) => (
                            <PostCard key={item.id} post={item.Post} />
                        ))}
                        {data.posts.length === 0 && (
                            <div className="text-center text-gray-500">No posts found</div>
                        )}
                    </>
                )}
            </div>

            {!isLoading && data?.posts && (
                <Pagination
                    currentPage={page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
};

export default CategoryPage;
