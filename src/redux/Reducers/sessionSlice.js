/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  name: null,
};

const sessionSlice = createSlice({
  initialState,
  name: 'session',
  reducers: {
    EDIT_USER__SUCCESS: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
    LOGIN__SUCCESS: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
      state.id = payload.id;
    },
    LOGOUT: (state) => {
      state.name = null;
      state.email = null;
      state.id = null;
    },
  },
});

export const {
  EDIT_USER__SUCCESS,
  LOGIN__SUCCESS,
  LOGOUT,
} = sessionSlice.actions;

export default sessionSlice.reducer;
