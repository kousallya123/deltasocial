import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function NotFound() {
  const user=useSelector(state=>state.user)
  return (
    
  <div>
    <h1 className='text-3xl text-bold text-red-400 text-center p-3'>Oops</h1>
    <div className=' flex justify-center items-center object-center'>
    <img src='data:image/png;base64,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' className='items-center'></img>
    </div>
    <h1 className='text-3xl text-bold text-gray-400 text-center p-3'>Something Went Wrong!!!!!!</h1>
    <h3 className='text-3xl text-bold text-red-400 text-center p-3'>Error</h3>
    <div className='flex items-center justify-center '>
      {user.username ?  
      <Link to='/home'>
    <button
    className="text-center text-red-500 background-transparent bg-gray-100 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="button" >
                Take me back
              </button>
              </Link>        
       :
      <Link to='/admin-login'>
      <button
      className="text-center text-red-500 background-transparent bg-gray-100 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button" >
                  Take me back
                </button>
                </Link>        
    }
        
    </div>
  
  </div>
  )
}

export default NotFound

