"use client";

import React, { useEffect } from "react";
import UserProfile from "./components/UserProfile/UserProfile";
import { useAuthStore } from "@/lib/authStore";

export default function HomePage() {
  const { getUser, user } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
}
