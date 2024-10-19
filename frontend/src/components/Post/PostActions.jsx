import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../../api';

const PostActions = ({ postId, initialVoteCount, isPostPage }) => {
    const isAuthenticated = useAuth();
    const voteMutation = useMutation({
        mutationFn: (voteType) => {
            return axios.post(`http://localhost:3000/api/v1/votes/post/${postId}`, {
                type: voteType,
            },
                {
                    withCredentials: true,
                });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['post', postId]);
            queryClient.invalidateQueries(['posts']);
        },
        onError: (error) => {
            console.error('Error voting:', error.response.data);
        },
    });

    const handleVote = (voteType) => {
        if (isAuthenticated) {
            voteMutation.mutate(voteType);
        } else {
            alert('Please log in to vote');
        }
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 border border-gray-500 rounded-3xl dark:bg-gray-900 bg-gray-100 px-2 py-1">
                <button onClick={() => handleVote('upvote')} className="flex items-center">
                    <BiUpvote className="text-gray-600 hover:text-red-500" />
                    <span className="ml-1 text-gray-600">{initialVoteCount}</span>
                </button>
                <span className="text-gray-600"> | </span>
                <button onClick={() => handleVote('downvote')} className="flex items-center py-1">
                    <BiDownvote className="text-gray-600 hover:text-red-500" />
                </button>
            </div>
            {!isPostPage && (
                <Link to={`/post/${postId}`}>
                    <Button size="sm" color="transparent" className="flex items-center border border-gray-500 rounded-lg px-2 py-1 hover:bg-gray-100">
                        <FaComment className="text-gray-600" />
                        <span className="ml-1 text-gray-600">Comments</span>
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default PostActions;
