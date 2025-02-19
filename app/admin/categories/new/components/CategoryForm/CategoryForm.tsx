"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { formSchema } from "./CategoryForm.form";
import axios from "axios";
import { useCategoryStore } from "@/lib/categoryStore";

export default function CategoryForm() {
  const { createCategory, loading } = useCategoryStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createCategory(values.name);
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          form.setError("name", {
            type: "manual",
            message:
              error.response.data.message || "Error al crear la categoría",
          });
        }
      } else {
        console.error("Error desconocido:", error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Nombre de la categoria
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Nombre de la categoria"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="book-form_btn text-white"
          disabled={loading} // Deshabilita el botón mientras se carga
        >
          {loading ? "Añadiendo Categoria..." : "Añadir una nueva categoria"}
        </Button>
      </form>
    </Form>
  );
}
