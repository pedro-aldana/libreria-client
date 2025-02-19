"use client";

import React, { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/admin.css";
import Sidebar from "@/components/Admin/Sidebar/Sidebar";
import Header from "@/components/Admin/Header/Header";

export default function Layout({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Acceso denegado, redirigiendo.....</div>;
  }

  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />

      {/* Contenedor del contenido principal */}
      <div className="flex-1 min-h-screen transition-all duration-300 md:ml-64">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </main>
  );
}
