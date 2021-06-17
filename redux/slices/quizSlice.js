import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['Maths', 'Programming'],
  activeQuestion: 0,
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
        { valid: true, checked: false, content: "40"},
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
  ]
}

export const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    next: state => {
      state.activeQuestion += 1;
    },
    prev: state => {
      state.activeQuestion -= 1;
    },
  }
});

export const {
  start,
  next,
} = slice.actions;

export const selectQuizCategories = state => state.quiz.categories;
export const selectQuizQuestions = state => state.quiz.questions;

export default slice.reducer;