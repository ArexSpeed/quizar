import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/slices/userSlice';
import { getQuizCategoriesApi, filterQuestions, getQuizCategories, fetchUserResults, getUserResults } from 'redux/slices/quizSlice';
import axios from 'axios';
import QuizBox from 'components/QuizBox';

export default function Home() {
  const [activeNav, setActiveNav] = useState('')
  const [finishedQuiz, setFinishedQuiz] = useState(0);
  const router = useRouter();
  const path = router.pathname;
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const categories = useSelector(getQuizCategories);
  const categoriesApi = useSelector(getQuizCategoriesApi);
  const userResults = useSelector(getUserResults);

  useEffect(() => {
    setFinishedQuiz(0);
    categories.filter(category => category.finished && setFinishedQuiz(finishedQuiz+1));
  }, [categories])

  useEffect(async () => {
    const data = await axios.get(`http://localhost:3000/api/results?user=Tanja`)
    dispatch(fetchUserResults(data));
  }, [])

  const calculateAvgScore = userResults[0]?.reduce((acc, item) => acc + item.result, 0);

  return (
    <>
      <Head>
        <title>Quizar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
      <div className="fixed bottom-0 inset-x-0 z-10 w-full h-20 px-4 mx-auto mb-2 shadow:md md:max-w-screen-md">
      <nav className="w-full h-20 bg-white backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-md rounded-xl">
        <ul className="flex flex-row justify-between items-center">
          <li 
            className="relative w-full h-20 flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => setActiveNav('/')}
            onTouchMoveCapture={() => setActiveNav('/')}
            onMouseLeave={() => setActiveNav('')}
          >
            <svg className={`w-6 h-6 text-gray-700 ${(activeNav || path) === '/' && 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <h5 className={`${(activeNav || path) === '/' ? 'block' : 'hidden'} text-purple-500 font-semibold`}>Home</h5>
          </li>
          <li 
            className="relative w-full h-20 flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => setActiveNav('/stats')}
            onTouchMoveCapture={() => setActiveNav('/stats')}
            onMouseLeave={() => setActiveNav('')}
          >
            <svg className={`w-6 h-6 text-gray-700 ${(activeNav || path) === '/stats' && 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
            <h5 className={`${(activeNav || path) === '/stats' ? 'block' : 'hidden'} text-purple-500 font-semibold`}>Stats</h5>
          </li>
          <li 
            className="relative w-full h-20 flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => setActiveNav('/profile')}
            onTouchMoveCapture={() => setActiveNav('/profile')}
            onMouseLeave={() => setActiveNav('')}
          >
            <svg className={`w-6 h-6 text-gray-700 ${(activeNav || path) === '/profile' && 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
            <h5 className={`${(activeNav || path) === '/profile' ? 'block' : 'hidden'} text-purple-500 font-semibold`}>Profile</h5>
          </li>
        </ul>
      </nav>
      </div>
      <header className="relative flex flex-col justify-center items-center w-full h-1/3 mx-2 rounded-big bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="flex justify-center items-center rounded-full w-24 h-24 bg-white">
        <div className="w-22 h-22 rounded-full overflow-hidden flex justify-center">
            <img className="object-cover" src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
          </div>
        </div>
        <div className="text-white font-semibold text-2xl py-2">{user.username}</div>
        <div className="flex flex-row w-full justify-center items-center">
          <button className="flex justify-center items-center w-auto h-6 p-2 m-2 rounded-full text-center bg-white bg-opacity-25 text-white font-semibold text-sm">
            20 years
          </button>
          <button className="flex justify-center items-center w-auto h-6 p-2 m-2 rounded-full text-center bg-white bg-opacity-25 text-white font-semibold text-sm">
            3 lvl
          </button>
        </div>
      </header>
      <main className="flex flex-col justify-center items-start p-4 w-full">
        <section className="flex flex-col w-full justify-center items-start overflow-x-scroll">
          <h4 className="text-sm text-gray-400 uppercase my-4">Your data</h4>
          <div className="flex flex-row">
            <div className="flex flex-col justify-around p-2 mx-2 w-32 h-32 rounded-lg shadow-xl bg-white">
              <div>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              </div>
              <div className="text-2xl font-semibold">
                {userResults[0]?.length}/{categories.length}
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Finished quiz
              </div>
            </div>
            <div className="flex flex-col justify-around p-2 mx-2 w-32 h-32 rounded-lg shadow-xl bg-white">
              <div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="text-2xl font-semibold">
                35 min
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Avg time
              </div>
            </div>
            <div className="flex flex-col justify-around p-2 mx-2 w-32 h-32 rounded-lg shadow-xl bg-white">
              <div>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
              </div>
              <div className="text-2xl font-semibold">
                {(calculateAvgScore/userResults[0]?.length).toFixed(2)}%
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Avg score
              </div>
            </div>
          </div>
        </section>
        {/* Quiz section */}
        <section className="flex flex-col justify-center items-start w-full mb-24">
          <h4 className="text-sm text-gray-400 uppercase my-4">Quizes</h4>
          {categoriesApi[0]?.map(category => (
            <QuizBox key={category._id} category={category} />
          ))}
        </section>
      </main>
      </div>
    </>
  )
}
