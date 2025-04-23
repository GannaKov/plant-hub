'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { signInWithCredentials } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';
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
  login: z.string().min(5, {
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
      login: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values: z.infer<typeof formSchema>
  ) => {
    // Do something with the form values.
    const result = await signInWithCredentials(values);
    // ✅ This will be type-safe and validated.
    if (result.success) {
      toast.success(`Супер`, {
        description: `Ви успішно увійшли`,
        action: {
          label: 'X',
          onClick: () => console.log('Toast dismissed'),
        },
      });
      router.push('/');
    } else {
      toast.warning(`Щось трапилось`, {
        description: result.error ?? 'Помилка входу',
        action: {
          label: 'X',
          onClick: () => console.log('Toast dismissed'),
        },
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        {/* Username */}
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="capitalize">Логін</FormLabel>
              <FormControl>
                <Input {...field} className="h-14" />
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
            <FormItem className="mb-8">
              <FormLabel className="capitalize">Пароль</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="h-14"
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
  );
};

export default AuthForm;
