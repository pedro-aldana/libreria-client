import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

interface Role {
  name: string;
}

interface User {
  id: number;
  username: string;
  profile_img: string;
  email: string;
  role: Role;
}

interface AccountCardProps {
  user: User;
}

export default function AccountCard({ user }: AccountCardProps) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-500/20 text-black flex items-center justify-center mx-auto mb-3">
          <Avatar>
            {user?.profile_img ? (
              <Image
                src={user.profile_img}
                width={60}
                height={60}
                alt="User Avatar"
              />
            ) : (
              <AvatarFallback>
                {user?.username ? user.username[0].toUpperCase() : "?"}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <h3 className="font-semibold">{user.username}</h3>
        <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
        <span className="inline-block px-2 py-1 bg-secondary text-xs rounded-full">
          {user.role.name}
        </span>
      </CardContent>
    </Card>
  );
}
