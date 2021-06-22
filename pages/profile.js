import { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getUser } from 'redux/slices/userSlice';
import { useSession } from 'next-auth/client';
import Nav from 'components/Nav';
import Header from 'components/Header';

const Profile = () => {
  const user = useSelector(getUser);
  const [session, loading] = useSession();
  const editForm = useRef();
  const [error, setError] = useState();
  const [createInfo, setCreateInfo] = useState();
  const [changePassword, setChangePassword] = useState(false);
  const [formProcessing, setFormProcessing] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");

  const handleImagePreview = (e) => {
    const url = window.URL.createObjectURL(e.target.files[0]);

    setImagePreviewUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(editForm.current);

    const payload = {
      name: form.get('name'),
      email: form.get('email'),
    };

    // if (form.get('image')) {
    //   const picture = form.get('image');
    //   const file = await uploadImage(picture);
    //   payload.imageUrl = file.secure_url;
    // }

    if (form.get('password')) {
      payload.password = form.get('password');
      if(payload.password.length < 6) {
        setError('Password is too short. Min. 6 characters');
        setFormProcessing(false);
        return;
      }
  
      if (payload.password !== form.get('passwordConfirm')) {
        setError('Given passwords not match');
        setFormProcessing(false);
        return;
      }
    }

    const response = await fetch(`/api/users?id=${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setError('Data is changed');
    } else {
      const payload = await response.json();
      setFormProcessing(false);
      setError(payload.error?.details[0]?.message);
    }


  }
  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
      <Nav />
      <Header />
      <main className="flex flex-col justify-center items-start p-4 w-full mb-24">
        <h2 className="font-semibold text-2xl w-full text-center">Change your account data</h2>
        <form className="flex flex-col justify-center items-start p-4 w-full" onSubmit={handleSubmit} ref={editForm}>
          {imagePreviewUrl && (
              <div className="w-22 h-22 rounded-full overflow-hidden flex justify-center">
                <img className="object-cover" src={imagePreviewUrl} alt="" />
              </div>
            )}
          {/* <div className="w-22 h-22 rounded-full overflow-hidden flex justify-center">
            <img className="object-cover" src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
          </div> */}
            <input type="file" id="image" name="image" onChange={handleImagePreview} />
          <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
            <input className="px-2 text-xl w-full h-full" type="name" id="name" name="name" placeholder="Name" defaultValue={session.user.name} required />
          </div>
          <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
            <input className="px-2 text-xl w-full h-full" type="email" id="email" name="email" placeholder="Email" defaultValue={session.user.email} required />
          </div>
          <div>
            <button type="button" className="flex flex-row" onClick={() => setChangePassword(!changePassword)}>
              <span>Password</span> <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button> 
          </div>
          {changePassword && (
            <>
              <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
              <input className="px-2 text-xl w-full h-full" type="password" id="password" name="password" placeholder="Password" required={changePassword ? true : false} />
              </div>
              <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
                <input className="px-2 text-xl w-full h-full" type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password" required={changePassword ? true : false} />
              </div>
            </>
          )}
          
          <button type="submit"  className="flex justify-center items-center m-auto h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-red-500 rounded-md" type="submit" disabled={formProcessing}>
            {formProcessing ? 'Creating...' : 'Change'}
          </button>
          {error && <div className="w-full h-12 my-2 text-center text-md bg-red-500 text-white flex flex-row justify-start items-center shadow-md rounded-md">Account not created {error}</div>}
          {createInfo && <p>{createInfo}</p>}
        </form>
      </main>

    </div>
  )
}

export default Profile
