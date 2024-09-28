import { Download, FileText } from "lucide-react";
import React from "react";

type Props = {
  message: {
    sender: string;
    content: string;
    timestamp: string;
    type: string;
  };
  isCurrentUser: boolean;
};

const MessageBubble = ({ message, isCurrentUser }: Props) => {
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
          <p className="text-xs text-[#9370DB] mb-1">{message.sender}</p>
        )}
        {message.type === "text" ? (
          <p>{message.content}</p>
        ) : (
          <div className="flex items-center">
            <FileText className="mr-2" size={20} />
            <span className="mr-2">{message.content}</span>
            <Download
              size={20}
              className="cursor-pointer hover:text-[#9370DB]"
            />
          </div>
        )}
        <p className="text-xs text-right mt-1 text-[#9370DB]">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
export default MessageBubble;
