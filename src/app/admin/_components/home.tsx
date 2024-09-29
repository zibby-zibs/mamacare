import React from "react";
import {
  Bell,
  ChevronDown,
  Home,
  Users,
  UserPlus,
  ClipboardList,
  Menu,
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
type Props = {};

const HomePage = (props: Props) => {
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
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
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
            <div className="text-2xl font-bold">12</div>
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
              <TableRow>
                <TableCell>Dr. Jane Smith</TableCell>
                <TableCell>Doctor Registration</TableCell>
                <TableCell>2023-09-15</TableCell>
                <TableCell>
                  <Button size="sm" className="mr-2">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>User Verification</TableCell>
                <TableCell>2023-09-14</TableCell>
                <TableCell>
                  <Button size="sm" className="mr-2">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
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
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Alice Johnson</TableCell>
                  <TableCell>alice@example.com</TableCell>
                  <TableCell>2023-09-10</TableCell>
                </TableRow>
                <TableCell>Bob Williams</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>2023-09-09</TableCell>
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
                  <TableHead>Specialty</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Dr. Emily Brown</TableCell>
                  <TableCell>Cardiology</TableCell>
                  <TableCell>2023-09-08</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Dr. Michael Lee</TableCell>
                  <TableCell>Pediatrics</TableCell>
                  <TableCell>2023-09-07</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
