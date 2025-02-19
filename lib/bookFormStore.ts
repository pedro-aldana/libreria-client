import { create } from "zustand";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface BookFormStore {
  isLoading: boolean;
  error: string | null;
  createBook: (values: {
    title: string;
    author: string;
    description: string;
    cover_image: string;
    rating: number;
    archive: string;
    category_id: number;
  }) => Promise<void>;

  updateBook: (
    book_id: number,
    values: {
      title: string;
      author: string;
      description: string;
      category_id: number;
    }
  ) => Promise<void>;
}

export const useBookFormStore = create<BookFormStore>((set) => ({
  isLoading: false,
  error: null,

  createBook: async (values) => {
    set({ isLoading: true, error: null });

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        toast({
          title: "Error",
          description: "No estás autenticado",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/book/create/`,
        values,
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Libro agregado correctamente",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error al crear el libro:", error);
      set({ error: "Error al crear el libro" });
      toast({
        title: "Error",
        description: "Hubo un problema al crear el libro",
        variant: "destructive",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateBook: async (book_id, values) => {
    set({ isLoading: true, error: null });

    try {
      if (!book_id) {
        toast({
          title: "Error",
          description: "ID del libro no proporcionado",
          variant: "destructive",
        });
        return;
      }

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        toast({
          title: "Error",
          description: "No estás autenticado",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/book/by_id/${book_id}`,
        values,
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Libro actualizado correctamente",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
      set({ error: "Error al actualizar el libro" });
      toast({
        title: "Error",
        description: "Hubo un problema al actualizar el libro",
        variant: "destructive",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
