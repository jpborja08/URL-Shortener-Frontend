import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '@components/LoginForm';

import './styles.scss';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="login-container">
      <h1>Log in</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
