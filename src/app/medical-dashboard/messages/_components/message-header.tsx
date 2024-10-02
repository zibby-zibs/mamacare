"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMessageStore } from "@/store/doctor";
import Image from "next/image";
import React from "react";

type Props = {};

const MessageHeader = (props: Props) => {
  const selectedUser = useMessageStore((store) => store.user);
  return (
    <header className="py-4 px-2 flex items-center gap-3 border-b border-b-gray-400">
      <Avatar>
        <AvatarFallback>
          <p>{selectedUser?.name.slice(0, 2)}</p>
        </AvatarFallback>
      </Avatar>
      <p>{selectedUser?.name}</p>
    </header>
  );
};

export default MessageHeader;
