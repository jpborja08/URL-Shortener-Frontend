import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFollowUserMutation, useUnfollowUserMutation } from '@redux/Reducers/apiSlice';

import { routes } from '@constants/routes';

import './styles.scss';

const User = ({
  user: {
    id, name, email, followed,
  },
}) => {
  const [followUserMutation] = useFollowUserMutation();
  const [unfollowUserMutation] = useUnfollowUserMutation();

  const handleFollow = async () => {
    try {
      if (followed) {
        await unfollowUserMutation(id).unwrap();
      } else {
        await followUserMutation(id).unwrap();
      }
    } catch (err) {
      toast.error('Something went wrong, try again.');
    }
  };

  return (
    <div className="user">
      <div className="user__info">
        <Link to={`${routes.USERS}/${id}`} className="user__name">{name}</Link>
        <div className="user__email">{email}</div>
      </div>
      {followed != null
      && (
        <button className={`user__follow-btn ${followed ? 'followed' : ''}`} onClick={handleFollow}>
          {followed ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    followed: PropTypes.bool,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default User;
