import React from 'react'
import NewInput from "./components/NewInput"
import "./components/PostStyle.css"
import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

export default async function page() {
const userImg = `https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg`
const homeImg = `https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4=`
  let data=null
  try {
    const result=await fetch("https://social-web-qdd9.vercel.app/api/post/all",{
      method:"POST",
      cache:"no-store"
    })
    data=await result.json()
  } catch (error) {
    console.log(error)
  }
  console.log(data)
  return (
    <>
     <NewInput/>

<div>

 
  {
    data.map((item)=>(
      <div className="main-post">
      <div className="profile-info-main">
        <div className="profile-info">
          <div className="">
            <img className="avator" src={userImg} alt="" />
          </div>
          <div className="">
            <p className='user__name'>ibrahim312</p>
            <p className='First_name'>ibrahim Altaf</p>
          </div>
        </div>
        <div className="post-timing">
          <p>15 min ago</p>
        </div>
      </div>
      <div className="post-text">
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sed impedit omnis nemo. Voluptates expedita reprehenderit, explicabo itaque tenetur blanditiis.</h3>
      </div>
    <div className="post-img">
      <img src={homeImg} alt="" />
    </div>
    <div className="event-buttons">
      <div className="like"><span><AiFillLike /></span> <span>Like</span> </div>
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
      
    ))
  }
</div>
    </>
  )
}
