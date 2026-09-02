import "dotenv/config";
import mongoose from "mongoose";

export default async function ConnectToDataBace() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    } else {
      await mongoose
        .connect(`${process.env.MONGO_DB_URL}`)
        .then(() => console.log("your data bace connected successfully 💥"));
    }
  } catch (error) {
    console.log("Error establishing connection to the database");
    throw error;
  }
}
