"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserRequests, useRequestDoctor } from "@/hooks/user";
import { useAuthStore } from "@/store/user";
import { LucideLoader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Request = (props: Props) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { isPending, mutateAsync } = useRequestDoctor(user?.data?.id);
  const [description, setDescription] = useState("");
  const { data, isError, error } = useGetUserRequests(user?.data?.id);
  const requestId = data?.data?.find(
    (request: any) => request.status === "ACCEPTED"
  )?.id;

  const onSubmit = async () => {
    mutateAsync({ description });
  };

  useEffect(() => {
    if (isError) {
      if ((error as any)?.response?.status === 401) {
        router.push("/auth/login");
      }
    }
  }, [error, isError]);
  return (
    <Dialog>
      <DialogTrigger disabled={!!requestId}>
        <Button className=" text-white" disabled={!!requestId}>
          Request a doctor
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Request a doctor</DialogTitle>
        <div className="space-y-4">
          <Label>Enter a short description of your condition</Label>
          <Input
            placeholder="Enter a short message"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={onSubmit}>
            Send
            {isPending ? <LucideLoader className="animate-spin" /> : null}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Request;
