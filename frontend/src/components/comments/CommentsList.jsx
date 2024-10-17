import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';
import Button from '../Buttons/Button';

const CommentsList = ({ comments, postId }) => {
  const [commentsTree, setCommentsTree] = useState(comments);
  const [newCommentContent, setNewCommentContent] = useState('');
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: async (content) => {
      const response = await axios.post(
        `http://localhost:3000/api/v1/comments/post/${postId}`,
        { content },
        { withCredentials: true }
      );
      return response.data.comment;
    },
    onSuccess: (data) => {
      setCommentsTree((prevComments) => [...prevComments, data]);
      setNewCommentContent('');
      queryClient.invalidateQueries(['comments'], postId);
    },
    onError: (error) => {
      console.error('Failed to add comment:', error);
    },
  });

  const handleAddComment = () => {
    addCommentMutation.mutate(newCommentContent);
  };

  const handleReply = (parentId, reply) => {
    const addReplyToTree = (comments, parentId, reply) => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToTree(comment.replies, parentId, reply),
          };
        }
        return comment;
      });
    };

    setCommentsTree(addReplyToTree(commentsTree, parentId, reply));
  };

  return (
    <div>
      <div className="mb-4">
        <textarea
          className="w-full p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg"
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-2"
          onClick={handleAddComment}
          disabled={addCommentMutation.isLoading}
        >
          {addCommentMutation.isLoading ? 'Submitting...' : 'Submit'}
        </Button>
        {addCommentMutation.isError && <p className="text-red-500">Failed to add comment. Please try again.</p>}
      </div>
      {commentsTree.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} onReply={handleReply} />
      ))}
    </div>
  );
};

export default CommentsList;
