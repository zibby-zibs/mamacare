"use client";

import { sampleMessages, user, userList } from "@/lib/user";
import React from "react";
import UserList from "./_components/user-list";
import ChatInterface from "./_components/doctor-messaging";
import MessageHeader from "./_components/message-header";

function page() {
  const data = user;
  const messages = sampleMessages;
  const messageList = userList;
  return (
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
  );
}

export default page;
