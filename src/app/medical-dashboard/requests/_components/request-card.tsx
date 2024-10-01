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

interface DoctorRequestProps {
  request: {
    name: string;
    message: string;
    image: StaticImageData;
  };
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
        <Image
          src={request.image}
          alt={request.name}
          height={48}
          width={48}
          className="rounded-full mx-auto object-contain"
        />
        {/* <Avatar className="h-12 w-12">
          <AvatarImage src={request.image} alt={request.name} />
          <AvatarFallback>
            {request.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar> */}
        <CardTitle className="text-center">{request.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{request.message}</p>
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
