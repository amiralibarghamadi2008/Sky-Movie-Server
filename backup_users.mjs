import mongoose from "mongoose";
import "dotenv/config";
import fs from "fs";

const url = process.env.MONGO_DB_URL;
await mongoose.connect(url, { authSource: "admin" });
const db = mongoose.connection.db;
const users = await db.collection("users").find({}).toArray();
fs.writeFileSync("/tmp/users-backup.json", JSON.stringify(users, null, 2));
console.log(`✅ بک آپ ${users.length} کاربر در /tmp/users-backup.json`);
await mongoose.disconnect();
