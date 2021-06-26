import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('quiz/categoriesApi', async () => {
  const response = await axios.get('http://localhost:3000/api/categories');
  return response.data
});

// load localStorage to unlogged user
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('points');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.stringify(serializedState);
  } catch (err) {
    return undefined;
  }
}; 


const initialState = {
  categories: [
    {
      id: 1,
      name: 'Maths',
      finished: false,
      result: 0
    },
    {
      id: 2,
      name: 'Programming',
      finished: false,
      result: 0
    },
    {
      id: 3,
      name: 'Geography',
      finished: false,
      result: 0
    },
  ],
  selectedCategory: null,
  activeQuestion: 0,
  selectedQuestions: [],
  categoriesApi: [],
  questionsApi: [],
  userResults: [],
  userResultsFromStorage: [],
  storagePoint: loadState(),
}

export const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    next: state => {
      state.activeQuestion += 1;
    },
    prev: state => {
      state.activeQuestion -= 1;
    },
    reset: state => {
      state.selectedCategory = null;
      state.activeQuestion = 0;
      state.result = 0;
    },
    toggleAnswer: (state, action) => {
      console.log(action, 'toogle')
      const answer = action.payload;
      const question = state.questions[state.activeQuestion]
      question.answers[answer].checked = !question.answers[answer].checked
    },
    filterQuestions: (state, action) => {
      state.selectedQuestions = state.questions.filter(question => question.category === action.payload);
      state.selectedCategory = action.payload;
    },
    finish: (state, action) => {
      console.log(action.payload);
      const categoryName = action.payload.name;
      const result = action.payload.result;
      state.categories.map(category => {
        if(category.name === categoryName) {
          category.result = result;
          category.finished = true;
        }
      })
    },
    getQuestionsFromApi : (state, action) => {
      state.questionsApi = [];
      state.questionsApi.push(action.payload.data);
    },
    fetchUserResults : (state, action) => {
      state.userResults = [];
      state.userResults.push(action.payload.data);
    },
    saveToStorage: (state, action) => {
      console.log(action.payload, 'saveToStorage')
      localStorage.setItem('points', JSON.stringify(action.payload));
    }
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.categoriesApi.push(action.payload);
    },
  }
});

export const {
  selectCategory,
  start,
  next,
  prev,
  reset,
  toggleAnswer,
  filterQuestions,
  finish,
  getQuestionsFromApi,
  fetchUserResults,
  saveToStorage
} = slice.actions;

export const getQuizCategories = state => state.quiz.categories;
export const getQuizQuestions = state => state.quiz.questions;
export const getActiveQuestionNumber = state => state.quiz.activeQuestion;
export const getCurrentCategory = state => state.quiz.selectedCategory;
export const getSelectedQuestions = state => state.quiz.selectedQuestions;
//Select from API
export const getQuizCategoriesApi = state => state.quiz.categoriesApi;
export const getQuizQuestionsApi = state => state.quiz.questionsApi;
export const getUserResults = state => state.quiz.userResults;
//Select from localStorage
export const getStoragePoint = state => state.quiz.storagePoint;

export default slice.reducer;