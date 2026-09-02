import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export default function GenerateAccessToken(user) {
  try {
    return jwt.sign(
      { id: user._id, role: user.role, firstName : user.firstName, jti: crypto.randomUUID(), },
      process.env.Access_Token_Security_Code,
      { expiresIn: "20m" },
    );
  } catch (error) {
    throw error;
  }
}
