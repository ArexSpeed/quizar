import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 1,
  username: '',
  email: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.name;
      state.email = action.payload.email;
    },
    resetUser: ( state ) => {
      state.id = null;
      state.username = null;
    },
  },
});

// Selectors
export const getUser = (state) => state.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;