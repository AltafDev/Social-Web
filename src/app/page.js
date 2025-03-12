import React from 'react'
import NewInput from "./components/NewInput"
export default async function page() {
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
      <div key={item.id}>
        <h1>{item.text}</h1>
      </div>
      
    ))
  }
</div>
    </>
  )
}
