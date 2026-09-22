import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

export default function createS3Client() {
  try {
    const S3 = new S3Client({
      region: "default", // AWS SDK requires a region string; 'default' or 'us-east-1' works
      endpoint: process.env.PARSPACK_ENDPOINT, // e.g. "https://c850966.parspack.net"
      credentials: {
        accessKeyId: process.env.PARSPACK_ACCESS_KEY,
        secretAccessKey: process.env.PARSPACK_SECRET_KEY,
      },
      forcePathStyle: true, // Prevents bucket duplication errors on third-party S3
    });

    console.log("CHECK KEYS:", {
      endpoint: process.env.PARSPACK_ENDPOINT,
      accessKey: process.env.PARSPACK_ACCESS_KEY,
      bucket: process.env.PARSPACK_BUCKET_NAME,
    });

    return S3;
  } catch (error) {
    throw error;
  }
}
