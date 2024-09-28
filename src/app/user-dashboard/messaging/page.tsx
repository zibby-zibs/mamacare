import React from "react";
import ChatInterface from "./_components/chat-interface";
import { Separator } from "@/components/ui/separator";
import { sampleMessages } from "@/lib/user";

const MessagingPage = () => {
  return (
    <main className="bg-white max-h-svh overflow-y-auto px-5 lg:px-10 ">
      <div className="sticky top-0 pt-5 z-30 bg-white w-full">
        <h1 className="text-2xl text-left font-semibold font-outfit  px-5 lg:px-10 ">
          Support
        </h1>
        <Separator className=" h-1 bg-primary-foreground mt-5" />
      </div>
      <div className="relative z-10">
        <ChatInterface message={sampleMessages} />
      </div>
    </main>
  );
};

export default MessagingPage;
