import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/slices/userSlice';
import { next, reset, getActiveQuestionNumber, getCurrentCategory, getQuizQuestionsApi, saveToStorage } from 'redux/slices/quizSlice';
import styled, { keyframes } from "styled-components";
import CountUp from 'react-countup';
import Confetti from 'react-confetti'
import axios from 'axios';

const QuizPage = () => {
  const [session] = useSession();
  const [answer, setAnswer] = useState({variant: '', correct: false});
  const [randomAnswer, setRandomAnswer] = useState([3,2,0,1]); //mix answers array 
  const [points, setPoints] = useState(0);
  const [summary, setSummary] = useState(false);
  const questionsApi = useSelector(getQuizQuestionsApi);
  const questionNumber = useSelector(getActiveQuestionNumber);
  const category = useSelector(getCurrentCategory);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const questions = questionsApi[0];

  const randomArrays = () => {
    const array = [0,1,2,3];
    const newArray = [];

    for (let i = 0; i<4; i++) {
      const random = Math.floor(Math.random()*array.length);
      newArray.push(array[random])
      array.splice(random, 1)
      
    }
    return newArray;
  }

  const nextQuestion = () => {
    if(questions[questionNumber + 1]) {
      dispatch(next());
      answer.correct && setPoints(points+1);
      const randomNumbers = randomArrays();
      setRandomAnswer(randomNumbers);
      console.log(randomAnswer, 'random answer');
      setAnswer({
        variant: '',
        correct: false
      });
    } else {
      answer.correct && setPoints(points+1)
      setAnswer({
        variant: '',
        correct: false
      });
      setSummary(true);
    }
  }

  const handleReset = () => {
    dispatch(reset());
    setAnswer({
      variant: '',
      correct: false
    });
    setPoints(0);
    setSummary(false);
  }

  const handleFinish = async () => {
    const result = Math.ceil((points/questions.length)*100);
    let payload = {
      user: user.username,
      category: category,
      result,
      date: new Date().toISOString()
    }
    console.log(payload, 'payload in handleFInish');
    if(session){
      await axios.post("http://localhost:3000/api/results", payload)
    } else {
      dispatch(saveToStorage({
        category: payload.category,
        result: payload.result,
        date: payload.date
      }))
    }

    handleReset();
  }

  // Style for animation range in result
  const range = keyframes`
    from {
      width: 0%;
    }
    to {
      width: ${Math.ceil((points/questions?.length)*100)}%;
    }
  `;

  const Range = styled.div`
    width: 0%;
    animation: ${range} 2s linear forwards;
  `;

  return (
    <div className="relative flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md p-2 bg-gray-100 overflow-x-hidden overflow-y-auto"> 
      {!summary ? (
      <>
        <section className="flex flex-row justify-start items-center w-full h-4 my-4 p-4">
          <Link href="/">
            <button 
              className="px-2 mr-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200 focus:outline-none"
              onClick={handleReset} 
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
          </Link>
          <div className="flex flex-row justify-center items-center w-full h-4 my-4 p-4 rounded-full bg-white shadow-sm">
            <div className="relative pt-1 w-full">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                <div style={{ width: `${Math.ceil(((questionNumber+1)/questions?.length)*100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"></div>
              </div>
            </div>
            <div className="mx-2 text-sm">
              {questionNumber+1}/{questions?.length}
            </div>
          </div>
        </section>
        <section className="w-full my-6 px-4">
          <h2 className="font-semibold text-2xl">
            {questions[questionNumber].content}
          </h2>
        </section>
        <section className="flex flex-col pt-10 justify-center items-start w-full">
          <article 
            className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer.variant === 'A' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
            onClick={() => {
              setAnswer({
                variant: 'A',
                correct: questions[questionNumber].answers[randomAnswer[0]].valid
              });
            }}
          >
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
              <span className={`${answer === 'A' ? 'text-white' : 'text-blue-400'}`}>A</span>
            </div>
            <h3 className={`font-semibold text-2xl ${answer === 'A' ? 'text-white' : 'text-gray-800'}`}>{questions[questionNumber].answers[randomAnswer[0]].content}</h3>
          </article>
          <article 
            className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer.variant === 'B' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
            onClick={() => {
              setAnswer({
                variant: 'B',
                correct: questions[questionNumber].answers[randomAnswer[1]].valid
              });
            }}
          >
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
              <span className={`${answer === 'B' ? 'text-white' : 'text-blue-400'}`}>B</span>
            </div>
            <h3 className={`font-semibold text-2xl ${answer === 'B' ? 'text-white' : 'text-gray-800'}`}>{questions[questionNumber].answers[randomAnswer[1]].content}</h3>
          </article>
          <article 
            className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer.variant === 'C' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
            onClick={() => {
              setAnswer({
                variant: 'C',
                correct: questions[questionNumber].answers[randomAnswer[2]].valid
              });
            }}
          >
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
              <span className={`${answer === 'C' ? 'text-white' : 'text-blue-400'}`}>C</span>
            </div>
            <h3 className={`font-semibold text-2xl ${answer === 'C' ? 'text-white' : 'text-gray-800'}`}>{questions[questionNumber].answers[randomAnswer[2]].content}</h3>
          </article>
          <article 
            className={`w-full h-20 my-2 flex flex-row justify-start items-center bg-white shadow-md rounded-md ${answer.variant === 'D' && 'bg-gradient-to-r from-blue-400 to-red-500'}`}
            onClick={() => {
              setAnswer({
                variant: 'D',
                correct: questions[questionNumber].answers[randomAnswer[3]].valid
              });
            }}
          >
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-blue-200">
              <span className={`${answer === 'D' ? 'text-white' : 'text-blue-400'}`}>D</span>
            </div>
            <h3 className={`font-semibold text-2xl ${answer === 'D' ? 'text-white' : 'text-gray-800'}`}>{questions[questionNumber].answers[randomAnswer[3]].content}</h3>
          </article>
        </section>
        <button 
          className="flex justify-center items-center h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-red-500 rounded-md"
          onClick={nextQuestion}
        >
          Next
        </button>
      </>
      )
    :
    (
      <div className="flex flex-col justify-between items-center w-full h-screen overflow-hidden">
        <Confetti />
        <h2 className="text-xl font-semibold">Finished !!</h2>
        <section className="flex flex-col w-full text-center my-6 px-4 mx-auto">
          <h3 className="font-semibold text-xl my-4">
            Category: {category}
          </h3>
          <h2 className="font-semibold text-2xl">
            Your result <CountUp end={Math.ceil((points/questions.length)*100)} duration={2} />%
          </h2>
          <div className="relative w-full my-4 p-4">
            <div className="overflow-hidden w-full h-4 text-xs flex rounded-full bg-blue-200">
              <Range className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400" />
            </div>
          </div>
        </section>
        <Link href="/">
          <button 
            className="flex justify-center items-center h-16 w-32 px-6 my-6 text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-red-500 rounded-md"
            onClick={handleFinish}
          >
            Finish
          </button>
        </Link>
      </div>
    )}
    </div>
  )
}

export default QuizPage;

//style={{ width: `${Math.ceil((points/questions.length)*100)}%` }}
