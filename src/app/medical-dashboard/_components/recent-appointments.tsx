"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRecentAppointments } from "@/hooks/doctor";
import { format, formatDate, parseISO } from "date-fns";
import React from "react";

type Props = {};

const RecentAppointments = (props: Props) => {
  const { data, isPending } = useGetRecentAppointments();
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {!isPending &&
          data?.data?.map((appointment) => (
            <div className="flex items-center gap-4" key={appointment.id}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  {appointment.user.first_name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {appointment.user.first_name} {appointment.user.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(parseISO(appointment.date), "MMMM d, yyyy h:mm a")}
                </p>
                {/* <p className="text-sm text-muted-foreground">
                  11:00am - 12:30pm
                </p> */}
              </div>
            </div>
          ))}

        {!isPending && data?.data.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            No appointments found
          </div>
        )}

        {isPending && (
          <div className="grid gap-6">
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAppointments;
