import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Role {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  profile_img: string;
  banner_img: string;
  role: Role;
}

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Banner Image */}
      <div className="relative h-48 md:h-64">
        <Image
          src={user?.banner_img || ""}
          alt="Profile banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-8">
        {/* Profile Picture */}
        <div className="relative -mt-16 mb-4">
          <div className="relative h-32 w-32">
            <Image
              src={user?.profile_img || ""}
              alt="Profile picture"
              width={128}
              height={128}
              className="rounded-full border-4 border-background"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-muted-foreground text-sm">{user?.role.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <Link href="/admin/home/new">
                  <Button>Editar Perfil</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
