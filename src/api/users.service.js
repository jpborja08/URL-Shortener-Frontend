import { toast } from 'react-toastify';

import { getAuthHeaders } from '@api/utils';
import HTTP from './HTTP';

export const logIn = async (
  email,
  password,
  navigate,
  setErrors,
) => {
  try {
    const {
      headers,
    } = await HTTP.post('/users/sign_in', {
      email,
      password,
    });

    localStorage.setItem('accessToken', headers.accessToken || headers['access-token']);
    localStorage.setItem('client', headers.client);
    localStorage.setItem('uid', headers.uid);
    localStorage.setItem('expiry', headers.expiry);

    navigate('/');
    toast('You have successfully logged in!', { type: 'success' });
  } catch (error) {
    setErrors(error.response.data.errors);
    toast('Something went wrong!', { type: 'error' });
  }
};

export const logOut = (navigate) => HTTP.delete('/users/sign_out', {
  headers: getAuthHeaders(),
}).then(() => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('client');
  localStorage.removeItem('uid');
  localStorage.removeItem('expiry');
  navigate('/login');
  toast('You have successfully logged out!', { type: 'success' });
}).catch(() => {
  toast('Something went wrong, please try again', { type: 'alert' });
});

export const signUp = (
  name,
  email,
  password,
  passwordConfirmation,
  navigate,
  setErrors,
) => HTTP.post('/users', {
  email,
  name,
  password,
  password_confirmation: passwordConfirmation,
}).then(() => {
  navigate('/login');
  toast('You have successfully signed up!', { type: 'success' });
}).catch(({ response }) => {
  setErrors(response.data.errors);
  toast('Something went wrong!', { type: 'error' });
});

export default {
  logIn,
  signUp,
};
