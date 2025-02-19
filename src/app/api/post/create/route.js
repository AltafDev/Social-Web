import POST from "../../../../Lib/modals/post.model"
import {currentUser} from "@clerk/nextjs/server"

import {Connect } from "../../../../Lib/mongodb/mongodb"

export async function POST (req){
    const user = await currentUser(req)
    try {
        await Connect()
        const data = await req.json()
        if (!user || user.publicMetadata.userMongoId !==data.userMongoId ){
            return new Response("unauthtorized",{status:401})

        } 
        const newPost = await POST.create({
            user:data.userMongoId,
            name:data.name,
            username:data.username,
            text:data.text,
            profileimage:data.profileimage,
            image:data.image
        }) 
        await newPost.save()
        return new Response(JSON.stringify(newPost),{
            status:200
        })
    } catch (error) {
        console.log(error)
        return new Response("internal server errror",{status:500})
    }
}