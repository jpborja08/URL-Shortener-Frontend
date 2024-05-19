import React from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

import Post from '@components/Post';
import { useGetPostsQuery } from '@redux/Reducers/apiSlice';

import './styles.scss';

const PostsList = ({ userId = null }) => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetPostsQuery(userId);

  return (
    <div className={`posts-container ${isLoading || posts.length === 0 || error ? 'posts-container--center-content' : ''}`}>
      {
        isLoading ? <ThreeDots color="#0864ff" height={50} width={50} />
          : (
            <div>
              {posts.length === 0 ? <p className="posts-container__error-message">No posts yet</p>
                : posts.slice().reverse().map((post) => <Post key={post.id} post={post} />)}
              {isError != null && <p className="post-container__error-message">{error}</p>}
            </div>
          )
      }
    </div>
  );
};

PostsList.propTypes = {
  userId: PropTypes.number,
};

export default PostsList;
