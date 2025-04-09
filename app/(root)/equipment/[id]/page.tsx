import React from 'react';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation'; // Check it
import { equipment, equipmentStops } from '@/database/schema';
import { Button } from '@/components/ui/button';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  console.log('id', id);
  const [equipmentDetails] = await db
    .select()
    .from(equipment)
    .where(eq(equipment.id, id))
    .limit(1);

  if (!equipmentDetails) return notFound();
  console.log('equipmentDetails', equipmentDetails);

  const stops = await db
    .select()
    .from(equipmentStops)
    .where(eq(equipmentStops.equipmentId, id));

  const hasActiveStop = stops.some((stop) => stop.endStopDate === null);

  console.log('stops', stops);
  return (
    <div className="py-10 pb-20">
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
      <Button>Показати зупинки?</Button>
      {stops.length > 0 &&
        stops.map((stop) => (
          <div key={stop.id} className="mb-4 flex flex-col">
            <span className="font-semibold">stopType:</span>
            <p className="">{stop.stopType}</p>

            <span className="font-semibold">stopDate:</span>
            <p className="">{stop.stopDate}</p>
            <span className="font-semibold">stopTime:</span>
            <p className="">{stop.stopTime}</p>
            <span className="font-semibold">stopDescription:</span>
            <p className="">{stop.stopDescription}</p>
            <span className="font-semibold">nextSteps:</span>
            <p className="">{stop.nextSteps}</p>
            <span className="font-semibold">endStopDate:</span>
            <p className="">{stop.endStopDate}</p>
            <span className="font-semibold">endStopTime:</span>
            <p className="">{stop.endStopTime}</p>
          </div>
        ))}
    </div>
  );
};

export default page;
