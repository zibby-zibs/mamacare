import {
  DoctorRegistrationformSchema,
  UserLoginformSchema,
} from "@/lib/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/user";
import { Appointment, Metric, Request, User } from "../../../types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-config";
import axiosUserInstance from "./interception";

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

//requests
export const useAcceptRequests = (
  id: string | undefined,
  toId: string | string
) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["accept-request"],
    mutationFn: async (data: {
      doctorId: string | undefined;
      status: "ACCEPTED" | "REJECTED";
    }) => {
      const response = await axiosUserInstance.patch(
        `/medic/accept-request/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: async (data) => {
      const messageRef = collection(db, "messages", id!, "chat");
      try {
        await addDoc(messageRef, {
          text: `Hi, my name is ${user?.data?.first_name} ${user?.data?.last_name}, I am your doctor`,
          name: `${user?.data?.first_name} ${user?.data?.last_name}`,
          userId: user?.data?.id,
          type: "text",
          to: toId,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.log("Error sending message", error);
      }
      toast.success("Request accepted, you can start a conversation");
      queryClient.invalidateQueries({
        queryKey: ["recent-appointments", "all-appointments"],
      });
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

export const useGetRecentAppointments = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["recent-appointments"],
    queryFn: async () => {
      const response = await axiosUserInstance.get(
        `/medic/appointments/recent/${user?.data?.doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data as Appointment;
    },
  });
};

export const useGetAppointments = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["all-appointments"],
    queryFn: async () => {
      const response = await axiosUserInstance.get(
        `/medic/appointments/${user?.data?.doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data as Appointment;
    },
  });
};

export const useGetRequests = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["all-requests"],
    queryFn: async () => {
      const response = await axiosUserInstance.get(`/medic/requests`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as Request;
    },
  });
};

export const useGetMetrics = (id: string | undefined) => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["doctor-metrics"],
    queryFn: async () => {
      const response = await axiosUserInstance.get(`/medic/${id}/metrics`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as Metric;
    },
  });
};

export const useAcceptAppointment = (appointmentId: string | null) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["accept-appointment"],
    mutationFn: async () => {
      const response = await axiosUserInstance.patch(
        `/medic/accept-appointment/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data as Appointment;
    },
    onSuccess: () => {
      toast.success("Appointment accepted!");
      queryClient.invalidateQueries({
        queryKey: ["all-requests"],
      });
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        router.push("/auth/login");
      }
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      console.log("Error accepting appointment", error);
    },
  });
};

export const useRejectAppointment = (appointmentId: string | null) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reject-appointment"],
    mutationFn: async () => {
      const response = await axiosUserInstance.patch(
        `/medic/reject-appointment/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data as Appointment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-requests"],
      });
      toast.success("Appointment rejected");
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        router.push("/auth/login");
      }
      toast.error(error?.response?.data?.message ?? "Something went wrong");
      console.log("Error rejecting appointment", error);
    },
  });
};
