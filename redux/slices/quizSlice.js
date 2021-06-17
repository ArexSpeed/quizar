import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['Maths', 'Programming'],
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
    finish: state => {
      let points = 0;

      state.questions.forEach(q => {
        points += q.answers.filter(a => a.checked === true && a.valid === true).length
      })

      state.result = points;
      
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