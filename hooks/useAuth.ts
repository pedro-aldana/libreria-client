"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Función auxiliar para obtener el valor de una cookie por su nombre
const getCookieValue = (name: string): string | undefined => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

// Hook básico para verificar autenticación
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookieValue("token");

    if (!token) {
      setIsAuthenticated(false);
      router.push("/"); // Redirige a la página de inicio si no hay token
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return isAuthenticated;
};

// Hook para verificar autenticación y rol
const useAuthAndRole = (requiredRole?: string) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookieValue("token");
    const role = getCookieValue("role");

    if (!token) {
      setIsAuthenticated(false);
      router.push("/"); // Redirige a la página de inicio si no hay token
    } else {
      setIsAuthenticated(true);
      setUserRole(role || null);

      // Si se requiere un rol específico y el usuario no lo tiene, redirige
      if (requiredRole && role !== requiredRole) {
        router.push("/unauthorized"); // Redirige a la página de acceso no autorizado
      }
    }
  }, [router, requiredRole]);

  return { isAuthenticated, userRole };
};

// Exportar hooks por separado
export { useAuth, useAuthAndRole };
