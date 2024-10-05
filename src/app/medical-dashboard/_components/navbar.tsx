"use client";

import React from "react";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/user";
import Image from "next/image";
import { mamaLogo } from "@/images";

function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const pathname = usePathname();

  const links = [
    {
      id: 1,
      title: "Dashboard",
      href: "/medical-dashboard",
    },
    {
      id: 2,
      title: "Requests",
      href: "/medical-dashboard/requests",
    },
    {
      id: 3,
      title: "Messages",
      href: "/medical-dashboard/messages",
    },
    {
      id: 4,
      title: "Appointments",
      href: "/medical-dashboard/appointments",
    },
  ];
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <div className=" flex gap-8 items-center">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src={mamaLogo}
            alt="MamaCare"
            width={32}
            height={32}
            className="rounded-full object-contain"
          />
          <span className="font-fret">
            Mama <span className="text-primary font-bold">C</span>are
          </span>
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className={cn(
                "rounded-xl px-3 text-muted-foreground hover:text-foreground w-full",
                link.href === pathname ? "text-primary font-semibold" : ""
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="font-fret">
                Mama <span className="text-primary font-bold">C</span>are
              </span>
            </Link>
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.title}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  link.href === pathname ? "text-primary font-semibold" : ""
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="bg-red-500 hover:bg-red-500 text-white"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navbar;
