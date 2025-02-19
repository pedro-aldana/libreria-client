"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Category {
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  rating: number;
  category: Category;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <Card className="w-64 h-96 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-lg">
          <CardContent className="p-0 h-full flex flex-col">
            <motion.div
              className="relative w-full h-3/4"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={book.cover_image}
                alt={`Cover of ${book.title}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </motion.div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <motion.h3
                className="font-bold mb-2 line-clamp-2 book-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {book.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Badge
                  variant="outline"
                  className=" text-white border-none book-genre"
                >
                  {book.category.name}
                </Badge>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
