import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URI,
});

redis.on("error", (err) => console.error("خطای ردیس:", err));

await redis.connect();

export default redis;