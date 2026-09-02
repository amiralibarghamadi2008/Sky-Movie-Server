import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.MONGO_DB_URL;
await mongoose.connect(url, { authSource: "admin" });

const db = mongoose.connection.db;
const KEEP = ["09307510073", "09104477731"];
const NAME = "Amir ali Barghamadi";

// حذف همه غیر از دو شماره
const result = await db.collection("users").deleteMany({
  phoneNumber: { $nin: KEEP },
});
console.log("DELETED:", result.deletedCount, "users");

// تغییر اسم دو شماره باقی‌مانده
const upd = await db.collection("users").updateMany(
  { phoneNumber: { $in: KEEP } },
  { $set: { firstName: NAME } }
);
console.log("RENAMED:", upd.modifiedCount, "users");

// نمایش نتیجه نهایی
const users = await db.collection("users").find({}, { projection: { phoneNumber: 1, firstName: 1, role: 1 } }).toArray();
console.log("=== REMAINING USERS ===");
for (const u of users) {
  console.log("- " + u.phoneNumber + " | name: " + u.firstName + " | role: " + u.role);
}

await mongoose.disconnect();
