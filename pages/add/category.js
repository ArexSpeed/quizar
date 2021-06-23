import {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import CategoryBox from 'components/CategoryBox';

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
        <CategoryBox key={category._id} category={category} />
      ))}
    </div>
  
  </div>
  )
}

export default Category
