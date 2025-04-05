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

const formSchema = z.object({
  inventory_number: z.string(),
  equipment_name: z.string(),
  stop_type: z.enum(['a', 'b', 'c', 'd'], {
    errorMap: () => ({ message: 'Оберіть тип зупинки.' }),
  }),
  password: z.string().min(6, {
    message: 'Пароль повинен містити щонайменше 6 символів.',
  }),
});

const EquipmentStopForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inventory_number: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

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
          {/* Pasword */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel className="capitalize">Пароль</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      style={{
                        //   backgroundColor: 'white',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'white',
                      }}
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2 transform"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <FormDescription>Введіть ваш пароль.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="form-btn">
            Увійти
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentStopForm;
