import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormInput from '@components/FormInput';

import { useEditUserMutation } from '@redux/Reducers/apiSlice';

import './styles.scss';

export const UserForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [errors, setErrors] = useState([]);
  const [editUserMutation, {
    data,
    isLoading,
    isSuccess,
  }] = useEditUserMutation();
  const dispatch = useDispatch();
  const currentEmail = useSelector((state) => state.session.email);
  const currentName = useSelector((state) => state.session.name);
  const navigate = useNavigate();

  const onSubmit = async ({
    email,
    password,
    passwordConfirmation,
    name,
  }) => {
    try {
      await editUserMutation({
        email,
        name,
        password,
        passwordConfirmation,
      }).unwrap();
    } catch (err) {
      if (err?.data) {
        setErrors(err.data);
        toast.error('Something went wrong, try again.');
      } else {
        toast.error('Something went wrong, try again.');
      }
    }
  };

  useEffect(
    () => {
      if (isSuccess) {
        toast.success('User edited successfully!');
        dispatch(EDIT_USER__SUCCESS(data.data));
        navigate('/my-profile');
      }
    },
    [isSuccess, data]
  );

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit User</h1>
        <FormInput
          register={register}
          name="name"
          placeholder={currentName}
          error={errors?.name}
        />
        <FormInput
          register={register}
          name="email"
          placeholder={currentEmail}
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
          placeholder="Password confirmation"
          error={errors?.passwordConfirmation}
          type="password"
        />
        <input
          className="user-form-container__submit"
          type="submit"
          value={isLoading ? 'Loading...' : 'Submit'}
          disabled={isLoading}
        />
      </form>
      {errors.map((error) => <p key={error} className="user-form-container__error-message">{error}</p>)}
    </div>
  );
};

export default UserForm;
