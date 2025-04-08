import React from 'react';
import { db } from '@/database/drizzle';

import { users, equipment } from '@/database/schema';

const page = async () => {
  const result = await db.select().from(equipment).limit(10);
  console.log(JSON.stringify(result, null, 2));
  return <div>OTHER ONE</div>;
};

export default page;
