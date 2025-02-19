"use client";

import { Check } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BookFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onDateFilterChange: (period: string) => void;
}

export function BookFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: BookFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full sm:w-[200px] justify-start "
          >
            {selectedCategory ?? "Select category"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onCategoryChange(null);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      !selectedCategory ? "opacity-100" : "opacity-0"
                    )}
                  />
                  All Categories
                </CommandItem>
                {categories.map((category) => (
                  <CommandItem
                    key={category}
                    onSelect={() => {
                      onCategoryChange(category);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        category === selectedCategory
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
