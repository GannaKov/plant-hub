'use server';

import { equipmentStops } from '@/database/schema';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { formatDate } from '../utils';

export const createEquipmentStop = async (params: NewEquipmentStop) => {
  try {
    await db.insert(equipmentStops).values({
      ...params,
      stopDate: formatDate(params.stopDate), // formatting the date for the database
    });
    return {
      success: true,
      message: 'Equipment stop created successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred while creating the equipment stop',
    };
  }
};

type EquipmentStopFormValues = {
  endDate: Date;
  endTime: string;
};

export const updateEquipmentStop = async (
  activeStopId: string,
  values: EquipmentStopFormValues
) => {
  const formatEndDate = await formatDate(values.endDate); // formatting the date for the database

  try {
    const result = await db
      .update(equipmentStops)
      .set({
        endStopDate: formatEndDate,
        endStopTime: values.endTime,
      })
      .where(eq(equipmentStops.id, activeStopId)); // update the stop with the given id

    if (result.rowCount > 0) {
      return {
        success: true,
        message: 'Equipment stop updated successfully',
      };
    } else {
      return {
        success: false,
        message: 'No matching equipment stop found',
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while updating the equipment stop',
    };
  }
};
