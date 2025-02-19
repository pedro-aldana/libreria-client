"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import TableCategories from "./components/TableCategories/TableCategories";
import { useCategoryStore } from "@/lib/categoryStore";

export default function CategoriesPage() {
  const { listCategory, categories, loading, error } = useCategoryStore();

  useEffect(() => {
    listCategory();
  }, [listCategory]);

  if (loading) {
    return <div>Cargando categorias...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (categories.length === 0) {
    return (
      <section className="w-full rounded-2xl bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Todos mis Categorias</h2>
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/categories/new">
              + Publicar una nueva categoria
            </Link>
          </Button>
        </div>

        <div className="mt-7 w-full text-center">
          <p className="text-gray-500">Aún no tienes libros publicados.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Todos mis Categorias</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/categories/new">
            + Publicar una nueva categoria
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <TableCategories categories={categories} />
      </div>
    </section>
  );
}
