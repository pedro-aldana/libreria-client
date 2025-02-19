import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios"; // Importar axios

interface User {
  id: number;
  username: string;
  email: string;
}

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover_image: string;
  rating: number;
  archive: string;
  created_at: string;
  user: User;
  category: Category;
}

interface BookStore {
  token: string | null;
  books: Book[];
  book: Book | null;
  listBook: () => Promise<void>;
  getBook: (bookId: number) => Promise<void>;
  getBookByAuthor: () => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useBookStore = create<BookStore>((set, get) => ({
  token: Cookies.get("token") || null,
  books: [],
  book: null,
  isLoading: false,
  error: null,

  listBook: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Book[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/book/list`
      );
      set({ books: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch books:", error);
      set({ error: "Failed to fetch books", isLoading: false });
    }
  },

  getBook: async (bookId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Book>(
        `${process.env.NEXT_PUBLIC_API_URL}/book/by_id/${bookId}`
      );
      set({ book: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch book:", error);
      set({ error: "Failed to fetch book", isLoading: false });
    }
  },

  getBookByAuthor: async () => {
    const { token } = get();

    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Book[]>( // Cambiado a Book[] para manejar una lista de libros
        `${process.env.NEXT_PUBLIC_API_URL}/book/my-books/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ books: response.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch books by author:", error);
      set({ error: "Failed to fetch books by author", isLoading: false });
    }
  },

  deleteBook: async (id: number) => {
    const { token, books } = get();
    set({ isLoading: true, error: null });

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/book/by_id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        books: books.filter((book) => book.id !== id), // Filtrar el usuario eliminado
        isLoading: false,
      });
    } catch (error) {
      console.log("Error al intentar eliminar el libro:", error);
      set({ error: "Error al intentar eliminar este libro", isLoading: false });
    }
  },
}));
