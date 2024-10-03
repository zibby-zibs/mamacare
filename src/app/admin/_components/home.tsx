"use client";

import React from "react";
import {
  Bell,
  ChevronDown,
  Home,
  Users,
  UserPlus,
  ClipboardList,
  Menu,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAdminMetric,
  useGetAdminPendingApproval,
  useGetAdminRecentDoctors,
  useGetAdminRecentUsers,
} from "@/hooks/admin";
import { format, parseISO } from "date-fns";
type Props = {};

const HomePage = (props: Props) => {
  const {
    data: metric,
    isPending: isPendingMetric,
    isError,
    error,
  } = useGetAdminMetric();

  const {
    data: pendingApprovals,
    isPending: isPendingApprovals,
    isError: isPendingApprovalsError,
    error: pendingApprovalsError,
  } = useGetAdminPendingApproval();

  const {
    data: recentDoctors,
    isPending: isPendingDoctors,
    isError: isDoctorsError,
    error: doctorsError,
  } = useGetAdminRecentDoctors();

  const {
    data: recentUsers,
    isPending: isPendingUsers,
    isError: isUsersError,
    error: usersError,
  } = useGetAdminRecentUsers();

  return (
    <main className="p-4 md:p-6 space-y-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric?.data.totalUsers}{" "}
              {isPendingMetric && <Loader2 className="animate-spin" />}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric?.data.totalDoctors}{" "}
              {isPendingMetric && <Loader2 className="animate-spin" />}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric?.data.pendingRequests}{" "}
              {isPendingMetric && <Loader2 className="animate-spin" />}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals?.data.map((approval) => (
                <TableRow key={approval.user?.createdAt}>
                  <TableCell>
                    {approval.user?.first_name} {approval.user?.last_name}
                  </TableCell>
                  <TableCell>Doctor Registration</TableCell>
                  <TableCell className="font-medium text-muted-foreground">
                    {approval.user?.createdAt &&
                      format(
                        parseISO(approval?.user?.createdAt),
                        "MMMM d, yyyy h:mm a"
                      )}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" className="mr-2">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Users and Doctors Lists */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>

                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers?.data.map((user) => (
                  <TableRow key={user.createdAt}>
                    <TableCell>
                      {" "}
                      {user.first_name} {user.last_name}{" "}
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground">
                      {" "}
                      {user?.createdAt &&
                        format(parseISO(user.createdAt), "MMMM d, yyyy h:mm a")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>

                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDoctors?.data?.map((doctor) => (
                  <TableRow key={doctor.user?.createdAt}>
                    <TableCell>
                      {doctor.user?.first_name} {doctor.user?.last_name}
                    </TableCell>

                    <TableCell className="font-medium text-muted-foreground">
                      {doctor.user?.createdAt &&
                        format(
                          parseISO(doctor?.user?.createdAt),
                          "MMMM d, yyyy h:mm a"
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
