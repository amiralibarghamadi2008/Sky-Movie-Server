import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

export default function createS3Client() {
  try {
    const S3 = new S3Client({
      region: "default",
      endpoint: process.env.PARSPACK_ENDPOINT,
      credentials: {
        accessKeyId: process.env.PARSPACK_ACCESS_KEY,
        secretAccessKey: process.env.PARSPACK_SECRET_KEY,
      },
      forcePathStyle: true, 
    });
    
    return S3;
  } catch (error) {
    throw error;
  }
}
