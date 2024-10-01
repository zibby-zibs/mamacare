"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader, Upload, User } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nigerianStates } from "@/lib/states";
import { useAuthStore } from "@/store/user";
import { UserRegistrationformSchema, userProfileSchema } from "@/lib/schemas";
import { Calendar } from "@/components/ui/calendar";
import naijaStates from "naija-state-local-government";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateUser } from "@/hooks/user";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const { isPending, mutateAsync } = useUpdateUser(user?.data?.id);
  const [selectedState, setSelectedState] = React.useState<string | null>(
    user?.data?.state ?? null
  );

  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      first_name: user?.data?.first_name ?? "",
      middle_name: user?.data?.middle_name ?? "",
      last_name: user?.data?.last_name ?? "",
      email: user?.data?.email ?? "",
      phone_number: user?.data?.phone_number ?? "",
      lga: user?.data?.lga ?? "",
      state: user?.data?.state ?? "",
      expectedDeliveryDate: user?.data?.expectedDeliveryDate ?? "",
      role: "USER",
      isDoctor: false,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user?.data?.first_name ?? "",
        middle_name: user?.data?.middle_name ?? "",
        last_name: user?.data?.last_name ?? "",
        email: user?.data?.email ?? "",
        phone_number: user?.data?.phone_number ?? "",
        lga: user?.data?.lga ?? "",
        state: user?.data?.state ?? "",
        expectedDeliveryDate: user?.data?.expectedDeliveryDate ?? "",
      });
      setSelectedState(user?.data?.state ?? null);
    }
  }, [user]);

  const onSubmit = (data: z.infer<typeof userProfileSchema>) => {
    console.log(data);
    mutateAsync(data);
  };
  return (
    <main className="p-5 pt-16 max-w-screen-md max-h-[calc(100svh-60px)]  overflow-y-auto scrollbar-none">
      <h1 className="font-semibold text-lg lg:text-2xl text-black">Profile</h1>
      <p className="font-semibold text-sm text-gray-400">
        Manage settings for your profile
      </p>
      <Separator className="my-5" />

      <div className="flex items-center gap-5">
        {user?.data?.image ? (
          <Image
            src={user.data?.image}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full object-contain"
          />
        ) : (
          <Avatar className="h-[200px] w-[200px]">
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
        <div></div>
        <div>
          <p className="font-semibold text-lg">Profile picture</p>
          <p className=" pb-3 text-gray-600 text-sm">We support JPEG, PNG</p>

          <Button className="gap-3">
            Upload <Upload />
          </Button>
        </div>
      </div>
      <Separator className="my-5" />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    onValueChange={(value: string) => {
                      setSelectedState(value);
                      field.onChange(value);
                    }}
                    defaultValue={user?.data?.state || ""}
                    value={field.value || user?.data?.state}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a State" {...field} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {naijaStates.states().map((state: string) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LGA</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.data?.lga || ""}
                    value={field.value || user?.data?.lga}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a LGA" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {naijaStates
                        .lgas(selectedState ? selectedState : "Oyo")
                        ?.lgas?.map((state: string) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedDeliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expected Delivery Date</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={
                        field.value
                          ? new Date(field.value)
                          : user?.data?.expectedDeliveryDate
                          ? new Date(user.data.expectedDeliveryDate)
                          : undefined
                      }
                      onSelect={field.onChange}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full gap-2" disabled={isPending}>
              <p>Update Details</p>
              {isPending ? <Loader className="animate-spin " /> : null}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Profile;
