import mongoose from 'mongoose';

let initialized = false;

export const Connect = async () => {
  mongoose.set('strictQuery', true);
  if (initialized) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.Connect(process.env.MONGO_URI, {
      dbName: 'socialweb',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    initialized = true;
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};