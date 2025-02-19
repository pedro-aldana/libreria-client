"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
}

const BookCover = ({ className, variant = "regular" }: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src="/images/react.png"
          alt="libro"
          width={400}
          height={600}
          className="rounded-sm object-fill"
          loading="lazy"
        />
      </div>
    </div>
  );
};
export default BookCover;
