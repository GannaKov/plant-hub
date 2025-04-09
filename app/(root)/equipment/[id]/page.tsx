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
        <Link
          href={`/equipment/${id}/end-stop`}
          className="h-10 rounded-md bg-chart-2 px-6 py-2 text-base font-medium text-white shadow-sm transition-all hover:bg-chart-2/90"
        >
          Повідомити про кінець зупинки
        </Link>
      ) : (
        <Link
          href={`/equipment/${id}/add-stop`}
          className="h-10 rounded-md bg-destructive px-6 py-2 text-base font-medium text-white shadow-sm transition-all hover:bg-destructive/90"
        >
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
        <span className="font-semibold">Інвентарний номер:</span>
        <p className="">{equipmentDetails.inventoryNumber}</p>
        <span className="font-semibold">Назва обладнання:</span>
        <p className="">{equipmentDetails.equipmentName}</p>
        <span className="font-semibold">Тип обладнання:</span>
        <p className="">{equipmentDetails.equipmentType}</p>
        <span className="font-semibold">Опис:</span>
        <p className="">{equipmentDetails.description}</p>
      </div>
      <EquipmentStopsToggle stops={stops} />
    </div>
  );
};

export default page;
