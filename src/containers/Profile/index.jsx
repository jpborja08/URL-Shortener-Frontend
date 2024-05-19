import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useMyProfileQuery, useProfileQuery, useFollowUserMutation, useUnfollowUserMutation,
} from '@redux/Reducers/apiSlice';
import { routes } from '@constants/routes';

import PostsList from '@components/PostsList';
import UsersList from '@components/UsersList';

import birthdayIcon from '@assets/birthday-icon.svg';
import joinedIcon from '@assets/joined-icon.svg';

import './styles.scss';

const Profile = () => {
  const { userId } = useParams();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = userId ? useProfileQuery(userId) : useMyProfileQuery();

  const [followUserMutation] = useFollowUserMutation();
  const [unfollowUserMutation] = useUnfollowUserMutation();

  const myId = useSelector((state) => state.session.id);

  const [selectedTab, setSelectedTab] = useState('posts');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const [content, setContent] = useState(<ThreeDots color="#0864ff" height={50} width={50}></ThreeDots>);

  const handleFollow = async () => {
    try {
      if (user.followed) {
        await unfollowUserMutation(user.id).unwrap();
      } else {
        await followUserMutation(user.id).unwrap();
      }
    } catch (err) {
      toast.error('Something went wrong, try again.');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      switch (selectedTab) {
        case 'posts':
          setContent(<PostsList userId={user.id} />);
          break;
        case 'followees':
          setContent(<UsersList users={user.followees} />);
          break;
        case 'followers':
          setContent(<UsersList users={user.followers} />);
          break;
        default:
          setContent(<PostsList />);
      }
    }
  }, [selectedTab, isSuccess, user]);

  if (isError) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
        <Link to="/">Go to homepage</Link>
      </div>
    );
  }

  return (
    <div className={`profile ${isLoading || error ? 'profile--center-content' : ''}`}>
      {
        isLoading ? <ThreeDots color="#0864ff" height={50} width={50} />
          : (
            <>
              <div className="profile__header">
                <div className="profile__info">
                  <h1 className="profile__name">{user.name}</h1>
                  <p className="profile__username">{user.email}</p>
                  <p className="profile__details">
                    <img src={birthdayIcon} alt="Birthday" className="profile__icon" />
                    <span className="profile__birthdate">Born 11/17/1992</span> |
                    <img src={joinedIcon} alt="Joined" className="profile__icon" />
                    <span className="profile__joindate">Joined 6/6/2017</span>
                  </p>
                </div>
                {myId === user.id ? (
                  <Link to={routes.EDITPROFILE} className="profile__edit-btn">Edit</Link>
                ) : (
                  <button onClick={handleFollow} className="profile__follow-btn">
                    {user.followed ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>
              <div className="profile__stats">
                <button
                  className={`profile__stat ${selectedTab === 'posts' ? 'profile__stat--selected' : ''}`}
                  onClick={() => handleTabClick('posts')}
                >
                  <span className="profile__stat-number">{user.posts.length} </span>
                  <span className="profile__stat-label">Posts</span>
                </button>
                <button
                  className={`profile__stat ${selectedTab === 'followees' ? 'profile__stat--selected' : ''}`}
                  onClick={() => handleTabClick('followees')}
                >
                  <span className="profile__stat-number">{user.followees.length} </span>
                  <span className="profile__stat-label">Following</span>
                </button>
                <button
                  className={`profile__stat ${selectedTab === 'followers' ? 'profile__stat--selected' : ''}`}
                  onClick={() => handleTabClick('followers')}
                >
                  <span className="profile__stat-number">{user.followers.length} </span>
                  <span className="profile__stat-label">Followers</span>
                </button>
              </div>
              <div className="profile__content">
                {content}
              </div>
            </>
          )
      }
    </div>
  );
};

export default Profile;
