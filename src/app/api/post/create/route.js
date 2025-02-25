import POST from "../../../../Lib/modals/post.model";
import { Connect } from "../../../../Lib/mongodb/mongodb";
import { currentUser } from "@clerk/nextjs/server";

export async function NewPOST (req) {
  const user = await currentUser(req);

  try {
      await Connect();
      const DATA = await req.json();
      console.log("api Data =======>" + DATA)
      if (!user || user.publicMetadata.userMongoId !== DATA.userMongoId) {
          return new Response ("unuthorized",{status:401})
      }
      const newPost = await POST.create({
          user:DATA.userMongoId,
          name:DATA.name,
          username:DATA.username,
          text:DATA.text,
          profileImg:DATA.profileImg,
          image:DATA.image
      })
      await newPost.save();
      return new Response(JSON.stringify(newPost),{
          status:201,
      });
  } catch (error) {
      console.log(error)
      return new Response(error.message)
  };
}