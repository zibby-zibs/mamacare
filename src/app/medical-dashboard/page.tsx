import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MetricCard from "./_components/metric-card";
import RecentAppointments from "./_components/recent-appointments";
import RecentRequests from "./_components/recent-requests";
import { fetchRequests } from "@/actions/user";
import { Request } from "../../../types";

async function page() {
  const requestList = await fetchRequests();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-screen-xl mx-auto font-poppins">
      <MetricCard />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <RecentRequests
          requests={requestList?.data?.slice(0, 5) as Request["data"]}
        />
        <RecentAppointments />
      </div>
    </main>
  );
}

export default page;
