import "dotenv/config";
import jwt from "jsonwebtoken";

export default function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.Refresh_Token_Security_Code);
    return decoded;
  } catch (error) {
    return null;
  }
}