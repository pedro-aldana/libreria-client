import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  photo: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {
    console.log("Upload complete!");
  }),

  document: f({
    blob: {
      maxFileSize: "16MB", // Límite de tamaño de archivo
      maxFileCount: 1, // Solo un archivo a la vez
    },
  }).onUploadComplete(({ metadata, file }) => {
    console.log("Archivo subido:", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
