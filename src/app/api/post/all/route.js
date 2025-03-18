import Post from "../../../../Lib/modals/post.model";
import { Connect } from "../../../../Lib/mongodb/mongodb";


export const POST = async (req) => {
    try {
        await Connect();
        const feedPosts = await Post.find().sort({ createdAt: -1 });
        return new Response(JSON.stringify(feedPosts), { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
    }