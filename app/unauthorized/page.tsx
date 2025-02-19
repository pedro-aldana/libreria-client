import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <LockIcon className="w-10 h-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Acceso no autorizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Lo sentimos, no tienes permiso para acceder a esta página. Por
            favor, comprueba tus credenciales o ponte en contacto con el
            administrador.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/admin/home">Volver al Inicio</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
