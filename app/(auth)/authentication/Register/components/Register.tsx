"use client";

import { useState, FormEvent } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/authStore";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

// Tipado para los estados
interface RegisterFormState {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formState, setFormState] = useState<RegisterFormState>({
    username: "",
    email: "",
    password: "",
  });

  const { register, loading, error } = useAuthStore();

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validación de password
  const validatePassword = (password: string): boolean => {
    return password.length >= 6; // Asegura una longitud mínima de 6 caracteres
  };

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const { username, email, password } = formState;

    // Validación de campos
    if (!username || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    const success = await register(email, username, password);
    if (success) {
      toast({
        title: "Success",
        description: "User registered successfully, you can now login",
        variant: "default",
      });
      setFormState({
        username: "",
        email: "",
        password: "",
      });
    } else {
      toast({
        title: "Error",
        description: error || "Failed to register user",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="register-name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="register-name"
                type="text"
                placeholder="John Doe"
                className="pl-10"
                value={formState.username}
                onChange={(e) =>
                  setFormState({ ...formState, username: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="register-email"
                type="email"
                placeholder="m@example.com"
                className="pl-10"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value.trim() })
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
                value={formState.password}
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-green-500"
            disabled={
              loading ||
              !formState.username ||
              !formState.email ||
              !formState.password
            }
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
        <p className="text-center text-sm">
          Ya tengo una cuenta{" "}
          <Link href="/authentication/Login" className="text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
