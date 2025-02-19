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
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { formSchema } from "./BookForm.form";
import { UploadButton } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/lib/categoryStore";
import { useBookFormStore } from "@/lib/bookFormStore"; // Importa el store
import { toast } from "@/hooks/use-toast";

export default function BookForm() {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const { categories, listCategory } = useCategoryStore();
  const { createBook, isLoading } = useBookFormStore(); // Usa el store

  useEffect(() => {
    listCategory();
  }, [listCategory]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      cover_image: "",
      rating: 1,
      archive: "",
      category_id: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.cover_image || !values.archive) {
      toast({
        title: "Error",
        description: "Debes subir una imagen de portada y un archivo",
        variant: "destructive",
      });
      return;
    }

    await createBook(values); // Usa la función del store
    form.reset();
    setPhotoUploaded(false);
    setFileUploaded(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input required placeholder="Book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input required placeholder="Book author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Category
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="border border-gray-300 p-2 rounded-md"
                >
                  <option value={0} disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book rating"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cover_image"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Cover Image
              </FormLabel>
              <FormControl>
                {photoUploaded ? (
                  <p className="text-sm">Imagen subida con éxito</p>
                ) : (
                  <UploadButton
                    className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                    {...field}
                    endpoint="photo"
                    onClientUploadComplete={(res) => {
                      form.setValue("cover_image", res?.[0].url);
                      setPhotoUploaded(true);
                    }}
                    onUploadError={(error: Error) => {
                      console.error(error);
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="archive"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Upload Book File (PDF, DOCX, TXT)
              </FormLabel>
              <FormControl>
                {fileUploaded ? (
                  <p className="text-sm">Archivo subido con éxito</p>
                ) : (
                  <UploadButton
                    className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                    {...field}
                    endpoint="document"
                    onClientUploadComplete={(res) => {
                      form.setValue("archive", res?.[0].url);
                      setFileUploaded(true);
                    }}
                    onUploadError={(error: Error) => {
                      console.error(error);
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Book description" {...field} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="book-form_btn text-white"
          disabled={isLoading} // Deshabilita el botón mientras se carga
        >
          {isLoading ? "Agregando libro..." : "Agregar libro a la libreria"}
        </Button>
      </form>
    </Form>
  );
}
