import { useState } from 'react'
import { useEffect } from 'react'
import  './Rightbar.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'


function Rightbar() {
  const [users,setUsers]=useState([])
  const user = useSelector((state)=> state.user)
  const [check,setCheck]=useState(false)
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const axiosInstance=axios.create({
    baseURL:process.env.REACT_APP_API_URL,
   }) 

  useEffect(()=>{
    console.log('button changed');
  },[check])



  useEffect(()=>{
    const fetchUsers=async()=>{
     const allUsers=await axiosInstance.get(`/suggestions/${user._id}`)
     if(allUsers){
      setUsers(allUsers.data)
     }else{
      console.log('error');
     }
    }
    fetchUsers()
  },[check])
  const FollowUser = async(id) => {
    console.log('followed user');
    try {
      const res= await axiosInstance.put(`/follow/${id}`,{ userId:user._id },
      {headers:{"x-access-token":localStorage.getItem('usertoken')}});
      console.log(res);
      setCheck(!check)
    } catch (err) {
    console.log(err)
  }
}
  const UnFollowUser = async(id) => {
    console.log('unfollowed user');
    try {
      const res= await axiosInstance.put(`/unfollow/${id} `,{ userId:user._id },
      {headers:{"x-access-token":localStorage.getItem('usertoken')}});
      console.log(res);
      setCheck(!check)
    } catch (err) {
      console.log(err)
    }
    
  }
  return (

    <div className=' items-center'>
      <h2 className='align-center justify-center p-5 text-gray-500 font-semibold'> Suggetions</h2>
      {users.map((obj)=>( 
        <>
        {obj.username!==user.username&&
        
         <div class="flex items-center justify-around relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md mb-5">
          <Link to={`/profile/${obj.username}`}>
          <div>
          <img class="w-12 h-12 rounded-full bg-gray-100" src={PF+obj.profilePicture}></img>
          </div>  
         </Link>
            <div>
            <p class="font-medium text-gray-800">{obj.username}</p>
            <p class="text-sm text-gray-600">{obj.email}</p>
            </div>
            <div>
            {obj?.followers?.includes(user._id) ?<button className='bg-gray-500 px-2 py-1 text-white w-20 text-sm rounded block text-center ' onClick={(e) => { UnFollowUser(obj._id) }}>Unfollow</button>:
               <button className='bg-gray-500 px-2 py-1 text-white w-20 text-sm rounded block text-center ' onClick={(e) => { FollowUser(obj._id) }}>Follow</button>
              }
            </div>
         
     </div>
     }
      
    </> 
   ))}
    </div>
   
    // <div>
    //   <div class=" h-screen w-full justify-center">
    //     <div class="max-w-full grid grid-cols-2 gap-4">
    //       {users.map((obj) => {
    //         return (
    //           <div class="bg-white shadow-xl rounded-lg py-2 ">
    //             <div class="photo-wrapper p-2">
    //               <img
    //                 class="w-20 h-20 rounded-full mx-auto"
    //                 src="/assets/a1.jpg"
    //                 alt="John Doe"
    //               />
    //             </div>
    //             <div class="p-2">
    //               <h3 class="text-center text-xl text-gray-800 font-extralight leading-8">
    //                 {obj.username}
    //               </h3>
    //               <div class="text-center text-gray-400 text-xs font-semibold truncate">
    //                 <h6>{obj.email}</h6>
    //               </div>
    //               {/* <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a> */}
                    


    //               {obj.followers.includes(user._id) ? (
    //                 <div class="text-center my-3">
    //                   <Link to={`/profile/${obj.username}`}>
    //                   <button
    //                     className="btn bg-neutral-400 text-white p-1"
    //                     // onClick={(e) => {
    //                     //   handleSubmitUndo(obj._id);
    //                     // }}
    //                   >
    //                    View profile
    //                   </button>
    //                   </Link>
    //                 </div>
    //               ) : (
    //                 <div class="text-center my-3">
    //                   <button
    //                     className="btn bg-neutral-400 text-white p-1"
    //                     onClick={(e) => { FollowUser(obj._id) }}
    //                   >
    //                     Follow
    //                   </button>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>

    

    
  //   <div className='rightbar'>
  //         <div class="sidebar">
  // <div class="sidebar-menu-container">
  //   {/* <div class="sidebar-card sidebar-header grid">
  //     <img  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" class="sidebar-img sidebar-hd-img"/>
  //     <span class="sidebar-title card-title">
  //       Lorem, ipsum.
  //     </span>
  //     <span class="card-subtitle sidebar-subtitle">Lorem.</span>
  //     <span class="sidebar-btn">
  //       Change
  //     </span>
  //   </div> */}
  //   <div class="suggestions-header grid">
  //     <span class="suggestions-text">
  //       Suggestions for you
  //     </span>
  //     <span class="sidebar-btn-alt">
  //       {/* See all */}
  //     </span>
  //   </div>
  //   {users.map((obj)=>{
  //    return(
  //    <div class="side bar-card sidebar-card-alt grid">
  //     <img style={{height:"40px",width:"40px"}} src="/assets/avatar.jpg" alt="" class="sidebar-img side-bar-img-alt"/>
  //     <span class="sidebar-title card-title">
  //     {obj.username}
  //     </span>
  //     <span class="sidebar-btn">
  //              {obj.followers.includes(user._id) ?<button className='followButton' onClick={(e) => { UnFollowUser(obj._id) }}>Unfollow</button>:
  //              <button className='followButton' onClick={(e) => { FollowUser(obj._id) }}>Follow</button>
  //             }
  //     </span>
  //   </div>
  //     )
  //   })}
  //   </div>
  //   </div>
  //           <div className='friendsDetails'>
  //             <h3></h3>
             
  //             <br/>
  //             </div>
           
         
  //   </div>
  )
}

export default Rightbar
