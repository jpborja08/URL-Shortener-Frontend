export const getAuthHeaders = () => ({
  'accessToken': localStorage.getItem('accessToken'),
  'client': localStorage.getItem('client'),
  'uid': localStorage.getItem('uid'),
});

export const isSignedIn = () => localStorage.getItem('accessToken') !== null;

export const saveUserLogged = ({
  meta: {
    headers,
  },
}) => {
  localStorage.setItem('accessToken', headers.accessToken || headers['access-token']);
  localStorage.setItem('client', headers.client);
  localStorage.setItem('uid', headers.uid);
  localStorage.setItem('expiry', headers.expiry);
};

export const clearUserData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('client');
  localStorage.removeItem('uid');
  localStorage.removeItem('expiry');
};
