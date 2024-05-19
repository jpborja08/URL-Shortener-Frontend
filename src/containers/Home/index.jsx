import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUrlsQuery, useDeleteUrlMutation } from '@redux/Reducers/apiSlice';
import UrlFormModal from '@components/UrlFormModal'
import UrlList from '@components/UrlList';

import './styles.scss';

const Home = () => {
  const navigate = useNavigate();
  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useGetUrlsQuery();

  const [deleteUrl, { isLoading: isDeleting }] = useDeleteUrlMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (token) => {
    try {
      await deleteUrl(token).unwrap();
    } catch (error) {
      console.error('Failed to delete URL:', error);
    }
  };

  return (
    <div className="main-container">
      <h1>URLS</h1>
      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>Shorten URL</button>
      <UrlFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UrlList urls={urls} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
