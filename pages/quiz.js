import { useState } from 'react'

const QuizPage = () => {
  const [answer, setAnswer] = useState('');
  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-y-auto"> 
      <section className="flex flex-row justify-center items-center w-full h-4 my-4 p-4 rounded-full bg-white shadow-sm">
        <div className="relative pt-1 w-full">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
            <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"></div>
          </div>
        </div>
        <div className="mx-2 text-sm">
          2/8
        </div>
      </section>
      <section className="w-full my-6 px-4">
        <h2 className="font-semibold text-2xl">
          This is question about something what you should answer?
        </h2>
      </section>
      <section className="flex flex-col pt-10 justify-center items-start w-full">
        <article 
          className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer === 'A' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
          onClick={() => setAnswer('A')}
        >
          <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
            <span className={`${answer === 'A' ? 'text-white' : 'text-blue-400'}`}>A</span>
          </div>
          <h3 className={`font-semibold text-2xl ${answer === 'A' ? 'text-white' : 'text-gray-800'}`}>Answer 1</h3>
        </article>
        <article 
          className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer === 'B' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
          onClick={() => setAnswer('B')}
        >
          <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
            <span className={`${answer === 'B' ? 'text-white' : 'text-blue-400'}`}>B</span>
          </div>
          <h3 className={`font-semibold text-2xl ${answer === 'B' ? 'text-white' : 'text-gray-800'}`}>Answer 2</h3>
        </article>
        <article 
          className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer === 'C' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
          onClick={() => setAnswer('C')}
        >
          <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
            <span className={`${answer === 'C' ? 'text-white' : 'text-blue-400'}`}>C</span>
          </div>
          <h3 className={`font-semibold text-2xl ${answer === 'C' ? 'text-white' : 'text-gray-800'}`}>Answer 3</h3>
        </article>
        <article 
          className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer === 'D' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
          onClick={() => setAnswer('D')}
        >
          <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
            <span className={`${answer === 'D' ? 'text-white' : 'text-blue-400'}`}>D</span>
          </div>
          <h3 className={`font-semibold text-2xl ${answer === 'D' ? 'text-white' : 'text-gray-800'}`}>Answer 4</h3>
        </article>
      </section>
      <button className="flex justify-center items-center h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-red-500 rounded-md">
        Next
      </button>
    </div>
  )
}

export default QuizPage;
