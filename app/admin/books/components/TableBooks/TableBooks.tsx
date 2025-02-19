"use client"; // Asegúrate de que este componente sea del lado del cliente

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react"; // Importar useState para manejar el estado del modal
import EditBookModal from "../EditBookModal/EditBookModal";
import { useBookStore } from "@/lib/bookStore";

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: Category;
  created_at: string;
  cover_image: string;
}

// Definir las props del componente TableBooks
interface TableBooksProps {
  books: Book[]; // books es un array de Book
}

export default function TableBooks({ books }: TableBooksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Estado para almacenar el libro seleccionado

  const { deleteBook } = useBookStore();
  // Función para abrir el modal y establecer el libro seleccionado
  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteBook = async (id: number) => {
    deleteBook(id);
  };

  return (
    <div>
      <div className="container mx-auto py-6">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-8 overflow-hidden rounded">
                        <Image
                          src={book.cover_image || "/placeholder.svg"}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium hover:text-primary cursor-pointer">
                        <Link href={`/books/${book.id}`}>{book.title}</Link>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category.name}</TableCell>
                  <TableCell>
                    {new Date(book.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="Edit book"
                        onClick={() => handleEditClick(book)} // Abrir modal al hacer clic
                      >
                        <PenLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        aria-label="Delete book"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal para actualizar el libro */}
      {isModalOpen && selectedBook && (
        <EditBookModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </div>
  );
}
