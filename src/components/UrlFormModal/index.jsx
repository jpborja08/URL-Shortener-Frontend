import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import FormInput from '@components/FormInput';

import { useShortenUrlMutation } from '@redux/Reducers/apiSlice';

import './styles.scss';

export const UrlFormModal = ({ isOpen, onClose = () => {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [shortenUrlMutation, {
    isLoading,
  }] = useShortenUrlMutation();

  const onSubmit = async ({ originalUrl }) => {
    try {
      await shortenUrlMutation(originalUrl).unwrap();
      toast.success('URL shortened successfully!');
      reset();
      onClose?.();
    } catch (err) {
      toast.error('Something went wrong, try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="URL Form"
      className="modal-container"
    >
      <h2>Shorten a new URL</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="originalUrl"
          register={register}
          errors={errors}
          placeholder="Original URL"
          validation={{ required: 'URL is required' }}
        />
        <button type="submit" disabled={isLoading} className="modal-container__submit">Create</button>
      </form>
      <button onClick={onClose} className="modal-container__close">x</button>
    </Modal>
  );
};


export default UrlFormModal;
