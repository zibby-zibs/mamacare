import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { user } from "@/lib/user";
import { User, UserData } from "../../../types";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (user: UserData) => void;
  logout: () => void;
}

interface UserExtraState {
  doctorId: string | null | undefined;
}

export const useAuthStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
        // Store user ID in cookie
        if (user) {
          Cookies.set("userId", user.data.id, { expires: 7 }); // expires in 7 days
          Cookies.set("access_token", user.access_token, { expires: 7 }); // expires in 7 days
        } else {
          Cookies.remove("userId");
          Cookies.remove("access_token");
        }
      },
      updateUser: (userData) => {
        set((state) => {
          if (!state.user) {
            return {}; // or handle the case where there's no user more explicitly
          }
          return {
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                ...userData,
              },
            },
          };
        });
      },
      logout: () => {
        set({ user: null });
        Cookies.remove("userId");
        Cookies.remove("access_token");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useExtraUser = create<UserExtraState>((set) => ({
  doctorId: undefined,
}));
