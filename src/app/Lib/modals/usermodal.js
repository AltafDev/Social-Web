import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const User = new mongoose.model('User', UserSchema);

export default User;