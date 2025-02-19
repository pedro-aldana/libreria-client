import React from "react";
import Image from "next/image";
import BookCover from "./components/BookCover/BookCover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileDown } from "lucide-react";

const BookOverview = async () => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>Programación Reactiva con React, NodeJS & MongoDB</h1>

        <div className="book-info">
          <p>
            Author{" "}
            <span className="font-semibold text-light-200">
              Oscar Javier Blancarte Iturralde
            </span>
          </p>

          <p>
            Categoria{" "}
            <span className="font-semibold text-light-200">Programacion</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>5</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Fecha de publicacion del libro <span></span>
          </p>

          <p>
            2018 <span></span>
          </p>
        </div>

        <p className="book-description"></p>

        <Link
          href="https://eizrx8a68s.ufs.sh/f/DMArLzfAtNuGTv1UtnkCs8xjRMU4DNGy3oaeYfrhtKuEFWBz"
          className="book-overvew_btn"
        >
          <Button className="w-full bg-red-600 hover:bg-red-400">
            <FileDown /> Leer PDF
          </Button>
        </Link>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover variant="wide" className="z-10" />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover variant="wide" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
