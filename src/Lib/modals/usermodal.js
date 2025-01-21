import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    clerkId: {
      type: String
    },
    email: {
      type: String
    },
    username: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    avatar: {
      type: String
    },
    username:{
      type:String
    }
  },
  { timestamps: true }
);

const User = new mongoose.model('Data', UserSchema);

export default User;