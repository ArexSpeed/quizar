import 'tailwindcss/tailwind.css';
import 'styles/globals.css';
import { Provider as SessionProvider } from 'next-auth/client';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { fetchCategories } from 'redux/slices/quizSlice';

store.dispatch(fetchCategories());

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
