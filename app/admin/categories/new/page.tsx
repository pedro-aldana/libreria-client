import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import CategoryForm from "./components/CategoryForm/CategoryForm";

export default function page() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/categories">
          <MoveLeft />
          Volver atras
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <CategoryForm />
      </section>
    </>
  );
}
