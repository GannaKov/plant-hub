import React from 'react';

import { db } from '@/database/drizzle';
import { equipment } from '@/database/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

const Home = async () => {
  const equipmentList = (await db
    .select()
    .from(equipment)
    .limit(10)
    .orderBy(desc(equipment.createdAt))) as Equipment[];

  return (
    <div className="pt-10 pb-20">
      <h1 className="mb-8 items-center text-center form-title">
        {' '}
        Список обладнання
      </h1>
      <div className="mb-4 flex text-lg font-semibold">
        <p className="flex-1/5 text-center">inventoryNumber</p>
        <p className="flex-2/5">equipmentName</p>
      </div>
      <ul className="mb-10 flex flex-col gap-5">
        {equipmentList.map((item) => (
          <li key={item.id}>
            <Link
              href={`/equipment/${item.id}`}
              className="flex items-center gap-5 border-2 border-gray-300 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <span className="flex-1/5 text-center text-xl font-semibold">
                {item.inventoryNumber}
              </span>
              <span className="flex-2/5 text-lg">{item.equipmentName}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* <EquipmentStopForm /> */}
    </div>
  );
};

export default Home;
