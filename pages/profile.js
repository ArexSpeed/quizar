import { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getUser } from 'redux/slices/userSlice';
import { useSession } from 'next-auth/client';
import Nav from 'components/Nav';
import Header from 'components/Header';

const Profile = () => {
  const user = useSelector(getUser);
  const [session, loading] = useSession();
  const registerForm = useRef();
  const [error, setError] = useState();
  const [createInfo, setCreateInfo] = useState();
  const [formProcessing, setFormProcessing] = useState(false);

  const handleSubmit = () => {
    console.log('Submit')
  }
  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
      <Nav />
      <Header />
      <main className="flex flex-col justify-center items-start p-4 w-full mb-24">
        <h2 className="font-semibold text-2xl w-full text-center">Change your account data</h2>
        <form className="flex flex-col justify-center items-start p-4 w-full" onSubmit={handleSubmit} ref={registerForm}>
          
          <div className="w-22 h-22 rounded-full overflow-hidden flex justify-center">
            <img className="object-cover" src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
          </div>
            <input type="file" id="image" name="image" />
          <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
            <input className="px-2 text-xl w-full h-full" type="name" id="name" name="name" placeholder="Name" value={session.user.name} required />
          </div>
          <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
            <input className="px-2 text-xl w-full h-full" type="email" id="email" name="email" placeholder="Email" value={session.user.email} required />
          </div>
          <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
            <input className="px-2 text-xl w-full h-full" type="password" id="password" name="password" placeholder="Password (fill new if you want to change)" required />
          </div>
          <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
            <input className="px-2 text-xl w-full h-full" type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password" required />
          </div>
          <button  className="flex justify-center items-center m-auto h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-red-500 rounded-md" type="submit" disabled={formProcessing}>
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
