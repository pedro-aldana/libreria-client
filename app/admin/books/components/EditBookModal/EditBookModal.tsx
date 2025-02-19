"use client";

import { useCategoryStore } from "@/lib/categoryStore";
import { useBookFormStore } from "@/lib/bookFormStore";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Category {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: Category;
}

interface UpdateBookModalProps {
  book: Book;
  onClose: () => void;
}

export default function EditBookModal({ book, onClose }: UpdateBookModalProps) {
  const { listCategory, categories } = useCategoryStore();
  const { updateBook, isLoading } = useBookFormStore(); // Store para manejar libros y actualización
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [selectedCategory, setSelectedCategory] = useState(
    book.category?.id?.toString() || ""
  );

  useEffect(() => {
    listCategory();
  }, []);

  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setSelectedCategory(
      book.category?.id?.toString() || categories[0]?.id.toString() || ""
    );
  }, [book, categories]);

  const handleSave = async () => {
    const updatedBook = {
      ...book,
      title,
      author,
      description,
      category_id: parseInt(selectedCategory), // La API podría requerir solo el ID
    };

    await updateBook(book.id, updatedBook);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar libro</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Título</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Autor</Label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            <Label>Descripción</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label>Categoría</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              disabled={categories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedCategory || isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
