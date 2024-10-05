import {
  UserLoginformSchema,
  UserRegistrationformSchema,
  userProfileSchema,
} from "@/lib/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/user";
import { Request, User } from "../../../types";
import axiosUserInstance from "./interception";

export const useSignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationKey: ["sign-up-user"],
    mutationFn: async (data: z.infer<typeof UserRegistrationformSchema>) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        data
      );

      return response.data as User;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Welcome to mamacare, your guide to a successful delivery");
      router.push("/user-dashboard");
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
    mutationKey: ["sign-in"],
    mutationFn: async (data: z.infer<typeof UserLoginformSchema>) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data
      );

      return response.data as User;
    },
    onSuccess: (data) => {
      toast.success("Welcome to Mamacare, your guide to a successful delivery");
      setUser(data);
      return router.push("/user-dashboard");
    },
  });
};

export const useUpdateUser = (id: string | undefined) => {
  const router = useRouter();
  const updateUser = useAuthStore((state) => state.updateUser);
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (data: Partial<z.infer<typeof userProfileSchema>>) => {
      const response = await axiosUserInstance.patch(`/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      // updateUser(data);
      toast.success("Your data has been updated successfully!");
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        router.push("/auth/login");
      }
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      console.log(error);
    },
  });
};
export const useRequestDoctor = (id: string | undefined) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationKey: ["request-doctor-user"],
    mutationFn: async (data: { description: string }) => {
      const response = await axiosUserInstance.post(
        `/user/${id}/create-request`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("A doctor will respond to you soon!");
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        router.push("/auth/login");
      }
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      console.log(error);
    },
  });
};

export const useCreateAppointment = (id: string | undefined) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationKey: ["create-appointment-user"],
    mutationFn: async (data: {
      description: string;
      doctorId: string;
      date: Date;
    }) => {
      const response = await axiosUserInstance.post(
        `/user/${id}/create-appointment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("An appointment has been scheduled with your doctor!");
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        router.push("/auth/login");
      }
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      console.log(error);
    },
  });
};

export const useGetUserRequests = (id: string | undefined) => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["get-user-requests"],
    queryFn: async () => {
      const response = await axiosUserInstance.get(`/user/${id}/requests`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as Request;
    },
  });
};
