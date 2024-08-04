// db.js
import mongoose from 'mongoose';


const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/soccer-predictions';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
};

export default connectDB;
