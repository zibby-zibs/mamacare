"use client";

import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Request } from "../../../../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DoctorRequestProps {
  request: Request["data"][0];
}

export default function RequestCard({ request }: DoctorRequestProps) {
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    setIsApproved(true);
    // Here you would typically call an API to update the approval status
  };

  return (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-col items-center gap-4">
        {request.user.image ? (
          <Image
            src={request.user.image}
            alt={request.user.first_name}
            height={48}
            width={48}
            className="rounded-full mx-auto object-contain"
          />
        ) : (
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {request.user.first_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        {/* <Avatar className="h-12 w-12">
          <AvatarImage src={request.image} alt={request.name} />
          <AvatarFallback>
            {request.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        )}
        {/* <Avatar className="h-12 w-12">
          <AvatarImage src={request.image} alt={request.name} />
          <AvatarFallback>
            {request.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar> */}
        <CardTitle className="text-center">
          {request.user.first_name} {request.user.last_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center">
          {request.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleApprove}
          disabled={isApproved}
        >
          {isApproved ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Approved
            </>
          ) : (
            "Approve Request"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
