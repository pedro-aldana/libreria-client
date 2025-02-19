"use client";

import React, { useEffect } from "react";
import BookCard from "./components/BookCard/BookCard";
import { useBookStore } from "@/lib/bookStore";

export default function BookList() {
  const { books, listBook } = useBookStore();

  useEffect(() => {
    listBook();
  }, []);

  return (
    <section className="mt-12">
      <h2 className="font-bebas-neue text-4xl text-light-100">
        Últimos Libros Publicados
      </h2>

      <ul className="book-list">
        {books
          .slice(-4) // 🔥 Toma los últimos 5 libros
          .reverse() // 🔄 Opcional: Muestra en orden descendente
          .map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
      </ul>
    </section>
  );
}
