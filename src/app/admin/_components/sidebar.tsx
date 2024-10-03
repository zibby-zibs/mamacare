"use client";

import {
  Bell,
  ChevronDown,
  Home,
  Users,
  UserPlus,
  ClipboardList,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebarStore } from "@/store/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Props = {};

const Sidebar = (props: Props) => {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

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

  const pathname = usePathname();
  return (
    <main>
      <div className="hidden border-r bg-muted/40 md:block h-svh">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              {/* <Pregnan className="h-6 w-6" /> */}
              <span className="">Admin</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
