import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Category {
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  cover_image: string;
  category: Category;
}

interface RecentBookCardProps {
  book: Book;
}

export default function RecentBookCard({ book }: RecentBookCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row gap-4 p-4">
        <Image
          src={book.cover_image}
          alt="title"
          width={60}
          height={60}
          className="rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="px-2 py-1 bg-secondary text-xs rounded-full">
              {book.category.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
