import mongoose from "mongoose";

const url = process.env.MONGO_URI;

if (!url) {
  throw new Error("MONGO_URI is not set.");
}

let connection: typeof mongoose | undefined;

const connectDB = async (): Promise<typeof mongoose> => {
  if (connection) {
    return connection;
  }

  connection = await mongoose.connect(url);
  return connection;
};

export default connectDB;
