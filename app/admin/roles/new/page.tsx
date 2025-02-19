import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import React from "react";
import RolForm from "./components/RolForm";

export default function page() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/roles">
          <MoveLeft />
          Volver atras
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <RolForm />
      </section>
    </>
  );
}
