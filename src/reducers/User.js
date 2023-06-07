/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit'; // install @reduxjs/toolkit by running `npm i @reduxjs/toolkit` in the terminal

const user = createSlice({
  name: 'user',
  initialState: {
    firstname: null, // Add firstname field
    username: null,
    userId: null,
    email: null, // Add email field
    role: null, // Add role field
    preferences: null, // Add preferences field
    accessToken: null,
    error: null
  },
  reducers: {
    setFirstname: (store, action) => { // Add setFirstname action
      store.firstname = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setEmail: (store, action) => { // Add setEmail action
      store.email = action.payload;
    },
    setRole: (store, action) => { // Add setRole action
      store.role = action.payload;
    },
    setPreferences: (store, action) => { // Add setPreferences action
      store.preferences = action.payload;
    }
  }
});

export const { setUsername, setUserId, setAccessToken, setError, setEmail, setRole, setPreferences, setFirstname } = user.actions;
export default user;