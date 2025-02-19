"use client";

import { useAuthAndRole } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import RecentBookCard from "./components/RecentBookCard/RecentBookCard";
import Section from "./components/Section/Section";
import RecentCategoriesCard from "./components/RecentCategoriesCard/RecentCategoriesCard";
import AccountCard from "./components/AccountCard/AccountCard";
import StatCard from "./components/StatCard/StatCard";
import { useAuthStore } from "@/lib/authStore";
import { useBookStore } from "@/lib/bookStore";
import { useCategoryStore } from "@/lib/categoryStore";
import { useEffect } from "react";

export default function Dashboard() {
  // Verificar autenticación y rol
  const { isAuthenticated, userRole } = useAuthAndRole("superadmin");
  const { getUsers, users } = useAuthStore();
  const { listBook, books } = useBookStore();
  const { listCategory, categories } = useCategoryStore();

  const getUsersCount = () => users.length.toString();
  const getBooksCount = () => books.length.toString();
  const getCategoriesCount = () => categories.length.toString();

  useEffect(() => {
    getUsers();
    listBook();
    listCategory();
  }, [getUsers, listBook, listCategory]);

  // Mientras se verifica la autenticación, muestra un mensaje de carga
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Si el usuario no está autenticado o no tiene el rol de superadmin, muestra un mensaje de acceso denegado
  if (!isAuthenticated || userRole !== "superadmin") {
    return <div>Acceso denegado. No tienes permiso para ver esta página.</div>;
  }

  // Si el usuario está autenticado y tiene el rol de superadmin, renderiza el dashboard
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Usuarios" value={getUsersCount()} />
        <StatCard title="Total Libros" value={getBooksCount()} />
        <StatCard title="Total Categorias" value={getCategoriesCount()} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Categorias" link="/admin/categories">
          <RecentCategoriesCard categories={categories} />
        </Section>

        <Section title="Ultimos Libros Publicados" link="/admin/books">
          <Card className="border-dashed">
            <CardContent className="p-6">
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Nuevo Libro
              </Button>
            </CardContent>
          </Card>
          {books.map((book) => (
            <RecentBookCard key={book.id} book={book} />
          ))}
        </Section>
      </div>

      {/* Account Requests */}
      <Section title="Usuarios Registrados" link="/admin/users">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <AccountCard key={user.id} user={user} />
          ))}
        </div>
      </Section>
    </div>
  );
}
