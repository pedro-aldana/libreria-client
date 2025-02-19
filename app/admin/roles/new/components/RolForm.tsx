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
import { formSchema } from "./RolForm.form";
import axios from "axios";
import { useRoleStore } from "@/lib/roleStore";

export default function RolForm() {
  const { createRole, isLoading } = useRoleStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createRole(values.name, values.description);
      form.reset(); // Reinicia el formulario después de una creación exitosa
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          // Establece errores para cada campo individualmente
          if (error.response.data.message.includes("name")) {
            form.setError("name", {
              type: "manual",
              message: error.response.data.message,
            });
          }
          if (error.response.data.message.includes("description")) {
            form.setError("description", {
              type: "manual",
              message: error.response.data.message,
            });
          }
        } else {
          console.error("Error en la solicitud:", error.response?.data.message);
        }
      } else {
        console.error("Error desconocido:", error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo para el nombre del rol */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Nombre del rol
              </FormLabel>
              <FormControl>
                <Input required placeholder="Nombre del rol" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo para la descripción del rol */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Descripción del rol
              </FormLabel>
              <FormControl>
                <Input required placeholder="Descripción del rol" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de envío */}
        <Button
          type="submit"
          className="book-form_btn text-white"
          disabled={isLoading} // Deshabilita el botón mientras se carga
        >
          {isLoading ? "Añadiendo Rol..." : "Añadir un nuevo Rol"}
        </Button>
      </form>
    </Form>
  );
}
