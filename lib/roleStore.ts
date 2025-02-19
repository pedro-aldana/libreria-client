import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { create } from "zustand";

interface Role {
  id: number;
  name: string;
  description: string;
}

interface RoleStore {
  roles: Role[];
  listRoles: () => Promise<void>;
  createRole: (name: string, description: string) => Promise<void>;
  deleteRole: (id: number) => Promise<void>;
  isLoading: boolean; // Estado para manejar la carga
  error: string | null; // Estado para manejar errores
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

export const useRoleStore = create<RoleStore>((set, get) => ({
  roles: [],
  isLoading: false,
  error: null,

  listRoles: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/roles/`
      );
      set({ roles: response.data, isLoading: false });
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, isLoading: false });
    }
  },

  createRole: async (name, description) => {
    set({ isLoading: true, error: null });

    try {
      const token = getToken();
      const data = { name, description };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/roles/`,
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
          title: "Rol creado correctamente",
          variant: "default",
        });
      }
    } catch (error) {
      console.log("Error al crear un Rol", error);
      set({
        error: "Error al crear un Rol",
        isLoading: false,
      });
    }
  },

  deleteRole: async (id: number) => {
    const token = getToken();
    const { roles } = get();
    set({ isLoading: true, error: null });

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        roles: roles.filter((role) => role.id !== id),
        isLoading: false,
      });
    } catch (error) {
      console.log("Error al intentar eliminar rol", error);
      set({
        error: "Error al intentar eliminar rol",
        isLoading: false,
      });
    }
  },
}));
