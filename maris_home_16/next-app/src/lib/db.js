import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }
  import mongoose from "mongoose";

  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  export async function connectToDatabase() {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4, // Force IPv4
        retryWrites: true,
        retryReads: true,
      };

      try {
        cached.promise = mongoose.connect(MONGODB_URI, opts);
        console.log("Attempting MongoDB connection...");
      } catch (error) {
        console.error("Initial connection error:", error);
        cached.promise = null;
        throw error;
      }
    }

    try {
      cached.conn = await cached.promise;
      console.log("MongoDB connected successfully");
      return cached.conn;
    } catch (error) {
      cached.promise = null;
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
