import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import formReducer from './features/forms/formSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    forms: formReducer,
  },
});

export default store;
