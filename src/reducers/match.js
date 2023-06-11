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
    }
  }
});
