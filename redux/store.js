import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import quizReducer from './slices/quizSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
  },
});