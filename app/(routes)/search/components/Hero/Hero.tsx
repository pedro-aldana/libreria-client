"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<
    { id: number; title: string; author: string; cover_image: string }[]
  >([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/book/search/?query=${query}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log("Error fetching books.", error);
    }

    setLoading(false);
    setHasSearched(true);
  };

  const clearSearch = () => {
    setQuery("");
    setResult([]);
    setHasSearched(false);
  };

  return (
    <div className="flex flex-col items-center pt-20 px-4 -mt-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <p className="text-sm text-gray-400 tracking-wider uppercase">
          Descubre tu próxima gran lectura:
        </p>
        <h1 className="text-6xl font-semibold text-white">Explora y busca</h1>
        <p className="text-2xl text-[#E6C992]">
          Cualquier libro de nuestra biblioteca
        </p>

        <form onSubmit={handleSearch} className="mt-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Libro de Programacion"
              className="w-full bg-[#1A1B1F] border-0 pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-[#E6C992] rounded-md"
            />
          </div>
        </form>

        {hasSearched && (
          <div className="mt-16 flex flex-col items-center space-y-4">
            {loading ? (
              <p className="text-white">Buscando...</p>
            ) : result.length > 0 ? (
              <ul className="text-white space-y-2">
                {result.map((book) => (
                  <li key={book.id} className="text-lg">
                    <Link href={`/books/${book.id}`}>
                      📖 {book.title} - Author {book.author}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#1A1B1F] flex items-center justify-center">
                    <X className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <h2 className="text-white font-medium">
                  No Se encontraron Resultados
                </h2>
                <p className="text-gray-400 text-sm text-center max-w-[250px]">
                  No pudimos encontrar resultados que coincidieran con su
                  búsqueda.
                </p>
              </>
            )}
            <Button
              onClick={clearSearch}
              className="mt-4 bg-[#E6C992] text-black hover:bg-[#d4b87f] px-8"
            >
              CERRAR SEARCH
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
