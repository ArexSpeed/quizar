import { createSlice } from '@reduxjs/toolkit';

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
  result: 0,
  questions: [
    {
      id: 1,
      category: 'Maths',
      content: '2+2 = ',
      answers: [
        { valid: false, checked: false, content: "3" },
        { valid: false, checked: false, content: "8"},
        { valid: true, checked: false, content: "4"},
        { valid: false, checked: false, content: "5"},
      ]
    },
    {
      id: 2,
      category: 'Maths',
      content: '2+20 = ',
      answers: [
        { valid: false, checked: false, content: "3" },
        { valid: true, checked: false, content: "22"},
        { valid: false, checked: false, content: "4"},
        { valid: false, checked: false, content: "5"},
      ]
    },
    {
      id: 3,
      category: 'Maths',
      content: '5*10 = ',
      answers: [
        { valid: true, checked: false, content: "50" },
        { valid: false, checked: false, content: "80"},
        { valid: false, checked: false, content: "40"},
        { valid: false, checked: false, content: "5"},
      ]
    },
    {
      id: 4,
      category: 'Programming',
      content: 'One of framework is ',
      answers: [
        { valid: false, checked: false, content: "JavaScript" },
        { valid: false, checked: false, content: "HTML"},
        { valid: true, checked: false, content: "React"},
        { valid: false, checked: false, content: "Python"},
      ]
    },
    {
      id: 5,
      category: 'Programming',
      content: 'What is not a programming language? ',
      answers: [
        { valid: false, checked: false, content: "C++" },
        { valid: true, checked: false, content: "React"},
        { valid: false, checked: false, content: "Python"},
        { valid: false, checked: false, content: "Java"},
      ]
    },
    {
      id: 6,
      category: 'Programming',
      content: 'JavaScript launched at ',
      answers: [
        { valid: true, checked: false, content: "1995" },
        { valid: false, checked: false, content: "2005"},
        { valid: false, checked: false, content: "2001"},
        { valid: false, checked: false, content: "1999"},
      ]
    },
    {
      id: 7,
      category: 'Geography',
      content: 'The biggest country in the World> ',
      answers: [
        { valid: false, checked: false, content: "USA" },
        { valid: false, checked: false, content: "Canada"},
        { valid: true, checked: false, content: "Russia"},
        { valid: false, checked: false, content: "China"},
      ]
    },
    {
      id: 8,
      category: 'Geography',
      content: 'What is the capital of US? ',
      answers: [
        { valid: false, checked: false, content: "New York" },
        { valid: true, checked: false, content: "Washington"},
        { valid: false, checked: false, content: "LA"},
        { valid: false, checked: false, content: "Chicago"},
      ]
    },
    {
      id: 9,
      category: 'Geography',
      content: 'How many states has USA ',
      answers: [
        { valid: true, checked: false, content: "50" },
        { valid: false, checked: false, content: "60"},
        { valid: false, checked: false, content: "40"},
        { valid: false, checked: false, content: "30"},
      ]
    },
    {
      id: 10,
      category: 'Geography',
      content: 'What is capital of England ',
      answers: [
        { valid: true, checked: false, content: "London" },
        { valid: false, checked: false, content: "Liverpool"},
        { valid: false, checked: false, content: "Manchester"},
        { valid: false, checked: false, content: "Leeds"},
      ]
    },
    {
      id: 11,
      category: 'Geography',
      content: 'How many desserts are in Europe ',
      answers: [
        { valid: true, checked: false, content: "1" },
        { valid: false, checked: false, content: "0"},
        { valid: false, checked: false, content: "10"},
        { valid: false, checked: false, content: "30"},
      ]
    },
  ],
  selectedQuestions: []
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
  finish
} = slice.actions;

export const getQuizCategories = state => state.quiz.categories;
export const getQuizQuestions = state => state.quiz.questions;
export const getActiveQuestionNumber = state => state.quiz.activeQuestion;
export const getCurrentCategory = state => state.quiz.selectedCategory;
export const getSelectedQuestions = state => state.quiz.selectedQuestions;

export default slice.reducer;