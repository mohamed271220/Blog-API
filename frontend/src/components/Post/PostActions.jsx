import React from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';

const PostActions = ({ to, voteCount, isPostPage }) => {
    const handleUpvote = () => {
        // Handle upvote logic
    };

    const handleDownvote = () => {
        // Handle downvote logic
    };

    return (
        <div className="flex items-center justify-between mt-4 ">
            <div className="flex items-center space-x-2 border border-gray-500 rounded-3xl dark:bg-gray-900 bg-gray-100 px-2 py-1">
                <button
                    onClick={handleUpvote}
                    className="flex items-center "
                >
                    <BiUpvote className="text-gray-600  hover:text-red-500" />
                    <span className="ml-1 text-gray-600">{voteCount}</span>
                </button>
                <span className="text-gray-600"> | </span>
                <button
                    onClick={handleDownvote}
                    className="flex items-center py-1 "
                >
                    <BiDownvote className="text-gray-600 hover:text-red-500" />
                </button>
            </div>
            {
                !isPostPage && (
                    <Link to={`/post/${to}`}>
                        <Button size="sm" color="transparent" className="flex items-center border border-gray-500 rounded-lg px-2 py-1 hover:bg-gray-100">
                            <FaComment className="text-gray-600" />
                            <span className="ml-1 text-gray-600">Comments</span>
                        </Button>
                    </Link>
                )
            }


        </div>
    );
};

export default PostActions;
