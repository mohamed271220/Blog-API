import React from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import Button from '../Buttons/Button';

const PostActions = ({ voteCount, onUpvote, onDownvote }) => {
    return (
        <div className="flex items-center justify-between mt-4 ">
            <div className="flex items-center space-x-2 border border-gray-500 rounded-3xl dark:bg-gray-900 bg-gray-100 px-2 py-1">
                <button
                    onClick={onUpvote}
                    className="flex items-center "
                >
                    <BiUpvote className="text-gray-600  hover:text-red-500" />
                    <span className="ml-1 text-gray-600">{voteCount}</span>
                </button>
                <span className="text-gray-600"> | </span>
                <button
                    onClick={onDownvote}
                    className="flex items-center py-1 "
                >
                    <BiDownvote className="text-gray-600 hover:text-red-500" />
                </button>
            </div>
            <Button size="sm" color="transparent" className="flex items-center border border-gray-500 rounded-lg px-2 py-1 hover:bg-gray-100">
                <FaComment className="text-gray-600" />
                <span className="ml-1 text-gray-600">Comments</span>
            </Button>
        </div>
    );
};

export default PostActions;
