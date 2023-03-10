import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar.js/Navbar';
import './Profile.css'
import Swal from 'sweetalert2'
import {login} from '../../../redux/userSlice'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';


function UserProfile() {
 const dispatch=useDispatch(); 
 const PF=process.env.REACT_APP_PUBLIC_FOLDER
 const user=useSelector((state)=>state.user) 
 const [edit,setEdit]=useState([])
 const [post,setPost]=useState([]) 
 const [showMod,SetShowMod]=useState(false)
 const [file,setFile]= useState([])
 const axiosInstance=axios.create({
  baseURL:process.env.REACT_APP_API_URL,
 })


 const handleChange = (e) => {
  const { name, value } = e.target;
  setEdit({
    ...edit,
    [name]: value,
  })
};


 const handleEdit=async(e)=>{
  e.preventDefault();
   const editPost={
    ...edit
   }

   if(file){
    const data=new FormData();
    const fileName=file.name
    data.append("file",file)
    data.append("name",fileName)
    editPost.profilePicture=fileName
    
    try {
      await axiosInstance.post('/post/upload',data ,{headers:{"x-access-token":localStorage.getItem('usertoken')}})
      // window.location.reload()
      
    } catch (error) {
      console.log(error);
    }
  }
  try {
        const response=await axiosInstance.put("/"+user._id, {editPost,userId:user._id})
         dispatch(login(response.data))
         localStorage.removeItem('user')
         localStorage.setItem('user',JSON.stringify(response.data))
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your details is updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        
      SetShowMod(false)  
    
  } catch (error) {}

}

  useEffect(() => {
    const fetchPost = async () => {
    const res = await axiosInstance.get(`/post/userpost/${user._id}`,
    {headers:{"x-access-token":localStorage.getItem('usertoken')}});
    setPost(res.data);
  };
  fetchPost();
},[user._id])


  return (
    <div>
        <Navbar/>
      <main class="bg-gray-100 bg-opacity-25">

<div class="lg:w-8/12 lg:mx-auto mb-8">

  <header class="flex flex-wrap items-center p-4 md:py-8">

    <div class="md:w-3/12 md:ml-16">
                  <img class="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                   border-2 p-1"src={PF+user.profilePicture} alt="profile"/>
    
    </div>
   <div class="w-8/12 md:w-7/12 ml-4">
       <div class="md:flex md:flex-wrap md:items-center mb-4">
        <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
          {user.username}
        </h2>
        <a href="#" class="bg-gray-500 px-2 py-1 
                      text-white font-semibold text-sm rounded block text-center 
                      "  onClick={()=>SetShowMod(true)}>Edit profile</a>
      </div>

    
      <ul class="flex space-x-8 mb-4">
        {/* <li>
          <span class="font-semibold">{user.posts.length}</span>
          posts
        </li> */}

        <li>
          <span class="font-semibold">{user.followers.length}</span>
          followers
        </li>
        <li>
          <span class="font-semibold">{user.followings.length}</span>
          following
        </li>
      </ul>

   
      <div class=" md:block">
        <h1 class="font-semibold">{user.email}</h1>
        <span>{user.desc}</span>
        {/* <p>Lorem ipsum dolor sit amet consectetur</p> */}
      </div>
    </div>
  </header>


  <div class="px-px md:px-3">
    <ul class="flex items-center justify-around md:justify-center space-x-12  
                  uppercase tracking-widest font-semibold text-xs text-gray-600
                  border-t">

      <li class="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
        <a class="inline-block p-3" href="#">
          <i class="fas fa-th-large text-xl md:text-xs"></i>
          <span class="hidden md:inline">post</span>
        </a>
      </li>
    </ul>
    {showMod ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
           
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit your details</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => SetShowMod(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ??
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <label for='file' className="shareOptions p-3">
                     <InsertEmoticonIcon htmlColor="tomato" className='shareIcon'/>
                     <span className='shareOptionText'>Update your profile photo</span>
                     <input style={{display:"none"}} type='file'name='file' id='file' onChange={(e)=>{{setFile(e.target.files[0])}}} accept=".png,.jpg,.webp"/>
                 </label>
               
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter the username"
                    onChange={handleChange}
                  />
                  <input
                    className='ml-5'
                    type="text"
                    name="desc"
                    placeholder="Change bio"
                    onChange={handleChange}
                  />
               
                  <br /> <br />
                  <input 
                    type="text"
                    name="email"
                    placeholder="Enter the email"
                    onChange={handleChange}
                  />
                   <input className='ml-5'
                    type="password"
                    name="password"
                    placeholder="change password"
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SetShowMod(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleEdit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


    <div class="flex flex-wrap -mx-px md:-mx-3">
    {post.map((obj)=>{
      return(
          
      <div class="w-1/3 p-px md:px-3">
      <a href="#">
        <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
          {obj.img &&<img class="w-full h-full absolute left-0 top-0 object-cover" src={PF+obj.img} alt="image" />}
          <video src={PF+obj.video} />
          {/* <i class="fas fa-square absolute right-0 top-0 m-1"></i> */}
          <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                            left-0 top-0 hidden">
            <div class="flex justify-center items-center 
                                space-x-4 h-full">
              <span class="p-2">
                <i class="fas fa-heart"></i>
                {obj.likes.length}
              </span>

              {/* <span class="p-2">
                <i class="fas fa-comment"></i>
                2,909
              </span> */}
            </div>
          </div>

        </article>
      </a>
       </div>

      )
    })
    }



      

    </div>
  </div>
</div>
</main>
    </div>
  )
}

export default UserProfile
