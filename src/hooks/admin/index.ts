import { UserLoginformSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuthStore } from "./admin-store";
import axios from "axios";
import { z } from "zod";
import { User } from "../../../types";
import { toast } from "sonner";

export const useSignIn = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationKey: ["doctor-sign-in"],
    mutationFn: async (data: z.infer<typeof UserLoginformSchema>) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data
      );

      return response.data as User;
    },
    onSuccess: (data) => {
      toast.success("Welcome back!");
      setUser(data);
      return router.push("/medical-dashboard");
    },
  });
};
