import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
      console.log("MONGODB_URL is not set");
      throw new Error("MONGODB_URL is not set");
    }
    const con = await mongoose.connect(MONGODB_URL);
    console.log(`Connected to the database... ${con.connection.host}`);
  } catch (error) {
    console.log("Error connecting to the database...");
    console.log(error);
  }
};

export default connectDB;
