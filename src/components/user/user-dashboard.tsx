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

import { user } from "@/lib/user";

import Image from "next/image";

export const description = "User pregnancy dashboard";

export function UserDashboard() {
  function calculateDueDate(weeksPregnant: number, daysPregnant = 0) {
    const today = new Date();
    const totalDaysPregnant = weeksPregnant * 7 + daysPregnant;
    const daysUntilDue = 280 - totalDaysPregnant; // 280 days is the average pregnancy duration
    const dueDate = new Date(
      today.getTime() + daysUntilDue * 24 * 60 * 60 * 1000
    );
    return dueDate;
  }
  const totalWeeks = 40;
  const dueDate = calculateDueDate(user.weeksPregnant);
  const weeksLeft = Math.max(0, totalWeeks - user.weeksPregnant);

  const progressPercentage = (user.weeksPregnant / totalWeeks) * 100;

  const endAngleDegrees = (progressPercentage / 100) * 360;
  const chartData = [
    {
      name: "Weeks Left",
      value: progressPercentage,
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Months Gone",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
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
              <Image
                src={user.image}
                alt="User Image"
                width={50}
                height={50}
                className="rounded-full object-contain"
              />
            </div>
            <CardTitle className="text-2xl text-center my-2">
              Welcome {user.first_name} {user.last_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-auto">
            {/* <p className="text-2xl font-bold">{user.email}</p> */}
            <div className="font-outfit text-center space-y-1">
              <p>
                <span>phone: </span>
                {user.phone_number}
              </p>
              <p>
                <span>state: </span>
                {user.state}
              </p>
              <p>
                <span>LGA: </span>
                {user.lga}
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
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="value" background />
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
                              {weeksLeft}
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
              Due date: {dueDate.toDateString()}
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
