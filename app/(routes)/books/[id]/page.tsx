"use client";
import { useEffect } from "react";
import { useBookStore } from "@/lib/bookStore";
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";

import BookImage from "./components/BookImage/BookImage";
import Link from "next/link";

export default function DetailPage() {
  const { book, isLoading, error, getBook } = useBookStore();
  const params = useParams();
  const bookId = params.id;

  useEffect(() => {
    if (bookId) {
      getBook(Number(bookId));
    }
  }, [bookId, getBook]);

  if (isLoading) return <div>Loading...</div>; // Mostrar un mensaje de carga
  if (error) return <div>Error: {error}</div>; // Mostrar un mensaje de error
  if (!book) return <div>No book found</div>; // Mostrar un mensaje si no hay libro

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h2 className="text-2xl text-light-300 font-bold">{book.title}</h2>

        <div className="book-info">
          <p>
            Author{" "}
            <span className="font-semibold text-light-200">{book.author}</span>
          </p>
          <p>
            Categoria{" "}
            <span className="font-semibold text-light-200">
              {book.category.name}
            </span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{book.rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Publicado por <span>{book.user.username}</span>
          </p>

          <p>
            Fecha de publicacion <span>13/02/2025</span>
          </p>
        </div>
        <p className="book-description">{book.description}</p>

        <Link href={book.archive} className="book-overvew_btn">
          <Button className="w-full bg-red-600 hover:bg-red-400">
            <FileDown /> Leer PDF
          </Button>
        </Link>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookImage variant="wide" className="z-10" image={book.cover_image} />
        </div>

        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
          <BookImage variant="wide" image={book.cover_image} />
        </div>
      </div>
    </section>
  );
}
