import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.MONGO_DB_URL;
await mongoose.connect(url, { authSource: "admin" });

const db = mongoose.connection.db;
const users = await db.collection("users").find({}, { projection: { phoneNumber: 1, firstName: 1, role: 1 } }).toArray();

console.log("=== کاربران فعلی (%d) ===", users.length);
for (const u of users) {
  console.log(`- ${u.phoneNumber} | نام: ${u.firstName || "(ندارد)"} | نقش: ${u.role || "?"}`);
}

await mongoose.disconnect();
