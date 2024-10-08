import { UserLoginformSchema } from "@/lib/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "./admin-store";
import axios from "axios";
import { z } from "zod";
import {
  AdminMetrics,
  AllDoctors,
  AllUsers,
  PendingApprovals,
  RecentDoctors,
  UnapprovedDoctors,
  User,
} from "../../../types";
import { toast } from "sonner";
import axiosUserInstance from "./interception";

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
      return router.push("/admin");
    },
  });
};

export const useGetAdminMetric = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["admin-metric"],
    queryFn: async () => {
      // if (!user?.access_token) {
      //   router.push("/admin/auth/login");
      //   return;
      // }
      const response = await axiosUserInstance.get(`/admin/dashboard-metrics`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as AdminMetrics;
    },
  });
};
export const useGetAdminPendingApproval = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["admin-pending-approvals"],
    queryFn: async () => {
      // if (!user?.access_token) {
      //   router.push("/admin/auth/login");
      //   return;
      // }
      const response = await axiosUserInstance.get(
        `/admin/pending-doctor-approvals`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data as UnapprovedDoctors;
    },
  });
};

export const useGetAdminRecentUsers = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["admin-recent-users"],
    queryFn: async () => {
      // if (!user?.access_token) {
      //   router.push("/admin/auth/login");
      //   return;
      // }
      const response = await axiosUserInstance.get(`/admin/recent-users`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as PendingApprovals;
    },
  });
};

export const useGetAllUsers = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["admin-all-users"],
    queryFn: async () => {
      // if (!user?.access_token) {
      //   router.push("/admin/auth/login");
      //   return;
      // }
      const response = await axiosUserInstance.get(`/admin/all-users`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as AllUsers;
    },
  });
};

export const useGetAdminRecentDoctors = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["admin-recent-doctors"],
    queryFn: async () => {
      // if (!user?.access_token) {
      //   router.push("/admin/auth/login");
      //   return;
      // }
      const response = await axiosUserInstance.get(`/admin/recent-doctors`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as RecentDoctors;
    },
  });
};

export const useGetAllDoctors = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["admin-all-doctors"],
    queryFn: async () => {
      // if (!user?.access_token) {
      //   router.push("/admin/auth/login");
      //   return;
      // }
      const response = await axiosUserInstance.get(`/admin/all-doctors`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      return response.data as AllDoctors;
    },
  });
};

export const useApproveDoctor = (doctorId: string | null) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin-approve-doctors"],
    mutationFn: async () => {
      const response = await axiosUserInstance.patch(
        `/admin/approve-doctor/${doctorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pending-approvals"] });
      toast.success("Doctor approved");
    },
  });
};
