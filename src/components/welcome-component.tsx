"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Welcome = () => {
  const [userType, setUserType] = useState("");

  const handleSignUp = () => {
    switch (userType) {
      case "patient":
        window.location.href = "auth/sign-up";
        break;
      case "medical":
        window.location.href = "/medical-dashboard/auth/register";
        break;
      case "admin":
        window.location.href = "/admin/sign-up";
        break;
      default:
        alert("Please select a user type");
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome to <br />
          <span className=" font-fret">
            Mama <span className="text-primary">C</span>are
          </span>
        </CardTitle>
        <CardDescription className="text-center">
          Your comprehensive pregnancy journey companion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-center">
            Join our community and start your journey today!
          </p>
          <Select onValueChange={setUserType}>
            <SelectTrigger>
              <SelectValue placeholder="Which best describes you?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Expectant Mother</SelectItem>
              <SelectItem value="medical">Medical Professional</SelectItem>
              {/* <SelectItem value="admin">Administrator</SelectItem> */}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/auth/login")}
        >
          Patient Login
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            (window.location.href = "/medical-dashboard/auth/login")
          }
        >
          Medical Pro Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Welcome;
