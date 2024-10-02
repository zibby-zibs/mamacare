"use client";

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
import { ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Request } from "../../../../types";
import { useAcceptRequests } from "@/hooks/doctor";
import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";

type Props = {
  requests: Request["data"];
};

const RecentRequests = ({ requests }: Props) => {
  const router = useRouter();
  const user = useAuthStore((store) => store.user);
  const [requestId, setRequestId] = useState("");
  const [toId, setToId] = useState("");
  const { mutateAsync, isPending } = useAcceptRequests(requestId, toId);

  const onSubmit = async () => {
    await mutateAsync({ doctorId: user?.data?.doctorId, status: "ACCEPTED" });
    router.refresh();
  };
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>
            Recent requests that are pending approval
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="requests">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expectant Mom</TableHead>

              {/* <TableHead className="text-right"></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="font-medium">
                    {request.user.first_name} {request.user.last_name}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {request.description}
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      setRequestId(request.id);
                      setToId(request.user.id);
                      await onSubmit();
                    }}
                  >
                    Accept
                    {requestId === request.id && isPending && (
                      <Loader2 className="animate-spin" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentRequests;
