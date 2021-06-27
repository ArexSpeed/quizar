import { useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

const Login = () => {
  const [session, loading] = useSession();
  const loginForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  if (session) {
    router.push('/');
  }
  console.log(session, 'session');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formProcessing) return;
    setError(null);
    setFormProcessing(true);
    const form = new FormData(loginForm.current);
    const { ok } = await signIn('credentials', {
      redirect: false,
      email: form.get('email'),
      password: form.get('password')
    });

    if (ok) {
      router.push('/');
    } else {
      setError('Wrong password or login');
      setFormProcessing(false);
    }
  };

  return (
      !session && !loading&& (
      <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto">
        <header className="relative flex flex-col justify-center items-center w-full h-1/3 mx-2 rounded-big bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="text-white font-semibold text-2xl py-2">Login to account</div>
        </header>
      <form className="flex flex-col justify-center items-start p-4 w-full" onSubmit={handleSubmit} ref={loginForm}>
            <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
              <input className="px-2 text-xl w-full h-full" type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full h-16 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md">
              <input className="px-2 text-xl w-full h-full" type="password" id="password" name="password" placeholder="Password" required />
            </div>

            <button  className="flex justify-center items-center m-auto h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-red-500 rounded-md" type="submit" disabled={formProcessing}>
              {formProcessing ? 'Process...' : 'Login'}
            </button>
            {error && <div className="w-full h-12 my-2 text-center text-md bg-red-500 text-white flex flex-row justify-center items-center shadow-md rounded-md">{error}</div>}
            <p className="flex flex-row justify-center items-center">
              You don't have an account? 
              <Link href="/register">
                <button className="flex justify-center items-center w-auto h-6 p-2 m-2 rounded-full text-center bg-blue-400 text-white font-semibold text-sm">
                  Register
                </button>
              </Link>
            </p>
          </form>
      </div>
  )
  )
};

export default Login
