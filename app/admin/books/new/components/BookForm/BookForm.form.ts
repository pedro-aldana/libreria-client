import { z } from "zod";

export const formSchema = z.object({
  title: z.string().nonempty("requerido"),
  author: z.string().nonempty(" requerido"),
  description: z.string().nonempty(" requerido"),
  cover_image: z.string().nonempty(" requerido"),
  rating: z.coerce.number().min(1, "Precio requerido"),
  archive: z.string().nonempty(" requerido"),
  category_id: z.coerce.number().min(1, " requerido"),
});
