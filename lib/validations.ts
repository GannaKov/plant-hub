import { z } from 'zod';

export const signInSchema = z.object({
  login: z.string().min(5, {
    message: 'Ім’я повинно містити щонайменше 5 символів.',
  }),
  password: z.string().min(6, {
    message: 'Пароль повинен містити щонайменше 6 символів.',
  }),
});
