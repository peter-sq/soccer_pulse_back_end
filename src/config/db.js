import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/soccer-predictions';
      console.log('Connecting to MongoDB with URI:', uri); // Log URI for debugging
      await mongoose.connect(uri);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Connection error:', err.message);
      process.exit(1);
    }
  } else {
    console.log('MongoDB already connected');
  }
};

export default connectDB;
