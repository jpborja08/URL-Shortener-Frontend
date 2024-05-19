import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import FormInput from '@components/FormInput';

import { saveUserLogged } from '@api/utils';
import { useLoginMutation } from '@redux/Reducers/apiSlice';

import './styles.scss';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMutation, {
    isLoading,
    isSuccess,
    data,
  }] = useLoginMutation();

  const onSubmit = async ({
    email,
    password,
  }) => {
    try {
      await loginMutation({
        email,
        password,
      }).unwrap();
    } catch (err) {
      if (err?.data?.errors) {
        setErrors(err.data.errors);
        toast.error('Something went wrong, try again.');
      } else {
        toast.error('Something went wrong, try again.');
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(LOGIN__SUCCESS(data.response.data));
      saveUserLogged(data);
      navigate('/');
    }
  }, [isSuccess, data]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          name="email"
          placeholder="Email"
          error={null}
        />
        <FormInput
          register={register}
          name="password"
          placeholder="Password"
          error={null}
          type="password"
        />
        <input
          className="form-container__submit"
          type="submit"
          value={isLoading ? 'Loading...' : 'Submit'}
          disabled={isLoading}
        />
      </form>
      {errors.map((error) => <p key={error} className="form-container__error-message">{error}</p>)}

      <div className="form-container__signup-link">
        <Link to="/signup">Don&apos;t have an account? Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
