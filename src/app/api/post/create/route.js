import Post from "../../../../Lib/modals/post.model"
import { Connect } from "../../../../Lib/mongodb/mongodb"
import { currentUser } from "@clerk/nextjs/server"

export async function Post(req) {
    const user = await currentUser(req)
    try {
        await Connect()
        const data = await req.json()
        if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
            return new Response ("unauthorized", {
                status:401
            })
        }
        const newPost = await Post.create({
            user:data.userMongoId,
            name:data.name,
            username:data.username,
            text:data.text,
            profileImg:data.profileImg,
            image:data.image
        })

        await newPost.save()
        return new Response (json.stringify(newPost),
        {status:200}
    )
      

    } catch (error) {
            console.log(error)
            return new Response ("Internal Server error"), 
            {status:500}
    }
}