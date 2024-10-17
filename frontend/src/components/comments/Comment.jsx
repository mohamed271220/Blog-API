import { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../Buttons/Button';

const Comment = ({ comment, postId, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ content, parentId }) => {
      const response = await axios.post(
        `http://localhost:3000/api/v1/comments/post/${postId}`,
        { content, parentId },
        { withCredentials: true }
      );
      return response.data.comment;
    },
    onSuccess: (data, variables) => {
      onReply(variables.parentId, data);
      setShowReplyForm(false);
      setReplyContent('');
      queryClient.invalidateQueries(['comments'], postId);
    },
    onError: (error) => {
      console.error('Failed to post reply:', error);
    },
  });

  const handleReply = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    mutation.mutate({ content: replyContent, parentId: comment.id });
  };

  return (
    <div className="mb-4 relative">
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg relative flex items-start">
        <FaUserCircle className="text-2xl text-gray-500 dark:text-gray-400 mr-3" />
        <div className="flex-1">
          <div className="flex items-center mb-2">
            
            <span className="text-gray-800 dark:text-white font-semibold">{comment.author}</span>
          </div>
          <p className="text-gray-800 dark:text-white mb-2">{comment.content}</p>
          <button
            className="text-blue-500 hover:underline dark:text-blue-300 mt-2"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Reply
          </button>
          {showReplyForm && (
            <div className="mt-2">
              <textarea
                className="w-full p-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <Button
                className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2"
                onClick={handleReply}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? 'Submitting...' : 'Submit'}
              </Button>
              {mutation.isError && <p className="text-red-500">Failed to post reply. Please try again.</p>}
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-4 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} postId={postId} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
