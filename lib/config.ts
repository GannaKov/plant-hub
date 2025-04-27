// for env variables
const config = {
  env: {
    // apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    // prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
    },
  },
};
export default config;
