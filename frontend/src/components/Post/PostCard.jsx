import React, { useState } from 'react';
import PostModal from './PostModal';
import MediaSlider from './MediaSlider';
import PostContent from './PostContent';
import PostActions from './PostActions';

const PostCard = ({ post }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);

    const handleOpenModal = (mediaUrl) => {
        setSelectedMedia(mediaUrl);
        setModalOpen(true);
    };

    const handleUpvote = () => {
        // Handle upvote logic
    };

    const handleDownvote = () => {
        // Handle downvote logic
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-full mb-4 flex flex-col relative h-auto overflow-hidden">
            {/* Content Section */}
            <div className="">
                <PostContent 
                    title={post.title} 
                    content={post.content} 
                    username={post.User.username} 
                    createdAt={post.createdAt} 
                />
                
                {/* Media Slider */}
                {post.MediaLinks.length > 0 && (
                    <MediaSlider 
                        mediaLinks={post.MediaLinks} 
                        onOpenModal={handleOpenModal} 
                    />
                )}
            </div>

            {/* Post Actions at the bottom */}
            <PostActions 
                voteCount={post.voteCount || 0}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
            />

            {/* Modal for the media */}
            <PostModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} mediaUrl={selectedMedia} />
        </div>
    );
};

export default PostCard;
