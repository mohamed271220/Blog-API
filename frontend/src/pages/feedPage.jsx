import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/Post/PostCard.jsx';
import Pagination from '../components/utilities/Pagination.jsx';
import Search from '../components/utilities/Search.jsx';
import { fetchPosts } from '../api/index.jsx';
import SkeletonLoader from '../components/Loading/LoadingSkeletons.jsx';

const FeedPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const queryParams = new URLSearchParams(location.search);
    const initialSearchQuery = queryParams.get('search') || '';
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [page, setPage] = useState(1);

    const limit = 10;

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.value = searchQuery;
        }
    }, [searchQuery]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', page, searchQuery],
        queryFn: ({ signal }) => fetchPosts({
            signal,
            page,
            searchQuery,
            limit,
        }),
    });

    const handleSearch = () => {
        const query = searchRef.current.value;
        setSearchQuery(query);
        navigate(`?search=${query}`);
    };

    if (isLoading) return <SkeletonLoader mode="mainPosts" />;
    if (isError) return <div>Error fetching posts: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Feed</h1>
            <Search searchRef={searchRef} onSearch={handleSearch} />
            <div className="mt-4">
                {data.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default FeedPage;
