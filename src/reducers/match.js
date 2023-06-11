import { createSlice } from '@reduxjs/toolkit';

export const match = createSlice({
  name: 'match',
  initialState: {
    matchedPairs: [],
    matched: false,
    error: null
  },
  reducers: {
    setMatchedPairs: (state, action) => {
      state.matchedPairs = action.payload;
      state.matched = true;
    },
    clearMatchedPairs: (state) => {
      state.matchedPairs = [];
      state.matched = false;
    },
    setMatchError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setMatchedPairs,
  clearMatchedPairs,
  setMatchError
} = match.actions;

export default match
