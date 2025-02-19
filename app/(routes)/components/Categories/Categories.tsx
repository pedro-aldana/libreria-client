"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/lib/store";


export  function Categories() {

  const {categories,fetchCategories} = useCategoryStore() 
  
  useEffect(() => {
    fetchCategories()
  },[])

  return (
    <div>
        <h1>Lista de categorias</h1>
        <ul>
            {categories.map((category)=> (
                <li key={category.id}>
                    {category.name}
                </li>
            ))}
        </ul>
    </div>
  )
}
