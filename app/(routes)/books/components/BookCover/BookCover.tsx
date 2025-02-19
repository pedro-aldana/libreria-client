import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BookCoverProps {
  id: number;
  title: string;
  coverUrl: string;
  category: string;
}

export default function BookCover({
  id,
  title,
  coverUrl,
  category,
}: BookCoverProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="w-full" // 📌 Se asegura que la tarjeta ocupe todo el espacio de la cuadrícula
    >
      <Link href={`/books/${id}`}>
        <Card className="w-56 h-96 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-lg">
          <CardContent className="p-0 h-full flex flex-col">
            <motion.div
              className="relative w-full h-3/4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={coverUrl} // Usar la imagen de la portada del libro
                alt={`Cover of ${title}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </motion.div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <motion.h3 className="font-bold mb-2 line-clamp-2 text-lg">
                {title} {/* Mostrar el título del libro */}
              </motion.h3>
              <motion.div>
                <Badge variant="outline" className="text-white ">
                  {category} {/* Mostrar la categoría del libro */}
                </Badge>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
