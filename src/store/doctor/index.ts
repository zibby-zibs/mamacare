import { create } from "zustand";
import { Message } from "../../../types";

interface MessageStore {
  user: Message | null;
}

export const useMessageStore = create<MessageStore>((set) => ({
  user: null,
}));
