"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { portrait } from "@/images";
import { useSidebarStore } from "@/store/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Bell, Menu, UserCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  return (
    <main className="bg-white sticky top-0 z-30">
      <header className="flex h-16 items-center justify-end bg-white px-4 shadow-sm w-full max-w-screen-xl mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
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
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </main>
  );
};

export default Header;
