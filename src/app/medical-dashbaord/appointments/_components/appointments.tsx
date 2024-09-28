"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
}

const initialAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Alice Johnson",
    date: "2024-03-15",
    time: "09:00 AM",
    type: "Check-up",
  },
  {
    id: "2",
    patientName: "Bob Smith",
    date: "2024-03-15",
    time: "10:30 AM",
    type: "Ultrasound",
  },
  {
    id: "3",
    patientName: "Carol Williams",
    date: "2024-03-16",
    time: "02:00 PM",
    type: "Consultation",
  },
  {
    id: "4",
    patientName: "David Brown",
    date: "2024-03-17",
    time: "11:00 AM",
    type: "Follow-up",
  },
  {
    id: "5",
    patientName: "Eva Davis",
    date: "2024-03-17",
    time: "03:30 PM",
    type: "Check-up",
  },
];

export default function AppointmentsList() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  const handleCancelAppointment = (id: string) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
    // In a real application, you would also make an API call to update the backend
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{appointment.patientName}</span>
              <Badge variant="outline">{appointment.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <span>{appointment.patientName}</span>
              </div>
              <Button
                variant="destructive"
                className="w-full mt-4"
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                Cancel Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
