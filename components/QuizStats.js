import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserResults, getQuestionsFromApi, selectCategory } from 'redux/slices/quizSlice';
import axios from 'axios';
import Link from 'next/link';

const QuizStats = ({ category }) => {
  const [categoryResults, setCategoryResults] = useState([])
  const userResults = useSelector(getUserResults);
  console.log(userResults, 'results in stats');
  useEffect(() => {
    console.log('useEffect');
      setCategoryResults([]);
      userResults[0]?.filter(result => result.category === category.name && setCategoryResults(prev => [...prev,result]));
  }, [userResults]);
  console.log(categoryResults, 'cagtegory Results');

  const showCategoryResults = categoryResults.map((result, i) => (
    <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-3 text-left whitespace-nowrap ">{i+1}</td>
      <td>25.06.2020</td>
      <td className={`${result.result < 26 ? 'text-red-400' : result.result < 51 ? 'text-yellow-200' : result.result < 76 ? 'text-blue-400' : result.result >= 76 ? 'text-green-400' : 'text-gray-600'}`}>{result.result}</td>
    </tr>
  ))
  return (
    <table className="min-w-max w-full table-auto my-2 bg-white rounded-xl shadow-sm">
      <tr>
        <td>Category:</td>
        <td>{category.name}</td>
      </tr>
      <tr className="bg-gray-200 text-gray-400 uppercase text-sm leading-normal">
        <td>Try</td>
        <td>Data</td>
        <td>Score</td>
      </tr>
      <tbody className="text-gray-600 bg-white text-sm font-light rounded-b">
        {showCategoryResults}
      </tbody>
    </table>
  )
}

export default QuizStats
