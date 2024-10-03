"use client";

import { Suspense } from "react";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/store/user";

const AppointmentsList = dynamic(() => import("./_components/appointments"), {
  ssr: false,
});
export default function AppointmentsPage() {
  const user = useAuthStore((state) => state.user);

  if (!user?.data?.isDoctorVerified) {
    return (
      <div className="w-full h-[calc(100svh-100px)] flex items-center justify-center">
        <p className="max-w-[350px] text-4xl text-center">
          Your account is not verified yet. Please check back later
        </p>
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="h-svh w-full jusc' items-center flex">
          <Loader2 className="animate-spin" size={40} />
          <p className="text-4xl font-monoton">MamaCare</p>
        </div>
      }
    >
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
        <AppointmentsList />
      </div>
    </Suspense>
  );
}
