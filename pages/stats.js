import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizCategoriesApi, fetchUserResults, getUserResults, getStorageResults } from 'redux/slices/quizSlice';
import axios from 'axios';
import Nav from 'components/Nav';
import Header from 'components/Header';
import QuizStats from 'components/QuizStats';

const StatsPage = () => {
  const [session] = useSession();
  const dispatch = useDispatch();
  const categoriesApi = useSelector(getQuizCategoriesApi);
  const userResults = useSelector(getUserResults);
  const storageResults = useSelector(getStorageResults);

  useEffect(async () => {
    if(session) {
      const data = await axios.get(`http://localhost:3000/api/results?user=${session.user.name}`)
      dispatch(fetchUserResults(data));
    }
  }, [session])


   //Avg score calculate
   const calculateAvgScore = session ? userResults[0]?.reduce((acc, item) => acc + item.result, 0) : storageResults?.reduce((acc, item) => acc + item.result, 0);
   const resultsDivision = session ? userResults[0]?.length : storageResults?.length;
 
   const filterFinishedQuizes = () => {
     const categoryArray = []
     if(session){
       userResults[0]?.forEach(result => categoryArray.push(result.category));
     } else{
       storageResults?.forEach(result => categoryArray.push(result.category));
     }
     let uniqueCategory = [...new Set(categoryArray)];
     return uniqueCategory.length;
   }

  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
      <Nav />
      <Header />
      <main className="flex flex-col justify-center items-start p-4 w-full">
        <section className="flex flex-col w-full justify-center items-start overflow-x-scroll">
          <h4 className="text-sm text-gray-400 uppercase my-4">Your data</h4>
          <div className="flex flex-row">
            <div className="flex flex-col justify-around p-2 mx-2 w-32 h-32 rounded-lg shadow-xl bg-white">
              <div>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              </div>
              <div className="text-2xl font-semibold">
                {filterFinishedQuizes()}/{categoriesApi[0]?.length}
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Finished quiz
              </div>
            </div>
            <div className="flex flex-col justify-around p-2 mx-2 w-32 h-32 rounded-lg shadow-xl bg-white">
              <div>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
              </div>
              <div className="text-2xl font-semibold">
                {(calculateAvgScore/resultsDivision).toFixed(2)}%
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Avg score
              </div>
            </div>
          </div>
        </section>
        {/* Quiz section */}
        <section className="flex flex-col justify-center items-start w-full mb-24">
          <h4 className="text-sm text-gray-400 uppercase my-4">Quiz Stats</h4>

          {categoriesApi[0]?.map(category => (
            <QuizStats key={category._id} category={category} session={session} />
          ))}
        </section>
      </main>
      </div>
  )
}

export default StatsPage
