import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

interface Role {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  profile_img: string;
  banner_img: string;
  role: Role;
}

interface AuthStore {
  token: string | null;
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<boolean>;
  getUser: () => Promise<void>;
  getUsers: () => Promise<void>;
  updateUser: (
    email: string,
    newUsername?: string,
    newPassword?: string,
    newProfileImg?: string,
    newBannerImg?: string
  ) => Promise<void>;
  updateUserRole: (email: string, newRole: string) => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  logout: () => void;
  // Nueva función para obtener la longitud de usuarios
}

interface LoginResponse {
  access_token: string;
}

interface RegisterResponse {
  detail?: string;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: Cookies.get("token") || null,
  user: null,
  users: [],
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login/`,
        formData
      );

      const data: LoginResponse = res.data;
      Cookies.set("token", data.access_token, { expires: 15 });

      await get().getUser();

      set({ token: data.access_token, loading: false });
      return true;
    } catch (error) {
      console.error("Error en login:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail || "Error en el proceso de login";
        set({ error: errorMessage, loading: false });
      } else {
        set({
          error: "Error desconocido en el proceso de login",
          loading: false,
        });
      }

      return false;
    }
  },

  register: async (email, username, password) => {
    set({ loading: true, error: null });

    try {
      const userData = { email, username, password };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data: RegisterResponse = res.data;

      if (data.detail) {
        set({ error: data.detail || "Error en el registro", loading: false });
        return false;
      }

      set({ loading: false });
      return true;
    } catch (error) {
      console.error("Error en registro:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail || "Error en el proceso de registro";
        set({ error: errorMessage, loading: false });
      } else {
        set({
          error: "Error desconocido en el proceso de registro",
          loading: false,
        });
      }

      return false;
    }
  },

  getUser: async () => {
    const { token } = get();
    if (!token) {
      set({ error: "No token available" });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: User = response.data;
      Cookies.set("role", data.role.name, { expires: 15 });

      set({ user: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch user data:", error);

      if (axios.isAxiosError(error)) {
        set({ error: "Failed to fetch user data", loading: false });
      } else {
        set({
          error: "Error desconocido al obtener datos del usuario",
          loading: false,
        });
      }
    }
  },

  getUsers: async () => {
    const { token } = get();
    if (!token) {
      set({ error: "No token available" });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: User[] = response.data;

      set({ users: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch user data:", error);

      if (axios.isAxiosError(error)) {
        set({ error: "Failed to fetch user data", loading: false });
      } else {
        set({
          error: "Error desconocido al obtener datos del usuario",
          loading: false,
        });
      }
    }
  },

  updateUserRole: async (email: string, newRole: string) => {
    const { token, users } = get();
    if (!token) {
      set({ error: "No token available" });
      return;
    }

    set({ loading: true, error: null });

    try {
      // Hacer la solicitud a la API para actualizar el rol
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`, // Usar email en la URL
        { new_role_id: newRole }, // Enviar el nuevo rol como parte del cuerpo
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Actualizar el estado local
      set({
        users: users.map((user) =>
          user.email === email // Comparar por email en lugar de id
            ? { ...user, role: { ...user.role, name: newRole } } // Actualizar solo el nombre del rol
            : user
        ),
        loading: false,
      });
    } catch (error) {
      console.error("Error al actualizar el rol:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail || "Error al actualizar el rol";
        set({ error: errorMessage, loading: false });
      } else {
        set({
          error: "Error desconocido al actualizar el rol",
          loading: false,
        });
      }
    }
  },

  updateUser: async (
    email: string,
    newUsername?: string, // Hacer los campos opcionales
    newPassword?: string,
    newProfileImg?: File | string | null,
    newBannerImg?: File | string | null
  ) => {
    const { token } = get();
    if (!token) {
      set({ error: "No token available" });
      return;
    }

    set({ loading: true, error: null });

    try {
      // Crear un objeto FormData
      const formData = new FormData();
      formData.append("email", email);

      // Añadir solo los campos que tienen valores
      if (newUsername) {
        formData.append("new_username", newUsername);
      }
      if (newPassword) {
        formData.append("new_password", newPassword);
      }
      if (newProfileImg instanceof File) {
        formData.append("new_profile_img", newProfileImg);
      }
      if (newBannerImg instanceof File) {
        formData.append("new_banner_img", newBannerImg);
      }

      // Hacer la solicitud a la API usando FormData
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`,
        formData, // Enviar FormData
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Importante para archivos
          },
        }
      );

      // Actualizar el estado local si es necesario
    } catch (error) {
      console.error("Error al actualizar usuario:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail || "Error al actualizar usuario";
        set({ error: errorMessage, loading: false });
      } else {
        set({
          error: "Error desconocido al actualizar usuario",
          loading: false,
        });
      }
    }
  },

  deleteUser: async (email: string) => {
    const { token, users } = get(); // Obtener el token y la lista de usuarios actual
    if (!token) {
      set({ error: "No token available" });
      return;
    }

    set({ loading: true, error: null });

    try {
      // Hacer la solicitud a la API para eliminar el usuario
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Actualizar el estado local eliminando el usuario de la lista
      set({
        users: users.filter((user) => user.email !== email), // Filtrar el usuario eliminado
        loading: false,
      });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.detail || "Error al eliminar el usuario";
        set({ error: errorMessage, loading: false });
      } else {
        set({
          error: "Error desconocido al eliminar el usuario",
          loading: false,
        });
      }
    }
  },

  logout: () => {
    set({ token: null, user: null });
    Cookies.remove("token");
    Cookies.remove("role");
  },
}));
