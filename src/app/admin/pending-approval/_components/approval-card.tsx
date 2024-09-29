import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  doctor: {
    id: number;
    image: StaticImageData;
    name: string;
    registrationNumber: string;
    lga: string;
    state: string;
    summary: string;
  };
};

const ApprovalCard = ({ doctor }: Props) => {
  return (
    <Card key={doctor.id} className="flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <CardTitle className="text-lg">{doctor.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Reg. No: {doctor.registrationNumber}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Badge variant="outline">{doctor.lga}</Badge>
            <Badge variant="outline">{doctor.state}</Badge>
          </div>
          <p className="text-sm">{doctor.summary}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="w-[48%]">
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </Button>
        <Button className="w-[48%]">
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApprovalCard;
