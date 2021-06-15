import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen w-full mx-auto md:max-w-screen-md py-2">
      <Head>
        <title>Quizar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="relative flex flex-col justify-center items-center w-full h-1/3 mx-2 -my-2 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="flex justify-center items-center rounded-full w-24 h-24 bg-green-300">
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
    </div>
  )
}
