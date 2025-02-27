import mongoose from "mongoose";
import config from "./appconfig.js";

const dbURI = config.db.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    console.info("Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("Failed to connect to MongoDB with Mongoose", err);
    process.exit(1);
  }
}

async function closeDB() {
  try {
    await mongoose.connection.close();
    console.info("Disconnected from MongoDB with Mongoose");
  } catch (err) {
    console.error("Failed to disconnect from MongoDB with Mongoose", err);
    process.exit(1);
  }
}

export { connectDB, closeDB };
