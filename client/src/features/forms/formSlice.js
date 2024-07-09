import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create form
export const createForm = createAsyncThunk('forms/createForm', async (formData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/api/forms', formData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Get specific form
export const getForm = createAsyncThunk('forms/getForm', async (formId, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/forms/${formId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Fetch user-specific forms
export const getUserForms = createAsyncThunk('forms/getUserForms', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:5000/api/forms');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const formSlice = createSlice({
  name: 'forms',
  initialState: {
    forms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserForms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserForms.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = action.payload;
      })
      .addCase(getUserForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.loading = false;
        state.forms.push(action.payload);
      })
      .addCase(createForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getForm.fulfilled, (state, action) => {
        state.loading = false;
        state.form = action.payload;
      })
      .addCase(getForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default formSlice.reducer;
