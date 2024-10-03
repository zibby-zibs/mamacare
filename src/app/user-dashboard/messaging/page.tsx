"use client";

import React, { Suspense } from "react";
import ChatInterface from "./_components/chat-interface";
import { Separator } from "@/components/ui/separator";
import { sampleMessages } from "@/lib/user";
import Request from "./_components/request";
import CreateAppointment from "./_components/create-appointment";
import { Loader2 } from "lucide-react";

const MessagingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-svh w-full jusc' items-center flex">
          <Loader2 className="animate-spin" size={40} />
          <p className="text-4xl font-monoton">MamaCare</p>
        </div>
      }
    >
      <main className="bg-white max-h-svh overflow-y-auto px-5 lg:px-10 ">
        <div className="sticky top-0 pt-5 z-30 bg-white w-full">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl text-left font-semibold font-outfit  px-5 lg:px-10 ">
              Support
            </h1>
            <Request />
            <CreateAppointment />
          </div>
          <Separator className=" h-1 bg-primary-foreground mt-5" />
        </div>
        <div className="relative z-10 max-h-svh overflow-y-auto">
          <ChatInterface message={sampleMessages} />
        </div>
      </main>
    </Suspense>
  );
};

export default MessagingPage;
