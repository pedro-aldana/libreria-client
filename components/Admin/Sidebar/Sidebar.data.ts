import {
  User,
  LibraryBig,
  HomeIcon,
  LayoutDashboard,
  Lock,
  Handshake,
  ChartColumnStacked,
} from "lucide-react";

export const adminSidebarLinks = [
  {
    href: "/",
    label: "Inicio",
    icon: HomeIcon,
  },
  {
    href: "/admin/home",
    label: "Dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["superadmin", "admin", "user"],
  },
  {
    href: "/admin",
    label: "Administracion",
    icon: Lock,
    allowedRoles: ["superadmin", "admin"],
  },
  {
    href: "/admin/books",
    label: "Libros",
    icon: LibraryBig,
    allowedRoles: ["superadmin", "admin", "user"],
  },
  {
    href: "/admin/categories",
    label: "Categorias",
    icon: ChartColumnStacked,
    allowedRoles: ["superadmin", "admin"],
  },

  {
    href: "/admin/users",
    label: "Usuarios",
    icon: User,
    allowedRoles: ["superadmin", "admin"],
  },
  {
    href: "/admin/roles",
    label: "Roles",
    icon: Handshake,
    allowedRoles: ["superadmin", "admin"],
  },
];
