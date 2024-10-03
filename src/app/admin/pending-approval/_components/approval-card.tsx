import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { UnapprovedDoctors } from "../../../../../types";

type Props = {
  doctor: UnapprovedDoctors["data"][0];
};

const ApprovalCard = ({ doctor }: Props) => {
  return (
    <Card key={doctor.user.createdAt} className="flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              <p>
                {doctor.user.first_name[0]} {doctor.user.last_name[0]}
              </p>
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {doctor.user?.first_name} {doctor.user?.last_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Reg. No:</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex space-x-2">
            {/* <Badge variant="outline">{doctor.lga}</Badge> */}
            {/* <Badge variant="outline">{doctor.state}</Badge> */}
          </div>
          {/* <p className="text-sm">{doctor.summary}</p> */}
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
