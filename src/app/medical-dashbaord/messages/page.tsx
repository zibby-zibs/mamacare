import ChatInterface from "@/app/user-dashboard/messaging/_components/chat-interface";
import { sampleMessages, user, userList } from "@/lib/user";
import Image from "next/image";
import React from "react";
import UserList from "./_components/user-list";

function page() {
  const data = user;
  const messages = sampleMessages;
  const messageList = userList;
  return (
    <div className="grid h-svh max-h-svh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
      <div>
        <UserList messageList={messageList} />
      </div>

      <div className="px-4">
        <header className="py-4 px-2 flex items-center gap-3 border-b border-b-gray-400">
          <Image
            src={data.image}
            alt="user-profile"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />
          <p>
            {data.first_name} {data.last_name}
          </p>
        </header>
        <ChatInterface message={messages} />
      </div>
    </div>
  );
}

export default page;
