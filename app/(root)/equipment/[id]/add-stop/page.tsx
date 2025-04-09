import React from 'react';
import EquipmentStopForm from '@/components/EquipmentStopForm/EquipmentStopForm';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation'; // Check it
import { equipment } from '@/database/schema';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [equipmentDetails] = await db
    .select()
    .from(equipment)
    .where(eq(equipment.id, id))
    .limit(1);

  if (!equipmentDetails) return notFound(); // redo it
  return (
    <div className="pt-10 pb-20">
      <EquipmentStopForm equipmentDetails={equipmentDetails} />
    </div>
  );
};

export default page;
