import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("MongoDB conneted Sucessfully");
  } catch (error) {
    console.log("MongoDB connection failed", error.message);
  }
};

export default connectDB;
