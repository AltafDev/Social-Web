import mongoose from "mongoose"

const POSTSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
       
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
       
    },
    profileImg: {
        type: String,
        required: true
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: []
    },
    comments: {
        type: [{
            comment: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            name: String,
            username: String,
            profileImg: String,
            createdAt: { type: Date, default: Date.now() },
        }],
        default: []
    }
}, { timestamps: true });

const Post =mongoose.models.post ||  mongoose.model('post', POSTSchema);

export default Post;