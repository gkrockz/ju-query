import { createSlice } from '@reduxjs/toolkit';

// A function that accepts an initial state, an object of reducer 
// functions, and a "slice name", and automatically generates 
// action creators and action types that correspond to the reducers 
// and state.

export const questionSlice = createSlice({
  name: 'question',
  initialState:{
    questionId:null,
    questionName:null
  },
  
  reducers: {
    setQuestionInfo: (state,action) => {
      state.questionId = action.payload.questionId;
      state.questionName = action.payload.questionName; 
    }
  },
});

export const {setQuestionInfo} = questionSlice.actions;

export const selectQuestionId = (state) => state.question.questionId;

export const selectQuestionName = (state) => state.question.questionName;

export default questionSlice.reducer;
