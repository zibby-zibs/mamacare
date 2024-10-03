"use client";

import { Menu, UserCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Image, { StaticImageData } from "next/image";
import { db } from "../../../../../firebase-config";
import { useAuthStore } from "@/store/user";
import { Message } from "../../../../../types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMessageStore } from "@/store/doctor";

const UserList = () => {
  const user = useAuthStore((store) => store.user);
  const selectedUser = useMessageStore((store) => store.user);
  const [messages, setMessages] = useState([] as Message[]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: any[] = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      // Create an array to hold unique conversations
      const uniqueConversations: Message[] = [];
      // Create a Set to track seen IDs for efficiency
      const seenIds = new Set();
      sortedMessages.forEach((message) => {
        if (!seenIds.has(message.id)) {
          seenIds.add(message.id);
          uniqueConversations.push(message);
        }
      });
      setMessages(uniqueConversations);
      console.log("Unique Conversations", uniqueConversations);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      useMessageStore.setState({ user: messages[0] });
    }
  }, [messages]);

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
            {messages.map((message) => (
              <div
                key={message.id}
                className="hover:bg-gray-100"
                onClick={() => useMessageStore.setState({ user: message })}
              >
                <div className="flex items-center gap-2">
                  {/* {message.image ? (
                    <Image
                      src={message.image}
                      alt={message.name}
                      height={40}
                      width={40}
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <UserCircle className="h-10 w-10" />
                  )} */}
                  <Avatar>
                    <AvatarFallback>
                      <p>{message.name.slice(0, 2)}</p>
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="font-medium">{message.name}</h1>
                </div>
                <p className=" text-sm text-gray-500 pt-1">{message.text}</p>
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
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="hover:bg-gray-100"
                    onClick={() => useMessageStore.setState({ user: message })}
                  >
                    <div className="flex items-center gap-2">
                      {/* {message.image ? (
                    <Image
                      src={message.image}
                      alt={message.name}
                      height={40}
                      width={40}
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <UserCircle className="h-10 w-10" />
                  )} */}
                      <Avatar>
                        <AvatarFallback>
                          <p>{message.name.slice(0, 2)}</p>
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="font-medium">{message.name}</h1>
                    </div>
                    <p className=" text-sm text-gray-500 pt-1">
                      {message.text}
                    </p>
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
