"use client";

import {
  Bell,
  Home,
  LucideLogOut,
  Menu,
  MessageCirclePlus,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/user";
import Image from "next/image";
import { mamaLogo } from "@/images";

const UserSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const links = [
    {
      title: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      href: "/user-dashboard",
    },
    {
      title: "Messaging",
      icon: <MessageCirclePlus className="h-4 w-4" />,
      href: "/user-dashboard/messaging",
    },
    {
      title: "Profile",
      icon: <UserCircle className="h-4 w-4" />,
      href: "/user-dashboard/profile",
    },
  ];

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block h-svh">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
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
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {links.map((link) => (
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
            <nav className="px-2">
              <Button
                variant={"destructive"}
                className="mt-9"
                onClick={() => {
                  logout();
                  router.push("/auth/login");
                }}
              >
                <LucideLogOut />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
              <Image
                src={mamaLogo}
                alt="MamaCare"
                width={32}
                height={32}
                className="rounded-full object-contain pb-10"
              />
              <nav className="grid gap-2 text-lg font-medium">
                {links.map((link) => (
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
              {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </>
  );
};

export default UserSidebar;
