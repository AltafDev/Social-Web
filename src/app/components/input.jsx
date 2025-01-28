"use client"
import React from 'react'
import { FaImage } from "react-icons/fa";
import { useUser } from '@clerk/nextjs';
import { useRef } from 'react';
export default function Input() {
  const ImageSend=useRef(null)

    const { user ,isSignedIn,isLoaded} = useUser();
    if(!user || !isSignedIn || !isLoaded){
        return null
    }
    const Handleuptochange =() =>{

    }

  return (
    <div className='flex items-center gap-5'>
      <img className='w-[20px] ' src={user.imageUrl} alt="" />
      <textarea  />
      <div className='flex gap-5 items-center ' >
      <FaImage onClick={()=>{
        ImageSend.current.click()
      }} />
        <input hidden className='' type="file" accept='images/*' ref={ImageSend}  onChange={Handleuptochange}    />
        <button>Post</button>
      </div>
    </div>
  )
}