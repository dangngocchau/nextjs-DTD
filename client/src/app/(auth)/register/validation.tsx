import { z } from "zod";

export const RegisterBody = z
  .object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export const MessageRes = z
  .object({
    message: z.string()
  })
  .strict()

export type MessageResType = z.TypeOf<typeof MessageRes>

export type RegisterResponseType = z.TypeOf<typeof RegisterRes>

export type RegisterBodyType = z.infer<typeof RegisterBody>;

export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
