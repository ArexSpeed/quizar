import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/client';
import { getUser } from 'redux/slices/userSlice';

const Header = () => {
  const [session] = useSession();
  const user = useSelector(getUser);
  return (
    <header className="relative flex flex-col justify-center items-center w-full h-1/3 mx-2 rounded-big bg-gradient-to-r from-blue-400 to-purple-500">
    {session ? (
      <>
      <div className="flex justify-center items-center rounded-full w-24 h-24 bg-white">
        <div className="w-22 h-22 rounded-full overflow-hidden flex justify-center">
          {session.user.image ? (
            <img className="object-cover" src={session.user.image} alt="" />
            )
            :
            (
              <div className="w-22 h-22 rounded-full bg-blue-400 flex justify-center items-center">
                <span className="text-5xl text-blue-700">{session.user.name.substr(0,1).toUpperCase()}</span>
              </div>
            )
        
        }
          
        </div>
        </div>
        <div className="text-white font-semibold text-2xl py-2">{user.username}</div>
        <div className="flex flex-row w-full justify-center items-center">
          <button className="flex justify-center items-center w-auto h-6 p-2 m-2 rounded-full text-center bg-white bg-opacity-25 text-white font-semibold text-sm">
            3 level
          </button>
          <button onClick={signOut} className="flex justify-center items-center w-auto h-6 p-2 m-2 rounded-full text-center bg-white bg-opacity-25 text-white font-semibold text-sm">
            Logout
          </button>
        </div>
      </>
    )
  : (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="text-white font-semibold text-md py-2">You are not logged</div>
      <div className="flex flex-row justify-center items-center w-full">
        <Link href="/login">
          <button className="flex justify-center items-center m-auto h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-blue-400 rounded-md">Login</button>
        </Link>
        <Link href="/register">
          <button className="flex justify-center items-center m-auto h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-blue-400 rounded-md">Register</button>
        </Link>
      </div>
    </div>
  )}

  </header>
  )
}

export default Header
