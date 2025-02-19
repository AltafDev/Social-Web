"use client"
import React, { useRef, useState } from 'react';
import { FaImage } from "react-icons/fa";
import { useUser } from '@clerk/nextjs';
import { ImCancelCircle } from "react-icons/im";
import { CldUploadWidget } from 'next-cloudinary';

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  // const IMAGEFILEREF = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [input,setinput]=useState("")
  const [postLoading, setPostLoading] = useState(false);

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }

  const HandleUpload=(result)=>{
    if (result.event === "success" ){
      setSelectedImage(result.info.secure_url);    }
  }

  const HandleSubmit=async()=>{
    setPostLoading(true);

    const response=await fetch(`/api/post/create`,{
      method:"Post",
      headers:{
        "Content-Type":"application/json"
      },
     body:JSON.stringify({
      userMongoId: user.publicMetadata.userMongoId,
      name: user.fullName,
      username: user.username,
      text: input, 
      profileImg: user.imageUrl,
      image: selectedImage, 
     })
    })
    setinput("")
    setSelectedImage(null)
    setPostLoading(false);

  }


  return (
    <div className="w-[60vh] flex flex-col p-4 border rounded-lg shadow-lg bg-white  space-y-4">
      <textarea
      value={input}
      onChange={(e)=>setinput(e.target.value)}
        rows={2}
        className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Write your post..."
      />
       {/* <div className="flex justify-between">
       <div>
          <FaImage
            size={24}
            color="red"
            onClick={() => IMAGEFILEREF.current.click()}
            className="cursor-pointer hover:scale-110"
          />
          <input
            hidden
            type="file"
            accept="image/*"
            ref={IMAGEFILEREF}
            onChange={handleUploadImage}
          />
        </div>
        {selectedImage &&(
          <button onClick={()=>setSelectedImage(null)}>
          <ImCancelCircle size={20} />
        </button>
      
        )

        }
         </div> */}
    

      {/* {selectedImage && (
        <div className="relative">
          <img src={selectedImage} alt="Uploaded" className="w-full rounded-lg shadow-md" />
        </div>
      )} */}

      <div className="flex  justify-between">
      <CldUploadWidget uploadPreset="Social_web"   >
  {({ open }) => {
    return (
      <button onUpload={HandleUpload} onClick={() => open()}>
        Upload an Image
      </button>
    );
  }}
</CldUploadWidget>
   
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
        Post
      </button>
      

      
        
      </div>
    </div>
  );
}