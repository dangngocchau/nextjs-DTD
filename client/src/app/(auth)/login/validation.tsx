import { z } from 'zod';
import { RegisterRes } from '../register/validation';

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();



export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginResponse = RegisterRes;

export type LoginResponseType = z.infer<typeof LoginResponse>;