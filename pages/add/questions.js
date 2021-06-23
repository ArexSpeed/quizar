import { useState ,useRef } from 'react';
import { useRouter } from 'next/router';

const AddQuestions = () => {
  //const [questions, setQuestions] = useState([]);
  const router = useRouter();
  const categoryName = router.query.category;
  const [formProcessing, setFormProcessing] = useState(false);
  const [error, setError] = useState();
  const addQuestionForm = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(addQuestionForm.current);
    const payload = {
      category: categoryName,
      content: form.get('content'),
      correctAnswer: form.get('correctAnswer'),
      answer2: form.get('answer2'),
      answer3: form.get('answer3'),
      answer4: form.get('answer4')
    };

    const response = await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setFormProcessing(false);
      router.push('/add/category');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  };


  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
     <form className="w-full flex flex-col justify-start items-center" onSubmit={handleSubmit} ref={addQuestionForm}>
        <div className="w-full h-24 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <textarea className="p-2 text-xl w-full h-full overflow-x-hidden" type="text" id="content" name="content" placeholder="Question" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="correctAnswer" name="correctAnswer" placeholder="Correct Answer" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="answer2" name="answer2" placeholder="Answer 2" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="answer3" name="answer3" placeholder="Answer 3" required />
        </div>
        <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
          <input className="px-2 text-xl w-full h-full" type="text" id="answer4" name="answer4" placeholder="Answer 4" required />
        </div>
        <button type="submit" className="w-1/2 h-20 my-2 flex flex-row justify-between items-center bg-green-100 rounded-md">
          <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-green-200">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
            </div>
          <span className="px-2">Add Question to {categoryName}</span>
        </button>
    </form>
    {error && <div className="w-full h-12 my-2 text-center text-md bg-red-500 text-white flex flex-row justify-start items-center shadow-md rounded-md">{error}</div>}
     
    
  </div>
  )
}

export default AddQuestions;
