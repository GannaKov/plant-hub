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
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { createEquipmentStop } from '@/lib/actions/equipments';

const formSchema = z.object({
  inventory_number: z.string(),
  equipment_name: z.string(),
  stop_type: z.enum(
    ['planned-stop', 'service-stop', 'readjustment-stop', 'failure-stop'],
    {
      errorMap: () => ({ message: 'Оберіть тип зупинки.' }),
    }
  ),
  stop_date: z.date(),
  stop_time: z.string(),
  stop_description: z.string().min(1, { message: 'Опис обовʼязковий' }),
  next_steps: z.string().min(1, { message: 'Це поле обовʼязкове' }),
});

const EquipmentStopForm = ({
  equipmentDetails,
}: {
  equipmentDetails: Equipment;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inventory_number: equipmentDetails.inventoryNumber,
      equipment_name: equipmentDetails.equipmentName,

      stop_type: 'failure-stop',
      // Format the date to 'YYYY-MM-DD' format
      stop_date: new Date(), // Current date
      stop_time: new Date().toTimeString().slice(0, 5), // HH:MM
      stop_description: '',
      next_steps: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>
  ) => {
    const dataToInsert = {
      equipmentId: equipmentDetails.id,
      stopType: values.stop_type,
      stopDescription: values.stop_description,
      stopDate: values.stop_date,
      stopTime: values.stop_time,
      nextSteps: values.next_steps,
    };
    const result = await createEquipmentStop({
      ...dataToInsert,
    });
    // Do something with the form values.
    // This will be type-safe and validated.
    // console.log(values);
    if (result.success) {
      toast.success(`Дякуємо`, {
        description: `Ви успішно відправили форму`,
        action: {
          label: 'X',
          onClick: () => console.log('Toast dismissed'),
        },
      });
      router.push(`/equipment/${equipmentDetails.id}`);
      //form.reset(); // Reset the form after submission
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
          {/* Type Stop */}
          <FormField
            control={form.control}
            name="stop_type"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="mb-4 label-input">
                  Тип зупинки обладнання
                </FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    className="mx-auto flex flex-wrap items-center justify-center gap-6"
                    defaultValue="failure-stop"
                    onValueChange={field.onChange}
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
          <div className="flex flex-col">
            <FormLabel className="mb-4 label-input">Час зупинки</FormLabel>
            <FormLabel className="mb-4 text-base text-dark-200">
              Початок зупинки
            </FormLabel>
            <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:gap-40">
              {/* Date */}
              <FormField
                control={form.control}
                name="stop_date"
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
                name="stop_time"
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
          <FormField
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
          />
          {/* Next Steps */}
          <FormField
            control={form.control}
            name="next_steps"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Наступні кроки</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Що потрібно зробити далі"
                    className="h-48 border-sidebar-ring!"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="equipment-form-btn">
            Зареєструвати
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentStopForm;
