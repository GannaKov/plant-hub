import { Ratelimit } from '@upstash/ratelimit'; // for deno: see above
import redis from '@/database/redis';

// Create a new ratelimiter, that allows 10 requests per 10 seconds
//  for test limiter: Ratelimit.fixedWindow(1, '1m'),
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '1m'),
  analytics: true,
  /**
   for kraz
   */
  prefix: '@upstash/ratelimit-kraz',
});

export default ratelimit;
