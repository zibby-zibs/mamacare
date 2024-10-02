"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import Image from "next/image";
import { useAuthStore } from "@/store/user";
import { User } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const description = "User pregnancy dashboard";
const PREGNANCY_DURATION_DAYS = 280; // 40 weeks in days

export function UserDashboard() {
  const user = useAuthStore((state) => state.user);

  function calculatePregnancyProgress(expectedDate: string) {
    const today = new Date();
    const deliveryDate = new Date(expectedDate);
    console.log(deliveryDate);

    // Calculate total milliseconds between now and delivery date
    const timeLeft = deliveryDate.getTime() - today.getTime();

    // Convert to days
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    console.log({ daysLeft });

    // Calculate percentage
    const percentageComplete = Math.min(
      100,
      Math.max(
        0,
        ((PREGNANCY_DURATION_DAYS - daysLeft) / PREGNANCY_DURATION_DAYS) * 100
      )
    );
    console.log({
      edd: user?.data?.expectedDeliveryDate,
      percentageComplete: Math.round(percentageComplete),
      deg: (percentageComplete / 100) * 360,
    });

    return {
      daysLeft,
      percentageComplete: Math.round(percentageComplete),
      endDegrees: (Math.round(percentageComplete) / 100) * 360,
    };
  }

  const endAngleDegrees = user?.data?.expectedDeliveryDate
    ? calculatePregnancyProgress(user?.data?.expectedDeliveryDate).endDegrees
    : 0;

  console.log({ deg: endAngleDegrees });
  const chartData = [
    {
      name: "Weeks Left",
      value: user?.data?.expectedDeliveryDate
        ? Number(calculatePregnancyProgress(user?.data?.expectedDeliveryDate))
        : 0,
      fill: "#000000",
    },
  ];

  const chartConfig = {
    value: {
      label: "Progress",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;
  return (
    <main className="min-h-svh flex flex-col justify-between py-16 max-h-svh overflow-y-auto">
      <div className="max-w-screen-lg mx-auto py-8 flex flex-wrap gap-4 items-center justify-center">
        <Card
          x-chunk="dashboard-01-chunk-0"
          className="max-w-xs h-[380px] flex flex-col justify-between bg-[#E6E6FA]"
        >
          <CardHeader className="pb-2">
            <div className="mx-auto w-fit">
              {user?.data.image ? (
                <Image
                  src={user?.data?.image}
                  alt="User Image"
                  width={50}
                  height={50}
                  className="rounded-full object-contain"
                />
              ) : (
                <Avatar className="h-auto w-auto p-2">
                  <AvatarImage
                    src={user?.data?.image as string | undefined}
                    alt="User Image"
                  />
                  <AvatarFallback className="uppercase text-2xl p-2 font-medium">
                    {user?.data?.first_name?.charAt(0)}
                    {user?.data?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <CardTitle className="text-2xl text-center my-2">
              Welcome {user?.data?.first_name} {user?.data?.last_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-auto">
            {/* <p className="text-2xl font-bold">{user.email}</p> */}
            <div className="font-outfit text-center space-y-1">
              <p>
                <span>phone: </span>
                {user?.data?.phone_number}
              </p>
              <p>
                <span>state: </span>
                {user?.data?.state}
              </p>
              <p>
                <span>LGA: </span>
                {user?.data?.lga}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* <div className="chart-wrapper mx-auto flex max-w-6xl flex-wrap items-start gap-6 p-6 sm:p-8"> */}
        {/* <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]"> */}
        <Card className="flex flex-col h-[380px] max-w-xs bg-[#B0E0E6]">
          <CardHeader className="items-center pb-0">
            <CardTitle className=" text-center font-outfit">
              Your Pregnancy Journey
            </CardTitle>
            <CardDescription className="text-center">
              You are on your way to delivery
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={endAngleDegrees}
                endAngle={0}
                innerRadius={80}
                outerRadius={140}
                className=""
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                  color="black"
                />
                <RadialBar
                  dataKey="value"
                  background
                  fill="black" // Change this to black
                  className="bg-black fill-black"
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {calculatePregnancyProgress(
                                user?.data?.expectedDeliveryDate
                              ).daysLeft ?? 0}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Weeks left
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Congratulations in advance, remember to take care of your health.
            </div> */}
            <div className="leading-none text-muted-foreground font-bold">
              Due date:{" "}
              {/* {format(user?.data?.expectedDeliveryDate, "MMM dd, yyyy")} */}
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-xs mx-auto text-center">
        <h1 className="font-bold text-3xl">Pregnancy Tip</h1>

        <div className="flex items-baseline gap-1 text-sm tabular-nums leading-none text-gray-500 mt-5">
          Stay hydrated! Aim for 8-10 glasses of water a day to support your
          body and your baby&apos;s development.
        </div>
      </div>
    </main>
  );
}
