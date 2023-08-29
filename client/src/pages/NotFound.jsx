import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-5 gap-1'>
    <FaExclamationTriangle size='5em' className='text-yellow-500' />
    <h1 className='text-4xl font-bold'> 404</h1>
    <p>Sorry, this page doest not exist</p>
    <Link to="/" className='bg-slate-500 p-2 m-1 text-white rounded '> Go Back</Link>
    </div>
  )
}

export default NotFound
