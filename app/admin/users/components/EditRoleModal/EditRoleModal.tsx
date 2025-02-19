"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  roles: Role[];
  onSave: (email: string, newRole: string) => void;
}

export function EditRoleModal({
  isOpen,
  onClose,
  user,
  roles,
  onSave,
}: EditRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState(user.role);

  // Resetear el rol seleccionado cuando el usuario cambia
  useEffect(() => {
    if (isOpen) {
      setSelectedRole(user.role);
    }
  }, [isOpen, user.role]);

  // Manejar el guardado del rol
  const handleSave = () => {
    if (!selectedRole) {
      console.error("No se ha seleccionado un rol válido.");
      return;
    }
    onSave(user.email, selectedRole);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar rol de {user.username}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="role-select">Rol</Label>
          <Select
            value={selectedRole}
            onValueChange={(value) => setSelectedRole(value)}
          >
            <SelectTrigger id="role-select">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="bg-primary-admin" onClick={handleSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
