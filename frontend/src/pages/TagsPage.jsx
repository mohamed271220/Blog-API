import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/Post/PostCard.jsx';
import Pagination from '../components/utilities/Pagination.jsx';
import { fetchPostsByTag, fetchTags } from '../api/index.jsx';
import SkeletonLoader from '../components/Loading/LoadingSkeletons.jsx';

const TagPage = () => {
    const navigate = useNavigate();

    const initialTagId = '2db76300-b595-43bc-9125-7c2f17fad202';
    const [selectedTag, setSelectedTag] = useState(initialTagId);
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: tags, isLoading: tagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', selectedTag, page],
        queryFn: ({ signal }) => fetchPostsByTag({ signal, selectedTag, page, limit }),
        enabled: !!selectedTag,
    });

    useEffect(() => {
        if (selectedTag) {
            navigate(`?tag=${selectedTag}`);
        }
    }, [selectedTag, navigate]);

    const handleTagChange = (tagId) => {
        setSelectedTag(tagId);
        setPage(1);
    };

    if (isError) return <div>Error fetching posts: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Posts by Tag</h1>

            <div className="flex flex-wrap justify-start">
                {tagsLoading ? (
                    <SkeletonLoader mode="spinner" />
                ) : (
                    tags?.tags.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => handleTagChange(tag.id)}
                            className={`rounded-full px-4 py-2 m-2 transition-colors duration-300 ease-in-out
                            ${selectedTag === tag.id
                                    ? 'bg-blue-500 text-white scale-105'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {tag.name}
                        </button>
                    ))
                )
                }
            </div>

            <div className="mt-4">
                {isLoading ? (
                    <SkeletonLoader mode="mainPosts" />
                ) : (
                    <>
                        {data?.posts?.map((item) => (
                            <PostCard key={item.id} post={item.Post} />
                        ))}
                        {data?.posts?.length === 0 && (
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

export default TagPage;
