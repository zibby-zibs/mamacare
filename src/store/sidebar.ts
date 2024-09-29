import { create } from "zustand";

type SidebarState = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
