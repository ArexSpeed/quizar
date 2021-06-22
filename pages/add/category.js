import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';

const Category = () => {
  const [categories, setCategories] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const [error, setError] = useState();
  const [info, setInfo] = useState();
  const [newCategoryName, setNewCategoryName] = useState('');
  const addCategoryForm = useRef();
  const router = useRouter();

  useEffect(async () => {
    const data = await fetch('/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setCategories(data));

  }, []);
  console.log(categories, 'categories');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(addCategoryForm.current);
    const payload = {
      name: form.get('categoryName'),
    };


    const response = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setFormProcessing(false);
      setInfo(`Category ${payload.name} is added`);
      setNewCategoryName('');
      router.push('/add/category');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
     <form className="w-full min-h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md" ref={addCategoryForm} onSubmit={handleSubmit}>
        <input className="px-2 text-xl w-full h-full" type='text' name="categoryName" id="categoryName" placeholder="Add category name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
      </form>
      {info && <div className="w-full h-12 my-2 text-center text-md bg-green-500 text-white flex flex-row justify-start items-center shadow-md rounded-md">{info}</div>}

      {error && <div className="w-full h-12 my-2 text-center text-md bg-red-500 text-white flex flex-row justify-start items-center shadow-md rounded-md">{error}</div>}
    
    <div className="flex flex-col justify-center items-start w-full mb-24">
      {categories?.map(category =>(
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
            10 questions
          </h6>
        </div>
      </div>
      ))}
    </div>
  
  </div>
  )
}

export default Category
