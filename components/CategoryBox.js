import { useState, useEffect } from 'react';
import Link from 'next/link';

const CategoryBox = ({ category }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    await fetch(`/api/questions?category=${category.name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setQuestions(data));
  }, [category]) 
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
            {questions?.length} questions
          </h6>
        </div>
        <Link href={`/add/questions?category=${category.name}`}>
          <button className="mr-2 focus:outline-none text-sm">
            Add Question
          </button>
        </Link> 
      </div>
  )
}

export default CategoryBox
