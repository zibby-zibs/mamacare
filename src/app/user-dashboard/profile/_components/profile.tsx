"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, User } from "lucide-react";
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

type Props = {
  user: {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    state: string;
    lga: string;
    image: StaticImageData;
    weeksPregnant: number;
  };
};

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  phoneNumber: z.string().regex(/^(\+234|0)[789]\d{9}$/, {
    message: "Enter a valid Nigerian phone number.",
  }),
  lga: z.string().min(2, { message: "LGA must be at least 2 characters." }),
  state: z.string().min(2, { message: "Please select a state." }),
});

const Profile = ({ user }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.first_name ?? "",
      middleName: user?.middle_name ?? "",
      lastName: user?.last_name ?? "",
      phoneNumber: user?.phone_number ?? "",
      lga: user?.lga ?? "",
      state: user?.state ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user?.first_name ?? "",
        middleName: user?.middle_name ?? "",
        lastName: user?.last_name ?? "",
        phoneNumber: user?.phone_number ?? "",
        lga: user?.lga ?? "",
        state: user?.state ?? "",
      });
    }
  }, [user]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <main className="p-5 pt-16 max-w-screen-md max-h-[calc(100svh-60px)]  overflow-y-auto">
      <h1 className="font-semibold text-lg lg:text-2xl text-black">Profile</h1>
      <p className="font-semibold text-sm text-gray-400">
        Manage settings for your profile
      </p>
      <Separator className="my-5" />

      <div className="flex items-center gap-5">
        {user?.image ? (
          <Image
            src={user.image}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full object-contain"
          />
        ) : (
          <User className="h-[200px] w-[200px]" />
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="+2348012345678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your Nigerian phone number starting with +234 or 0.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lga"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LGA</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Local Government Area"
                        {...field}
                      />
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nigerianStates.map((state) => (
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
            </div>
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Profile;
