import { Metadata } from "next";
import AppointmentsList from "./_components/appointments";

export const metadata: Metadata = {
  title: "Appointments | Doctor Dashboard",
  description: "View and manage your upcoming appointments",
};

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
      <AppointmentsList />
    </div>
  );
}
