'use server';

import { equipmentStops } from '@/database/schema';
import { db } from '@/database/drizzle';
import { formatDate } from '../utils';

export const createEquipmentStop = async (params: NewEquipmentStop) => {
  try {
    const result = await db.insert(equipmentStops).values({
      ...params,
      stopDate: formatDate(params.stopDate), // formatting the date for the database
    });
    //   .returning();

    return {
      success: true,
      message: 'Equipment stop created successfully',
      //   data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'An error occurred while creating the equipment stop',
    };
  }
};
