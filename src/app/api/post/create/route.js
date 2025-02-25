import POST from "../../../../Lib/modals/post.model";
import { Connect } from "../../../../Lib/mongodb/mongodb";
import { currentUser } from "@clerk/nextjs/server";
export async function Post(req) {
  const user = await currentUser(req);
  try {
    await Connect();
    const data = await req.json();
    console.log("Received Data:" + data);
    if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const newPost = await POST.create({
      user: data.userMongoId,
      name: data.name,
      username: data.username,
      text: data.text,
      profileImg: data.profileImg,
      image: data.image,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 200});
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response(error.message);
  }
}
