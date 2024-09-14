import { createClient, RedisClientOptions } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL, // Use 'REDIS_URL' environment variable
} as RedisClientOptions);

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  await redisClient.connect();
})();

export default redisClient;
