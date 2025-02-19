"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";

export default function Header() {
  const { token, user, getUser } = useAuthStore();

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

  return (
    <header className="admin-header max-w-7xl mx-auto px-4 mt-4">
      <div>
        <h1 className="text-2xl font-semibold">Bienvenido, {user?.username}</h1>
        <p className="text-sm text-muted-foreground">
          podras realizar ciertas acciones segun tu rol
        </p>
      </div>
    </header>
  );
}
