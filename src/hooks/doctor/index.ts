import {
  DoctorRegistrationformSchema,
  UserLoginformSchema,
} from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/user";

export const useSignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationKey: ["sign-up-doctor"],
    mutationFn: async (data: z.infer<typeof DoctorRegistrationformSchema>) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        data
      );

      return response.data as User;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Welcome to mamacare, your guide to a successful delivery");
      router.push("/medical-dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      console.log(error);
    },
  });
};

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
