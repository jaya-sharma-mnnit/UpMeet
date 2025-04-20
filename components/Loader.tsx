import React from 'react'

const Loader = () => {
  return (
    <div className='min-h-screen bg-dark-2 flex items-center justify-center'>
    <div className='flex items-center gap-4 px-6 py-4 bg-dark-1 text-white text-2xl font-semibold rounded-lg shadow-lg min:w-1/3 min:h-1/3'>
    <div className="min:w-12 min:h-12  w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    Loading...</div>
    </div>
  )
}

export default Loader