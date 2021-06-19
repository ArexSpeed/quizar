import 'tailwindcss/tailwind.css';
import 'styles/globals.css';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { fetchCategories, fetchQuestions } from 'redux/slices/quizSlice';

store.dispatch(fetchCategories());
//store.dispatch(fetchQuestions());

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
