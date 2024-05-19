import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignUpForm from '@components/SignUpForm';
import './styles.scss';

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
