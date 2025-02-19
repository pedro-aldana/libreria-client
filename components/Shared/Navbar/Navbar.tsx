"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, X, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "./Navbar.data";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useAuth(); // Verificamos si el usuario está autenticado

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex lg:flex-1"
        >
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/icons/LearnMore.svg"
              alt="logo"
              height={37}
              width={37}
            />
            <span className="text-xl font-bold text-zinc-100">CodeBook</span>
          </Link>
        </motion.div>

        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-100"
                onClick={toggleMenu}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-zinc-900 text-zinc-100 sm:max-w-none"
            >
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="mt-6 flow-root"
                  >
                    <div className="-my-6 divide-y divide-zinc-700">
                      <div className="space-y-2 py-6">
                        {routes.map((item) => (
                          <motion.div
                            key={item.label}
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <SheetTrigger asChild>
                              <Link
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-2xl font-semibold leading-7 text-zinc-100 hover:bg-zinc-800/50"
                                onClick={toggleMenu}
                              >
                                {item.label}
                              </Link>
                            </SheetTrigger>
                          </motion.div>
                        ))}
                        {isAuthenticated && (
                          <motion.div
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <SheetTrigger asChild>
                              <Link
                                href="/admin/home"
                                className="-mx-3 block rounded-lg px-3 py-2 text-2xl font-semibold leading-7 text-zinc-100 hover:bg-zinc-800/50"
                                onClick={toggleMenu}
                              >
                                Admin
                              </Link>
                            </SheetTrigger>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:gap-x-12 items-center">
          {routes.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className="text-xl font-semibold leading-6 text-zinc-100 hover:text-zinc-300 transition-colors"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}

          {isAuthenticated && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/admin/home">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Admin
                  <Settings className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          )}

          {isAuthenticated ? (
            // Si el usuario está autenticado, mostrar el botón de logout
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => {
                  document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.reload(); // Recargar para actualizar el estado de autenticación
                }}
              >
                Logout
                <LogOut className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ) : (
            // Si no está autenticado, mostrar los botones de login y registro
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/authentication/Login">
                  <Button className="bg-light-200">
                    Login
                    <User className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/authentication/Register">
                  <Button>
                    Register
                    <User className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
