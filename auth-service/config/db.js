import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    process.exit(1);
  }
};

export default connectDB;