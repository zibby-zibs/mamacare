"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/hooks/admin/admin-store";
import { portrait } from "@/images";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  ClipboardList,
  Home,
  Menu,
  UserCircle,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const pathname = usePathname();
  const routes = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Doctors",
      href: "/admin/doctors",
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      title: "Pending Approvals",
      href: "/admin/pending-approval",
      icon: <ClipboardList className="h-4 w-4" />,
    },
  ];
  return (
    <main className="bg-white sticky top-0 z-30">
      <header className="flex h-16 items-center justify-between md:justify-end bg-white px-4 shadow-sm w-full max-w-screen-xl mx-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              {routes.map((link) => (
                <Link
                  href={link.href}
                  key={link.title}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    link.href === pathname ? "text-primary font-semibold" : ""
                  )}
                >
                  {link.icon}
                  {link.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="relative h-8 w-8 rounded-full">
                <Image
                  src={portrait}
                  alt="Admin User"
                  layout="fill"
                  className="rounded-full "
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.data?.first_name} {user?.data?.last_name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.data?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </main>
  );
};

export default Header;
