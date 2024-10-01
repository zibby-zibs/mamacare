"use client";

import { Menu, UserCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

type Props = {
  messageList: {
    id: number;
    name: string;
    image: StaticImageData;
    lastMessage: string;
  }[];
};

const UserList = ({ messageList }: Props) => {
  return (
    <div>
      <div className="hidden border-r bg-muted/40 md:block h-svh">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-primary py-6"
            >
              <p>Conversations</p>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1 flex flex-col gap-4 px-5 max-h-[calc(100svh-170px)] overflow-y-auto">
            {messageList.map((message) => (
              <div
                key={message.id}
                className="border-b border-b-gray-400 rounded-b-lg px-2"
              >
                <div className="flex items-center gap-2">
                  {message.image ? (
                    <Image
                      src={message.image}
                      alt={message.name}
                      height={40}
                      width={40}
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <UserCircle className="h-10 w-10" />
                  )}
                  <h1 className="font-medium">{message.name}</h1>
                </div>
                <p className=" text-sm text-gray-500 pt-1">
                  {message.lastMessage}
                </p>
              </div>
            ))}
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
              <div className="flex-1 flex flex-col gap-4 max-h-[calc(100svh-100px)] overflow-y-auto">
                {messageList.map((message) => (
                  <div key={message.id}>
                    <div className="flex items-center gap-2">
                      {message.image ? (
                        <Image
                          src={message.image}
                          alt={message.name}
                          height={40}
                          width={40}
                          className="rounded-full object-contain"
                        />
                      ) : (
                        <UserCircle className="h-10 w-10" />
                      )}
                      <h1 className="font-medium">{message.name}</h1>
                      <p className=" text-sm">{message.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
};

export default UserList;
