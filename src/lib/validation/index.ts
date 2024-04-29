import { z } from "zod";
export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "The Name Entered is too short" }),
  username: z.string().min(2, { message: "The Username entered is too short" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "The Password entered is too short" }),
});
