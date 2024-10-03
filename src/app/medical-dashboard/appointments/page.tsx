"use client";

import AppointmentsList from "./_components/appointments";

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
      <AppointmentsList />
    </div>
  );
}
