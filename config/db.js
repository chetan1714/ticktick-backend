import mongoose from "mongoose";
import config from "./appconfig.js";

const dbURI = config.db.MONGODB_URI;

let isConnected = false; 

async function connectDB() {
  if (isConnected) {
    console.info("✅ Using existing MongoDB connection.");
    return;
  }

  try {
    const db = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.info("✅ Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

export { connectDB };
