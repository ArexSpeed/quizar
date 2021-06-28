import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserResults, getQuestionsFromApi, selectCategory, getStorageResults } from 'redux/slices/quizSlice';
import axios from 'axios';
import Link from 'next/link';


const QuizBox = ({ category, session }) => {
  const [resultNumber, setResultNumber] = useState([]);
  const userResults = useSelector(getUserResults);
  const storageResults = useSelector(getStorageResults);

  const dispatch = useDispatch();
  useEffect(() => {
      setResultNumber([]);
      if(session){
        userResults[0]?.filter(result => result.category === category.name && setResultNumber(prev => [...prev,result.result]));
      } else {
        storageResults?.filter(result => result.category === category.name && setResultNumber(prev => [...prev,result.result]));
      }
  }, [userResults, storageResults]);

  const sortResult = () => {
    resultNumber.sort((a,b) => b-a);
    return resultNumber[0];
  }

  const chooseQuiz = async (category) => {
   const data = await axios.get(`/api/questions?category=${category}`);

    dispatch(selectCategory(category));
    dispatch(getQuestionsFromApi(data));
  }



  return (
    <div className="w-full h-20 my-2 flex flex-row justify-between items-center bg-green-100 rounded-md">
      <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-green-200">
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col flex-1 justify-start items-start">
        <h4 className="font-semibold text-md">{category.name}</h4>
        <h6 className="text-xs text-black text-opacity-50">
          {sortResult()}%
        </h6>
        <div className="relative pt-1 w-full">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              style={{ width: `${resultNumber[0]}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
            ></div>
          </div>
        </div>
      </div>
      <Link href={`/quiz`}>
        <button
          onClick={() => chooseQuiz(category.name)}
          className="px-2 mx-2 focus:outline-none"
        >
          <svg
            className="w-6 h-6 opacity-40"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default QuizBox;
