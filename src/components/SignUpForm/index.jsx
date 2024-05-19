import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '@components/FormInput';

import { useSignupMutation } from '@redux/Reducers/apiSlice';

import './styles.scss';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [signupMutation, {
    isLoading,
    isSuccess,
    data,
  }] = useSignupMutation();

  const onSubmit = async ({
    name, email, password, passwordConfirmation,
  }) => {
    try {
      await signupMutation({
        email,
        name,
        password,
        passwordConfirmation,
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
      navigate('/login');
    }
  }, [isSuccess, data]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          name="name"
          placeholder="Name"
          error={errors?.name}
        />

        <FormInput
          register={register}
          name="email"
          placeholder="Email"
          error={errors?.email}
        />

        <FormInput
          register={register}
          name="password"
          placeholder="Password"
          error={errors?.password}
          type="password"
        />

        <FormInput
          register={register}
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          error={errors?.passwordConfirmation}
          type="password"
        />

        <input
          className="form-container__submit"
          type="submit"
          value={isLoading ? 'Loading...' : 'Submit'}
          disabled={isLoading}
        />
      </form>

      <div className="form-container__login-link">
        <Link to="/login">Already have an account? Log in</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
