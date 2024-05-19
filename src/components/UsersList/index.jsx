import React from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

import User from '@components/User';
import { useGetUsersQuery } from '@redux/Reducers/apiSlice';

import './styles.scss';

const UsersList = ({ users: usersProp }) => {
  const {
    data: usersData,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery(null, { skip: !!usersProp });

  const users = usersProp || usersData?.users || [];

  return (
    <div className={`users-container ${isLoading || users?.length === 0 || error ? 'users-container--center-content' : ''}`}>
      {
        isLoading ? <ThreeDots color="#0864ff" height={50} width={50} />
          : (
            <div>
              {users.length === 0 ? <p className="users-container__error-message">No users yet</p>
                : users?.slice().reverse().map((user) => <User key={user.id} user={user} />)}
              {isError != null && <p className="users-container__error-message">{error}</p>}
            </div>
          )
      }
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    followed: PropTypes.bool,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default UsersList;
