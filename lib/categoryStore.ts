import { create } from "zustand";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: number;
  name: string;
  created_at: string;
}

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  listCategory: () => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const getToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  if (!token) {
    throw new Error("No se encontró el token de autenticación");
  }
  return token;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  listCategory: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get<Category[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/category/list`
      );

      set({ categories: response.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch categories:", error);

      let errorMessage = "Error al cargar las categorías";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || errorMessage;
      }

      set({ error: errorMessage, loading: false });
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  },

  createCategory: async (name) => {
    set({ loading: true, error: null });

    try {
      const token = getToken();

      const data = { name };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/category/create/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast({
          title: "Categoría agregada correctamente",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error al crear una categoría:", error);

      let errorMessage = "Hubo un problema al crear una categoría";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || errorMessage;
      }

      set({ error: errorMessage });
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id: number) => {
    const token = getToken();
    const { categories } = get();
    set({ loading: true, error: null });

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/category/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({
        categories: categories.filter((category) => category.id !== id), // Filtrar el usuario eliminado
        loading: false,
      });
    } catch (error) {
      console.log("Error al intentar eliminar una actegoria", error);
      set({
        error: "Error al intentar eliminar una actegoria",
        loading: false,
      });
    }
  },
}));
