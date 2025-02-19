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
import { formSchema } from "./ProfileForm.form";
import { useAuthStore } from "@/lib/authStore";
import { useEffect } from "react";

export default function ProfileForm() {
  const { updateUser, getUser, user, loading } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_username: "",
      new_password: "",
      new_profile_img: "",
      new_banner_img: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user) {
        throw new Error("usuario invalido");
      }
      await updateUser(user.email, values.new_username);
      form.reset();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="new_username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Nuevo username
              </FormLabel>
              <FormControl>
                <Input required placeholder="Nuevo username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Nueva contraseña
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nueva contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_profile_img"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Nueva imagen de perfil
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_banner_img"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Nueva imagen de banner
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="book-form_btn text-white"
          disabled={loading}
        >
          {loading ? "Actualizando perfil..." : "Actualizar perfil"}
        </Button>
      </form>
    </Form>
  );
}
