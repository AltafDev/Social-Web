import mongoose from "mongoose"


const postschema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
  image:{
    type:String
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true
  },
  username:{
    type:String,
    required:true
  },
   profileimage:{
    type:String,
    required:true
   },
   comments:{  
    type:[{comments,String}],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
       },
       name:{
        type:String,        
       },
       username:{
        type:String
       },
       profileimage:{
        type:String
       },
       createdat:{
        type:String,
        default:Date.now
       },
 },
 likes:{  
    type:[{likes,String}],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
       },
       name:{
        type:String,        
       },
       username:{
        type:String
       },
       profileimage:{
        type:String
       },
       createdat:{
        type:String,
        default:Date.now
       },
}
},
{ timestamps: true })

const post = mongoose.models.User || mongoose.model('User', postschema);

export default post;












