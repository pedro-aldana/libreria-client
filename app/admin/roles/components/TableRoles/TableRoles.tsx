import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoleStore } from "@/lib/roleStore";

interface Rol {
  id: number;
  name: string;
  description: string;
}

interface TableRolesProps {
  roles: Rol[];
}

export default function TableRoles({ roles }: TableRolesProps) {
  const { deleteRole } = useRoleStore();

  const handleDeleteRole = async (id: number) => {
    deleteRole(id);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Rol</TableHead>
              <TableHead>Descricion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((rol) => (
              <TableRow key={rol.id}>
                <TableCell className="font-medium">{rol.name}</TableCell>
                <TableCell>{rol.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteRole(rol.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />

                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
