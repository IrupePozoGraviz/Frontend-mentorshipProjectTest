import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: '', // Initialize with an empty string
    firstName: '', // Initialize with an empty string
    role: '', // Initialize with an empty string
    preferences: '', // Initialize with an empty string
    accessToken: null,
    userId: null,
    likedPersons: null,
    error: null,
    isOwner: false // Add the isOwner flag with an initial value of false
  },

  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setFirstName: (store, action) => {
      store.firstName = action.payload;
    },
    setRole: (store, action) => {
      store.role = action.payload;
    },
    setPreferences: (store, action) => {
      store.preferences = action.payload;
    },
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setLikedPersons: (store, action) => {
      store.likedPersons = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setIsOwner: (store, action) => {
      store.isOwner = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    }
  }
});

export const {
  setUsername,
  setEmail,
  setFirstName,
  setRole,
  setPreferences,
  setAccessToken,
  setUserId,
  setError,
  setIsOwner
} = user.actions;

export default user;