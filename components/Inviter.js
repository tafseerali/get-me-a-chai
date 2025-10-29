import React from 'react'

const Inviter = () => {
  return (
    <div className=' w-full flex justify-center p-4'>
        <div className="container border border-gray-800 bg-[#131428] rounded-3xl flex flex-col items-center justify-center gap-10 p-10 max-[550px]:px-0 w-5/6 max-[550px]:w-full">
        <div className='flex flex-col w-full justify-center items-center gap-3'>
            <h2 className='text-3xl font-bold max-[550px]:text-center'>Ready to Transform Your Digital Presence?</h2>
            <p className='text-[#e8e7f7] text-sm max-[550px]:text-center'>Let&apos;s discuss your project and create something amazing together</p>
        </div>
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-6 py-4 text-center me-2 mb-2 cursor-pointer transform transition duration-300 hover:-translate-y-1">Get Started Today</button>
        </div>
    </div>
  )
}

export default Inviter
