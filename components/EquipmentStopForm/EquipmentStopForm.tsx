'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const formSchema = z.object({
  inventory_number: z.string(),
  equipment_name: z.string(),
  stop_type: z.enum(
    ['planned-stop', 'service-stop', 'readjustment-stop', 'failure-stop'],
    {
      errorMap: () => ({ message: 'Оберіть тип зупинки.' }),
    }
  ),
  date: z.date(),
  time: z.string(),
});

const EquipmentStopForm = () => {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inventory_number: '',
      equipment_name: '',

      stop_type: 'failure-stop',
      // Format the date to 'YYYY-MM-DD' format
      date: new Date(), // Current date
      time: new Date().toTimeString().slice(0, 5), // HH:MM
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (
    values: z.infer<typeof formSchema>
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.success(`Супер`, {
      description: `Ви успішно увійшли`,
      action: {
        label: 'X',
        onClick: () => console.log('Toast dismissed'),
      },
    });
    form.reset(); // Reset the form after submission
  };
  return (
    <div>
      <h1 className="mb-5 text-center form-title">Зупинка обладнання</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col"
        >
          {/* Inventory-number */}
          <FormField
            control={form.control}
            name="inventory_number"
            render={({ field }) => (
              <FormItem className="mb-6 flex items-center gap-5">
                <FormLabel className="flex-2/4 md:flex-1/4">
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
                <FormLabel className="flex-2/4 md:flex-1/4">
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
          {/* Type Stop */}
          <FormField
            control={form.control}
            name="stop_type"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="mb-4">Тип зупинки обладнання</FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    className="mx-auto flex flex-wrap items-center justify-center gap-6"
                    defaultValue="failure-stop"
                  >
                    <div className="flex gap-6">
                      <ToggleGroupItem
                        value="planned-stop"
                        className="toggle-input"
                      >
                        <div>Планова</div>
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="service-stop"
                        className="toggle-input"
                      >
                        <div>Обслуговування</div>
                      </ToggleGroupItem>
                    </div>
                    <div className="flex gap-6">
                      <ToggleGroupItem
                        value="readjustment-stop"
                        className="toggle-input"
                      >
                        <div>Переналагодження</div>
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="failure-stop"
                        className="toggle-input"
                      >
                        <div>Аварія</div>
                      </ToggleGroupItem>
                    </div>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel className="mb-4">Час зупинки</FormLabel>
          <FormLabel className="mb-4 text-dark-200">Початок зупинки</FormLabel>
          <div className="mx-auto flex gap-40">
            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Дата</FormLabel>
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
                          initialFocus
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
              name="time"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Час</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="w-[100px]! justify-between"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="form-btn">
            Увійти
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentStopForm;
