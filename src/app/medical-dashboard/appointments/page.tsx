"use client";

import { Suspense } from "react";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const AppointmentsList = dynamic(() => import("./_components/appointments"), {
  ssr: false,
});
export default function AppointmentsPage() {
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
