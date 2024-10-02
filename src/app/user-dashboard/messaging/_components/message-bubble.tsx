import { Download, FileText } from "lucide-react";
import React from "react";
import { Message } from "../../../../../types";
import { format } from "date-fns";

type Props = {
  message: Message;
  isCurrentUser: boolean;
};

const MessageBubble = ({ message, isCurrentUser }: Props) => {
  const formatMessageDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return format(date, "hh:mm a");
    } else {
      return format(date, "MMM d, hh:mm a");
    }
  };
  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[70%] ${
          isCurrentUser
            ? "bg-[#B0E0E6] text-[#000080]"
            : "bg-[#E6E6FA] text-[#000080]"
        } rounded-lg p-3 shadow`}
      >
        {!isCurrentUser && (
          <p className="text-xs text-[#9370DB] mb-1">{message.name}</p>
        )}

        <p>{message.text}</p>

        {/* <div className="flex items-center">
             <FileText className="mr-2" size={20} />
             <span className="mr-2">{message.text}</span>
             <Download
               size={20}
               className="cursor-pointer hover:text-[#9370DB]"
             />
         </div> */}

        <p className="text-xs text-right mt-1 text-[#9370DB]">
          {message?.createdAt?.Timestamp?.seconds
            ? formatMessageDate(message?.createdAt?.Timestamp?.seconds)
            : ""}
        </p>
      </div>
    </div>
  );
};
export default MessageBubble;
