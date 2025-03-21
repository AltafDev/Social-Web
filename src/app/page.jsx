
"use client"
import React, { useEffect, useState } from 'react'
import NewInput from "./components/NewInput"
import "./components/PostStyle.css"
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import axios from "axios";

export default  function page () {
  const [num,setnum]=useState(0)
const HomeImg = `https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=`
 useEffect(() => {
  GetData()
 }, [])
 

const [data,setData]=useState([])
  const GetData = () => {
    try {
      axios.post("https://social-web-qdd9.vercel.app/api/post/all")
      .then(res =>setData(res.data) )
      .catch(err => console.error(err));
      
    } catch (error) {
      console.log(error)
    }



  }

  console.log(data)
  return (
    <>
     <NewInput/>

<div>

 
  {
    data?.map((item)=>(
      
      <>
       <div className="main-post">
  <div className="profile-info-main">
    <div className="profile-info">
      <div className="">
        <img className="avator" src={item.profileImg} alt="" />
      </div>
      <div className="">
        <p className='user__name'>ibrahim312</p>
        <p className='First_name'>{item.name}</p>
      </div>
    </div>
    <div className="post-timing">
      <p>15 min ago</p>
    </div>
  </div>
  <div className="post-text">
    <h3>{item.text}</h3>
  </div>
<div className="post-img">
  <img src={item.image ? item.image : HomeImg} alt="" />
</div>
<div className="event-buttons">
  <div className="like"><span><AiFillLike /></span> <span onClick={()=>setnum(num+1)}>Like</span> </div>
  <div className="comments">
   <button> <span><FaComments /></span>
   <span>Comments</span></button>
  </div>
  <div className="share">
<span><FaShare />
</span>
<span>share</span>
  </div>
</div>
 </div>
      </>
    ))
  }
</div>
    </>
  )
}
