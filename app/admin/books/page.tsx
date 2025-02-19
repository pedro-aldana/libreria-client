"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import TableBooks from "./components/TableBooks/TableBooks";
import { useBookStore } from "@/lib/bookStore";

export default function BooksPage() {
  const { getBookByAuthor, books, isLoading, error } = useBookStore();

  useEffect(() => {
    getBookByAuthor();
  }, [getBookByAuthor]);

  if (isLoading) {
    return <div>Cargando libros...</div>; // Mensaje de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Manejo de errores reales
  }

  // Si no hay libros, mostrar un mensaje amigable
  if (books.length === 0) {
    return (
      <section className="w-full rounded-2xl bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Todos mis libros</h2>
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new">+ Publicar un nuevo libro</Link>
          </Button>
        </div>

        <div className="mt-7 w-full text-center">
          <p className="text-gray-500">Aún no tienes libros publicados.</p>
        </div>
      </section>
    );
  }

  // Si hay libros, mostrar la tabla
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Todos mis libros</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new">+ Publicar un nuevo libro</Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <TableBooks books={books} />
      </div>
    </section>
  );
}
