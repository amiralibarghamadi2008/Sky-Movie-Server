import "dotenv/config";
import jwt from "jsonwebtoken";

export default function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.Access_Token_Security_Code);
    return decoded;
  } catch (error) {
    return null;
  }
}