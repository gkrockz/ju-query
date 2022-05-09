import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import questionReducer from "../features/questionSlice";

// A friendly abstraction over the standard Redux createStore function 
// that adds good defaults to the store setup for a better 
// development experience.

export default configureStore({
  reducer: {
    user: userReducer,
    question:questionReducer,
  },
});
