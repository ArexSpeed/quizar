import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Nav = () => {
  const [activeNav, setActiveNav] = useState('');
  const router = useRouter();
  const path = router.pathname;
  return (
    <div className="fixed bottom-0 inset-x-0 z-10 w-full h-20 px-4 mx-auto mb-2 shadow:md md:max-w-screen-md">
    <nav className="w-full h-20 bg-white backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-md rounded-xl">
      <ul className="flex flex-row justify-between items-center">
        <Link href="/">
          <li 
            className="relative w-full h-20 flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => setActiveNav('/')}
            onTouchMoveCapture={() => setActiveNav('/')}
            onMouseLeave={() => setActiveNav('')}
          >
            <svg className={`w-6 h-6 text-gray-700 ${(activeNav || path) === '/' && 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <h5 className={`${(activeNav || path) === '/' ? 'block' : 'hidden'} text-purple-500 font-semibold`}>Home</h5>
          </li>
        </Link>
        <Link href="/stats">
          <li 
            className="relative w-full h-20 flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => setActiveNav('/stats')}
            onTouchMoveCapture={() => setActiveNav('/stats')}
            onMouseLeave={() => setActiveNav('')}
          >
            <svg className={`w-6 h-6 text-gray-700 ${(activeNav || path) === '/stats' && 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
            <h5 className={`${(activeNav || path) === '/stats' ? 'block' : 'hidden'} text-purple-500 font-semibold`}>Stats</h5>
          </li>
        </Link>
        <Link href="/profile">
          <li 
            className="relative w-full h-20 flex flex-col justify-center items-center cursor-pointer"
            onMouseEnter={() => setActiveNav('/profile')}
            onTouchMoveCapture={() => setActiveNav('/profile')}
            onMouseLeave={() => setActiveNav('')}
          >
            <svg className={`w-6 h-6 text-gray-700 ${(activeNav || path) === '/profile' && 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
            <h5 className={`${(activeNav || path) === '/profile' ? 'block' : 'hidden'} text-purple-500 font-semibold`}>Profile</h5>
          </li>
        </Link>
      </ul>
    </nav>
    </div>
  )
}

export default Nav
