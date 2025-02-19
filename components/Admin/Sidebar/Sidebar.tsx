"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { adminSidebarLinks } from "./Sidebar.data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/authStore";
import { Menu, X } from "lucide-react"; // Iconos para el menú

export default function Sidebar() {
  const pathname = usePathname();
  const { token, user, getUser, loading } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

  // Filtrar las rutas en función del rol del usuario
  const filteredSidebarLinks = adminSidebarLinks.filter((route) => {
    // Si el usuario no está autenticado, no mostrar ninguna ruta
    if (!user) return false;

    // Si la ruta no tiene roles permitidos, mostrarla a todos
    if (!route.allowedRoles) return true;

    // Mostrar la ruta si el rol del usuario está en los roles permitidos
    return route.allowedRoles.includes(user.role.name);
  });

  return (
    <>
      {/* Botón de menú en móviles */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar principal */}
      <div
        className={cn(
          "admin-sidebar fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform transform",
          isOpen ? "translate-x-0" : "-translate-x-full", // Control del estado en móvil
          "md:translate-x-0 md:block" // Siempre visible en pantallas grandes
        )}
      >
        <div className="flex flex-col h-full p-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/icons/LearnMore.svg"
              alt="logo"
              height={37}
              width={37}
            />
            <h1 className="text-lg font-semibold">CodeBook</h1>
          </div>

          {/* Sidebar Links */}
          <div className="mt-10 flex flex-col gap-5">
            {filteredSidebarLinks.map((route) => {
              const isSelected =
                pathname === route.href ||
                (route.href === "/admin/" && pathname === "/admin");

              return (
                <Link href={route.href} key={route.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md transition-colors duration-200",
                      isSelected
                        ? "bg-primary-admin text-white shadow-sm"
                        : "hover:bg-gray-200 text-gray-700"
                    )}
                  >
                    {/* Icono */}
                    <div className="size-5">
                      <route.icon
                        className={cn(
                          "w-full h-full",
                          isSelected ? "brightness-0 invert" : "text-gray-600"
                        )}
                      />
                    </div>

                    {/* Label */}
                    <span>{route.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Sección del usuario */}
          <div className="mt-auto flex items-center gap-3 border-t pt-4">
            <Avatar>
              {user?.profile_img ? (
                <Image
                  src={user.profile_img}
                  width={60}
                  height={60}
                  alt="User Avatar"
                />
              ) : (
                <AvatarFallback>
                  {user?.username ? user.username[0].toUpperCase() : "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              {loading ? (
                <p className="text-sm text-gray-500">Cargando...</p>
              ) : user ? (
                <>
                  <p className="font-semibold text-gray-800">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </>
              ) : (
                <p className="text-xs text-gray-500">No autenticado</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fondo oscuro cuando el menú está abierto en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
