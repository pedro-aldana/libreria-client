"use client";

import React, { useEffect } from "react";
import { useRoleStore } from "@/lib/roleStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TableRoles from "./components/TableRoles/TableRoles";

export default function RolesPage() {
  const { listRoles, roles, isLoading, error } = useRoleStore();

  useEffect(() => {
    listRoles();
  }, [listRoles]);

  if (isLoading) {
    return <div>Cargando roles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (roles.length === 0) {
    return (
      <section className="w-full rounded-2xl bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Todos los Roles</h2>
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/roles/new">+ Agregar un nuevo Rol</Link>
          </Button>
        </div>

        <div className="mt-7 w-full text-center">
          <p className="text-gray-500">Aún no tienes Roles disponibles.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Todos los Roles</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/roles/new">+ Agregar un nuevo Rol</Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <TableRoles roles={roles} />
      </div>
    </section>
  );
}
