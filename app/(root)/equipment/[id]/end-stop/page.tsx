import React from 'react';

import { db } from '@/database/drizzle';
import { eq, and, isNull } from 'drizzle-orm';
import { notFound } from 'next/navigation'; // Check it
import { equipment, equipmentStops } from '@/database/schema';
import EquipmentEndStopForm from '@/components/EquipmentEndStopForm/EquipmentEndStopForm';
import GoToPageButton from '@/components/GoToPageButton';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [equipmentDetails] = await db
    .select()
    .from(equipment)
    .where(eq(equipment.id, id))
    .limit(1);

  if (!equipmentDetails) return notFound(); // redo it
  const [activeStop] = await db
    .select({
      stopDate: equipmentStops.stopDate,
      stopTime: equipmentStops.stopTime,
      stopType: equipmentStops.stopType,
      stopId: equipmentStops.id,
    })
    .from(equipmentStops)
    .where(
      and(
        eq(equipmentStops.equipmentId, id),
        isNull(equipmentStops.endStopDate)
      )
    )
    .orderBy(equipmentStops.createdAt)
    .limit(1);

  if (!equipmentDetails || !activeStop) return notFound(); // redo it
  return (
    <div className="pt-10 pb-20">
      <GoToPageButton
        destination={`/equipment/${equipmentDetails.id}`}
        text={`До ${equipmentDetails.inventoryNumber}`}
      />
      <EquipmentEndStopForm
        equipmentDetails={equipmentDetails}
        activeStop={activeStop}
      />
    </div>
  );
};

export default page;
