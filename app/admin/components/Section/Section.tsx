import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Section({ title, link, children }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={link}>
          <Button variant="link" className="text-sm text-blue-600">
            Ver Todo
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
