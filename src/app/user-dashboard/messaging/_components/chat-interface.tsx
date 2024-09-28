"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import React from "react";
import MessageBubble from "./message-bubble";

type Props = {
  message: {
    sender: string;
    content: string;
    timestamp: string;
    type: string;
  }[];
};

const ChatInterface = ({ message }: Props) => {
  return (
    <TooltipProvider>
      <div className="relative z-10 flex h-svh max-h-[calc(100svh-132px)] flex-col rounded-xl bg-white p-4 lg:col-span-2 overflow-y-hidden max-w-screen-md mx-auto  justify-between ">
        {/* <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge> */}
        <div className="h-full min-h-[calc(100svh-330px)] max-h-[calc(100svh-350px)] space-y-7 overflow-y-auto">
          {message?.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              isCurrentUser={msg.sender === "Amina"}
            />
          ))}
        </div>
        <form
          className=" overflow-hidden rounded-lg border bg-white focus-within:ring-1 focus-within:ring-ring mb-5 sticky bottom-2 w-full max-w-screen-md z-30"
          x-chunk="dashboard-03-chunk-1"
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Paperclip className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Attach File</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Mic className="size-4" />
                  <span className="sr-only">Use Microphone</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Use Microphone</TooltipContent>
            </Tooltip>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </TooltipProvider>
  );
};

export default ChatInterface;
