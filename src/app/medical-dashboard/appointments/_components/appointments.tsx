"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckIcon,
  Clock,
  Loader2,
  MessageCircle,
  User,
} from "lucide-react";
import {
  useAcceptAppointment,
  useGetAppointments,
  useGetRecentAppointments,
  useRejectAppointment,
} from "@/hooks/doctor";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isPending } = useGetAppointments();
  const { mutateAsync, isPending: isRejecting } =
    useRejectAppointment(selectedId);
  const { mutateAsync: acceptAppointment, isPending: isAccepting } =
    useAcceptAppointment(selectedId);

  const handleCancelAppointment = async () => {
    await mutateAsync();
  };

  const handleAcceptAppointment = async () => {
    await acceptAppointment();
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {!isPending &&
          data?.data?.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>
                    {appointment.user.first_name} {appointment.user.last_name}
                  </span>
                  {/* <Badge variant="outline">{appointment.type}</Badge> */}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {format(
                        parseISO(appointment.date),
                        "MMMM d, yyyy h:mm a"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>{appointment.description}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="mr-2 h-4 w-4" />
                    <span>
                      {appointment.user.first_name} {appointment.user.last_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 ">
                    <Button
                      disabled={appointment.status === "ACCEPTED"}
                      className="w-full mt-4"
                      onClick={() => {
                        setSelectedId(appointment.id);
                        handleAcceptAppointment();
                      }}
                    >
                      {appointment.status === "ACCEPTED" ? (
                        <CheckIcon />
                      ) : (
                        "Accept Appointment"
                      )}
                      {isAccepting && <Loader2 className="animate-spin" />}
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full mt-4"
                      onClick={() => {
                        setSelectedId(appointment.id);
                        handleCancelAppointment();
                      }}
                    >
                      Cancel Appointment
                      {isRejecting && <Loader2 className="animate-spin" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {data?.data.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            No appointments found
          </div>
        )}
      </div>
      {isPending && (
        <div className="flex flex-wrap justify-center items-center gap-3 w-full">
          <Skeleton className="w-[70vw] md:w-[45vw] lg:w-[30vw] h-[220px]" />
          <Skeleton className="w-[70vw] md:w-[45vw] lg:w-[30vw] h-[220px]" />
          <Skeleton className="w-[70vw] md:w-[45vw] lg:w-[30vw] h-[220px]" />
          <Skeleton className="w-[70vw] md:w-[45vw] lg:w-[30vw] h-[220px]" />
          <Skeleton className="w-[70vw] md:w-[45vw] lg:w-[30vw] h-[220px]" />
          <Skeleton className="w-[70vw] md:w-[45vw] lg:w-[30vw] h-[220px]" />
        </div>
      )}
    </>
  );
}
