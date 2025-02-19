import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import BookForm from "./components/BookForm/BookForm";
import { MoveLeft } from "lucide-react";

export default function NewBookPage() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <MoveLeft />
          Volver atras
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
}
