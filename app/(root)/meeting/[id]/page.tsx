import React from 'react'

const Meeting = async({params}:{ params:{ id: string}}) => {
  const { id } = await params;
  return (
    <div className='text-white'>
      Meeting Room: #{id}
    </div>
  )
}

export default Meeting 