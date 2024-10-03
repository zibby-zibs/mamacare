"use client";

import { sampleMessages, user, userList } from "@/lib/user";
import React, { Suspense } from "react";
import UserList from "./_components/user-list";
import ChatInterface from "./_components/doctor-messaging";
import MessageHeader from "./_components/message-header";
import { Loader2 } from "lucide-react";

function page() {
  const data = user;
  const messages = sampleMessages;
  const messageList = userList;
  return (
    <Suspense
      fallback={
        <div className="h-svh w-full jusc' items-center flex">
          <Loader2 className="animate-spin" size={40} />
          <p className="text-4xl font-monoton">MamaCare</p>
        </div>
      }
    >
      <div className="grid h-svh max-h-svh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
        <div>
          <UserList messageList={messageList} />
        </div>

        <div className="px-4 ">
          <MessageHeader />

          <div className=" pb-10">
            <ChatInterface message={messages} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default page;
