import { createUploadthing, type FileRouter } from "uploadthing/next";
import { NextRequest } from "next/server";

// Definir permisos y reglas
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }) // Define un endpoint para imágenes
    .middleware(async ({ req }) => {
      // Aquí puedes agregar autenticación si es necesario
      return {}; // Retorna un objeto vacío si no se necesita autenticación
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Archivo subido:", file);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
