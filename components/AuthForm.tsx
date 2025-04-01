'use client';
import React from 'react';
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
  username: z.string().min(5, {
    message: 'Ім’я повинно містити щонайменше 5 символів.',
  }),
  password: z.string().min(6, {
    message: 'Пароль повинен містити щонайменше 6 символів.',
  }),
});

const AuthForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Логін</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Введіть ваш логін.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Pasword */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>Введіть ваш пароль.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Увійти</Button>
      </form>
    </Form>
  );
};

export default AuthForm;
