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
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const formSchema = z.object({
  inventory_number: z.string().min(5, {
    message: 'Ім’я повинно містити щонайменше 5 символів.',
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
                  <Input {...field} />
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
