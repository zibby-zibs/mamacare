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
import React, { useEffect, useState } from "react";
import MessageBubble from "./message-bubble";
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuthStore, useExtraUser } from "@/store/user";
import { db } from "../../../../../firebase-config";
import { toast } from "sonner";
import { Message } from "../../../../../types";
import { useGetUserRequests } from "@/hooks/user";
import { useFirebaseMessages } from "@/hooks/realtime-user";

type Props = {
  message: {
    sender: string;
    content: string;
    timestamp: string;
    type: string;
  }[];
};

const ChatInterface = ({}: Props) => {
  const user = useAuthStore((store) => store.user);
  const { data, isError, error } = useGetUserRequests(user?.data?.id);
  const [text, setText] = useState("");
  // const [messages, setMessages] = useState([] as any[]);
  const requestId = data?.data?.find(
    (request: any) => request.status === "ACCEPTED"
  )?.id;
  const { data: messages } = useFirebaseMessages(requestId!);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!requestId || !text || !user?.data?.id) return;

    try {
      // Reference to the subcollection 'chat' within the request document
      const chatRef = collection(db, "messages", requestId, "chat");

      // Add a new document to the subcollection
      await addDoc(chatRef, {
        text,
        name: `${user?.data?.first_name} ${user?.data?.last_name}`,
        userId: user?.data?.id,
        createdAt: serverTimestamp(),
      });

      setText("");
    } catch (error) {
      console.error("Error sending message", error);
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {
    if (data && messages) {
      const doctorId = data?.data?.find(
        (request: any) => request.status === "ACCEPTED"
      )?.doctorId;
      if (doctorId) {
        useExtraUser.setState({ doctorId });
      }
    }
  }, [messages]);

  // useEffect(() => {
  //   if (!requestId) return;

  //   const chatRef = collection(db, "messages", requestId, "chat");
  //   const q = query(chatRef, orderBy("createdAt", "asc"));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const newMessages = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as Message[];

  //     setMessages(newMessages);
  //     console.log("Messages updated:", newMessages);
  //   });

  //   return () => unsubscribe();
  // }, [requestId]);

  return (
    <TooltipProvider>
      <div className="relative z-10 flex h-svh max-h-[calc(100svh-132px)] flex-col rounded-xl bg-white p-4 lg:col-span-2 overflow-y-hidden max-w-screen-lg mx-auto  justify-between ">
        {/* <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge> */}
        <div className="h-full min-h-[calc(100svh-330px)] max-h-[calc(100svh-350px)] space-y-7 overflow-y-auto scrollbar-none">
          {messages?.map((msg: Message, index) => (
            <MessageBubble
              key={index}
              message={msg}
              isCurrentUser={msg.userId === user?.data?.id}
            />
          ))}
        </div>
        <form
          className=" overflow-hidden rounded-lg border bg-white focus-within:ring-1 focus-within:ring-ring mb-5 sticky bottom-2 w-full max-w-screen-lg z-30"
          x-chunk="dashboard-03-chunk-1"
          onSubmit={sendMessage}
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!requestId}
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
