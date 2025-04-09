import React from 'react';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';

import { notFound } from 'next/navigation'; // Check it
import { equipment, equipmentStops } from '@/database/schema';

import EquipmentStopsToggle from '@/components/EquipmentStopsToggle';
import Link from 'next/link';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [equipmentDetails] = await db
    .select()
    .from(equipment)
    .where(eq(equipment.id, id))
    .limit(1);

  if (!equipmentDetails) return notFound(); // redo it

  const stops = await db
    .select()
    .from(equipmentStops)
    .where(eq(equipmentStops.equipmentId, id));

  const hasActiveStop = stops.some((stop) => stop.endStopDate === null);

  return (
    <div className="py-10 pb-20">
      {hasActiveStop ? (
        <Link href={`/equipment/${id}/end-stop`} className="bg-chart-2">
          Повідомити про кінець зупинки
        </Link>
      ) : (
        <Link href={`/equipment/${id}/add-stop`} className="bg-destructive">
          Повідомити про зупинку
        </Link>
      )}
      <h1 className="mb-8 flex items-center justify-center gap-3 text-center form-title">
        {equipmentDetails.equipmentName}
        {hasActiveStop ? (
          <span className="inline-block h-4 w-4 rounded-full bg-red-600" />
        ) : (
          <span className="inline-block h-4 w-4 rounded-full bg-green-500" />
        )}
      </h1>
      <div className="mb-4 flex flex-col text-lg">
        <span className="font-semibold">inventoryNumber:</span>
        <p className="">{equipmentDetails.inventoryNumber}</p>
        <span className="font-semibold">equipmentName:</span>
        <p className="">{equipmentDetails.equipmentName}</p>
        <span className="font-semibold">equipmentType:</span>
        <p className="">{equipmentDetails.equipmentType}</p>
        <span className="font-semibold">description:</span>
        <p className="">{equipmentDetails.description}</p>
      </div>
      <EquipmentStopsToggle stops={stops} />
    </div>
  );
};

export default page;
