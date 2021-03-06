import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserResults, getStorageResults } from 'redux/slices/quizSlice';

const QuizStats = ({ category, session }) => {
  const [categoryResults, setCategoryResults] = useState([])
  const userResults = useSelector(getUserResults);
  const storageResults = useSelector(getStorageResults);

  useEffect(() => {
      setCategoryResults([]);
      if(session){
        userResults[0]?.filter(result => result.category === category.name && setCategoryResults(prev => [...prev,result]));
      } else {
        storageResults?.filter(result => result.category === category.name && setCategoryResults(prev => [...prev,result]));
      }
  }, [userResults, storageResults]);

  const showCategoryResults = categoryResults.map((result, i) => (
    <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-3 text-left whitespace-nowrap ">{i+1}</td>
      <td>{result.date ? result.date.substr(0,10) : 'No data'}</td>
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
        <td>Date</td>
        <td>Score</td>
      </tr>
      <tbody className="text-gray-600 bg-white text-sm font-light rounded-b">
        {showCategoryResults}
      </tbody>
    </table>
  )
}

export default QuizStats
