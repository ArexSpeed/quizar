import React from 'react';
import { useRouter } from 'next/router';

const AddQuestions = () => {
  //const [questions, setQuestions] = useState([]);
  const router = useRouter();
  const categoryName = router.query.category;

  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
     <form className="w-full flex flex-col justify-start items-center">
        <div className="w-full h-24 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <textarea className="p-2 text-xl w-full h-full overflow-x-hidden" type="text" id="content" name="content" placeholder="Question" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="correctAnswer" name="correctAnswer" placeholder="Correct Answer" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="Answer2" name="Answer2" placeholder="Answer 2" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="Answer3" name="Answer3" placeholder="Answer 3" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="Answer4" name="Answer4" placeholder="Answer 4" required />
        </div>
    </form>
     <button type="submit" className="w-1/2 h-20 my-2 flex flex-row justify-between items-center bg-green-100 rounded-md">
      <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-green-200">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </div>
      <span className="px-2">Add Question to {categoryName}</span>
     </button>
    
  </div>
  )
}

export default AddQuestions;
