import React from 'react'
import NewInput from "./components/NewInput"
export default async function page() {
  let data=null
  try {
    const result=await fetch(process.env.URL+"/api/post/all",{
      method:"POST",
      cache:"no-store"
    })
    data=await result.json()
  } catch (error) {
    console.log(error)
  }
  return (
    <>
     <NewInput/>

    </>
  )
}
