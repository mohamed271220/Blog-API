import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostContent from '../components/Post/PostContent';
import MediaSlider from '../components/Post/MediaSlider';
import PostActions from '../components/Post/PostActions';
import { useQuery } from '@tanstack/react-query';
import { fetchComments, fetchPost } from '../api';
import SkeletonLoader from '../components/Loading/LoadingSkeletons';
import CommentsList from '../components/comments/CommentsList';
import PostModal from '../components/Post/PostModal';
import CategoriesList from '../components/Post/CategoriesList';
import TagsList from '../components/Post/TagsList';


const Post = () => {
  const { id } = useParams();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleOpenModal = (mediaUrl) => {
    setSelectedMedia(mediaUrl);
    setModalOpen(true);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', id],
    queryFn: ({ signal }) => fetchPost({
      signal,
      id
    }),
  });

  const { data: comments, isLoading: commentsLoading, isError: isCommentsError, error: commentsError } = useQuery({
    queryKey: ['comments', id],
    queryFn: ({ signal }) => fetchComments({
      signal,
      id
    }),
  });


  const post = data?.post;


  if (isLoading) {
    return <>
      <SkeletonLoader mode="singlePost" />
    </>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full mb-4 flex flex-col relative h-auto overflow-hidden">
      <PostContent
        title={post.title}
        content={post.content}
        username={post.User.username}
        createdAt={post.createdAt}
      />

      {post.MediaLinks.length > 0 && (
        <MediaSlider mediaLinks={post.MediaLinks} onOpenModal={handleOpenModal} />
      )}

      <PostActions
        isPostPage={true}
        voteCount={post.voteCount || 0}
      />

<CategoriesList categories={post.Categories} />
<TagsList tags={post.Tags} />

      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Comments</h3>
        <div className=" rounded-lg p-4 mt-2">
          {
            commentsLoading ? <SkeletonLoader mode="comments" /> : <CommentsList postId={id} comments={comments.commentTree} />
          }
        </div>
      </div>
      <PostModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} mediaUrl={selectedMedia} />

    </div>
  );
};

export default Post;
