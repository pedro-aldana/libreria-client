import { z } from "zod";

export const formSchema = z.object({
  new_username: z.string(),
  new_password: z.string(),
  new_profile_img: z.string(),
  new_banner_img: z.string(),
});
