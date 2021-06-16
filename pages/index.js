import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md py-2 bg-gray-100 overflow-y-auto">
      <Head>
        <title>Quizar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="relative flex flex-col justify-center items-center w-full h-1/3 mx-2 -my-2 rounded-big bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="flex justify-center items-center rounded-full w-24 h-24 bg-white">
        <div className="w-22 h-22 rounded-full overflow-hidden flex justify-center">
            <img className="object-cover" src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
          </div>
        </div>
        <div className="text-white font-semibold text-2xl py-2">Arne</div>
        <div className="flex flex-row w-full justify-center items-center">
          <button className="flex justify-center items-center w-auto h-6 p-2 m-2 rounded-full text-center bg-white bg-opacity-25 text-white font-semibold text-sm">
            20 years
          </button>
          <button className="flex justify-center items-center w-auto h-6 p-2 m-2 rounded-full text-center bg-white bg-opacity-25 text-white font-semibold text-sm">
            3 lvl
          </button>
        </div>
      </header>
      <main className="flex flex-col justify-center items-start p-4 w-full">
        <section className="flex flex-col justify-center items-start">
          <h4 className="text-sm text-gray-400 uppercase my-4">Your data</h4>
          <div className="flex flex-row">
            <div className="flex flex-col justify-around p-2 mx-2 w-32 h-32 rounded-lg shadow-xl bg-white">
              <div>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              </div>
              <div className="text-2xl font-semibold">
                18/30
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Finished quiz
              </div>
            </div>
            <div className="flex flex-col justify-around p-2 mx-2 w-32 h-32 rounded-lg shadow-xl bg-white">
              <div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="text-2xl font-semibold">
                35 min
              </div>
              <div className="text-sm font-semibold text-gray-500">
                Avg time
              </div>
            </div>
          </div>
        </section>
        {/* Quiz section */}
        <section className="flex flex-col justify-center items-start w-full">
          <h4 className="text-sm text-gray-400 uppercase my-4">Quizes</h4>
          <div className="w-full h-20 my-2 flex flex-row justify-between items-center bg-green-100 rounded-md">
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-green-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" /></svg>
            </div>
            <div className="flex flex-col flex-1 justify-start items-start">
              <h4 className="font-semibold text-md">Maths</h4>
              <h6 className="text-xs text-black text-opacity-50">80% result</h6>
              <div className="relative pt-1 w-full">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                </div>
              </div>
            </div>
            <div className="px-2 mx-2">
              <svg className="w-6 h-6 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
          </div>
          {/* Quiz 2 */}
          <div className="w-full h-20 my-2 flex flex-row justify-between items-center bg-green-100 rounded-md">
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-green-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" /></svg>
            </div>
            <div className="flex flex-col flex-1 justify-start items-start">
              <h4 className="font-semibold text-md">Maths</h4>
              <h6 className="text-xs text-black text-opacity-50">80% result</h6>
              <div className="relative pt-1 w-full">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                </div>
              </div>
            </div>
            <div className="px-2 mx-2">
              <svg className="w-6 h-6 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
          </div>
          {/* Quiz 3 */}
          <div className="w-full h-20 my-2 flex flex-row justify-between items-center bg-green-100 rounded-md">
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-green-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" /></svg>
            </div>
            <div className="flex flex-col flex-1 justify-start items-start">
              <h4 className="font-semibold text-md">Maths</h4>
              <h6 className="text-xs text-black text-opacity-50">80% result</h6>
              <div className="relative pt-1 w-full">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                </div>
              </div>
            </div>
            <div className="px-2 mx-2">
              <svg className="w-6 h-6 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
          </div>
          {/* Quiz 4 */}
          <div className="w-full h-20 my-2 flex flex-row justify-between items-center bg-green-100 rounded-md">
            <div className="px-2 mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-green-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" /></svg>
            </div>
            <div className="flex flex-col flex-1 justify-start items-start">
              <h4 className="font-semibold text-md">Maths</h4>
              <h6 className="text-xs text-black text-opacity-50">80% result</h6>
              <div className="relative pt-1 w-full">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                  <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"></div>
                </div>
              </div>
            </div>
            <div className="px-2 mx-2">
              <svg className="w-6 h-6 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
