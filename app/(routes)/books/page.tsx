"use client";

import { useEffect, useState } from "react";
import BookCover from "./components/BookCover/BookCover";
import { BookFilters } from "./components/BookFilters";
import { useBookStore } from "@/lib/bookStore";
import { useCategoryStore } from "@/lib/categoryStore";

export default function BooksPage() {
  const { books, listBook } = useBookStore();
  const { categories, listCategory } = useCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    listBook();
    listCategory();
  }, []);

  const filteredBooks = books.filter((book) => {
    const categoryMatch =
      !selectedCategory || book.category.name === selectedCategory;

    if (!categoryMatch) return false;

    const bookDate = new Date(book.archive); // Asegúrate de que `archive` tiene la fecha correcta
    const now = new Date();

    switch (dateFilter) {
      case "year":
        return bookDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      case "month":
        return bookDate >= new Date(now.setMonth(now.getMonth() - 1));
      case "week":
        return bookDate >= new Date(now.setDate(now.getDate() - 7));
      default:
        return true;
    }
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-light-200">Book Library</h1>

      <BookFilters
        categories={categories.map((c) => c.name)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onDateFilterChange={setDateFilter}
      />

      {/* Ajuste en la cuadrícula para evitar que se superpongan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 mt-8">
        {filteredBooks.map((book) => (
          <BookCover
            key={book.id}
            id={book.id}
            title={book.title}
            category={book.category.name}
            coverUrl={book.cover_image}
          />
        ))}
      </div>
    </div>
  );
}
