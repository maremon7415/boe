import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "@/models/User";
dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI || "";

if (!MONGO_URI) {
  throw new Error("Please provide a valid MongoDB URI");
}

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    console.log("Deleted all users");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

main();
