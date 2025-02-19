"use client";

import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/authStore";
import { useRoleStore } from "@/lib/roleStore";
import { EditRoleModal } from "./components/EditRoleModal";

interface User {
  id: number;
  username: string;
  email: string;
  role: { name: string };
  profile_img?: string;
}

export default function UserTable() {
  const { getUsers, users, updateUserRole, deleteUser } = useAuthStore();
  const { listRoles, roles } = useRoleStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Cargar usuarios y roles al montar el componente
  useEffect(() => {
    getUsers();
    listRoles();
  }, [getUsers, listRoles]);

  // Manejar la apertura del modal de edición
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Guardar el nuevo rol del usuario
  const handleSaveRole = async (email: string, newRole: string) => {
    await updateUserRole(email, newRole);
    setIsModalOpen(false);
  };

  // eliminar usuario
  const handleDeleteUser = async (email: string) => {
    await deleteUser(email);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-lg font-semibold">Todos los usuarios</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay usuarios disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedUser && (
        <EditRoleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          roles={roles}
          onSave={handleSaveRole}
        />
      )}
    </div>
  );
}

// Componente para renderizar una fila de la tabla
interface UserRowProps {
  user: User;
  onEditClick: (user: User) => void;
  onDeleteClick: (email: string) => void;
}

const UserRow = ({ user, onEditClick, onDeleteClick }: UserRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
            {user.profile_img ? (
              <Image
                src={user.profile_img}
                alt={`${user.username}'s avatar`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-primary/10 text-lg font-semibold uppercase text-primary">
                {user.username[0]}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{user.username}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <span className="text-sm font-medium">{user.role.name}</span>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          onClick={() => onDeleteClick(user.email)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-500"
          onClick={() => onEditClick(user)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
