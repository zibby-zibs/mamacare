import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useTokenExpiryCheck = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  useEffect(() => {
    const checkAndHandleExpiry = () => {
      if (user) {
        const tokenExpiry = new Date(user?.token_expiration);
        const now = new Date();
        if (now >= tokenExpiry) {
          if (user?.data?.role === "USER") {
            logout();
            router.push("/auth/login");
          }
        }
      }
    };

    // Check immediately
    checkAndHandleExpiry();

    // Set up interval to check periodically
    const intervalId = setInterval(checkAndHandleExpiry, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [user, logout, router]);
};
