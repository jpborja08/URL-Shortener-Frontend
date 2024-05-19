import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from '@containers/Home';
// import Login from '@containers/Login';
// import SignUp from '@containers/SignUp';
// import Users from '@containers/Users';
// import Profile from '@containers/Profile';
// import UserForm from '@components/UserForm';
// import PostShow from '@containers/PostShow';

import { routes } from '@constants/routes';
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => (
  <main className="main">
    <ToastContainer />
    <Routes>
      <Route path={routes.HOME} element={<Home />} />
      {/* <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.SIGNUP} element={<SignUp />} />
      <Route path={routes.MYPROFILE} element={<Profile />} />
      <Route path={routes.EDITPROFILE} element={<UserForm />} />
      <Route path={`${routes.USERS}/:userId`} element={<Profile />} /> */}
    </Routes>
  </main>
);

export default Main;
