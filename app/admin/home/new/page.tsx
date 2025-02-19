import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import ProfileForm from "./components/ProfileForm";

export default function page() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/home">
          <MoveLeft />
          Volver atras
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <ProfileForm />
      </section>
    </>
  );
}
