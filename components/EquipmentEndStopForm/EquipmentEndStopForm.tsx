'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { updateEquipmentStop } from '@/lib/actions/equipments';
// !!! Add later check if endDate is after start!!!!!
const formSchema = z.object({
  inventory_number: z.string(),
  equipment_name: z.string(),
  end_date: z.date(),
  end_time: z.string(),
});

const EquipmentEndStopForm = ({
  equipmentDetails,
  activeStop,
}: {
  equipmentDetails: Equipment;
  activeStop: ActiveStopFormData;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inventory_number: equipmentDetails.inventoryNumber,
      equipment_name: equipmentDetails.equipmentName,
      // Format the date to 'YYYY-MM-DD' format
      end_date: new Date(), // Current date
      end_time: new Date().toTimeString().slice(0, 5), // HH:MM
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const dataToInsert = {
      endDate: values.end_date,
      endTime: values.end_time,
    };
    const result = await updateEquipmentStop(activeStop.stopId, {
      ...dataToInsert,
    });
    console.log('result', result);

    if (result.success) {
      toast.success(`Дякуємо`, {
        description: `Ви успішно відправили форму`,
        action: {
          label: 'X',
          onClick: () => console.log('Toast dismissed'),
        },
      });
      router.push(`/equipment/${equipmentDetails.id}`);
    } else {
      toast.success(`Ох ні`, {
        description: `Щось трапилось, спробуйте ще раз`,
        action: {
          label: 'X',
          onClick: () => console.log('Toast dismissed'),
        },
      });
    }
  };
  return (
    <div>
      <h1 className="mb-8 text-center form-title">Зупинка обладнання</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-8"
        >
          {/* Inventory-number */}
          <FormField
            control={form.control}
            name="inventory_number"
            render={({ field }) => (
              <FormItem className="mb-6 flex items-center gap-5">
                <FormLabel className="flex-2/4 label-input md:flex-1/4">
                  Інвентарний номер
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    className="white-form-input bg-input"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Equipment name */}
          <FormField
            control={form.control}
            name="equipment_name"
            render={({ field }) => (
              <FormItem className="mb-6 flex items-center gap-5">
                <FormLabel className="flex-2/4 label-input md:flex-1/4">
                  Назва обладнання
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly
                    className="white-form-input bg-input"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* --------------------- */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-4 xs:flex-row xs:gap-12">
              <div className="flex gap-4">
                <span className="font-semibold text-red-600">
                  Дата зупинки:
                </span>
                <p>{activeStop.stopDate}</p>
              </div>

              <div className="flex gap-4">
                <span className="font-semibold text-red-600">Час зупинки:</span>
                <p>{activeStop.stopTime}</p>
              </div>
            </div>
            <span className="font-semibold text-red-600">Тип зупинки:</span>
            <p>{activeStop.stopType}</p>
          </div>

          {/* --------------------- */}
          <div className="flex flex-col">
            <FormLabel className="mb-4 justify-center text-2xl label-input font-semibold">
              Завершення зупинки
            </FormLabel>

            <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:gap-40">
              {/* Date */}
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="flex justify-center">Дата</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[200px] justify-between text-left font-normal"
                          >
                            {field.value
                              ? field.value.toLocaleDateString()
                              : 'Оберіть дату'}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Time */}
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem className="mx-auto mb-6">
                    <FormLabel className="flex justify-center">Час</FormLabel>
                    <FormControl>
                      <div className="relative w-[100px]">
                        <Clock className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2" />
                        <Input
                          type="time"
                          {...field}
                          className="custom-time-input w-[100px]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Description */}
          {/* <FormField
            control={form.control}
            name="stop_description"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Опис</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Опишіть проблему або ситуацію"
                    className="h-48 border-sidebar-ring!"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit" className="equipment-form-btn">
            Зареєструвати
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentEndStopForm;
