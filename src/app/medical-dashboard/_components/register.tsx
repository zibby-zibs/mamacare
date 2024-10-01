"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  pregnant_womaan_one,
  pregnant_woman_four,
  pregnant_woman_three,
  pregnant_woman_two,
} from "@/images";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DoctorRegistrationformSchema } from "@/lib/schemas";

import NaijaStates from "naija-state-local-government";
import { useSignUp } from "@/hooks/doctor";

const carouselImages = [
  pregnant_womaan_one,
  pregnant_woman_two,
  pregnant_woman_three,
  pregnant_woman_four,
];

const SignupPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const { isPending, mutateAsync } = useSignUp();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const form = useForm<z.infer<typeof DoctorRegistrationformSchema>>({
    resolver: zodResolver(DoctorRegistrationformSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      phone_number: "",
      reg_number: "",
      state: "",
      lga: "",
      role: "PRACTITIONER",
      isDoctor: true,
      school: "",
      description: "",
    },
  });

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) =>
        (prevImage - 1 + carouselImages.length) % carouselImages.length
    );
  };

  function onSubmit(values: z.infer<typeof DoctorRegistrationformSchema>) {
    console.log(values);
    mutateAsync(values);
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 !max-h-svh min-h-svh overflow-hidden">
      <div className="py-12 overflow-y-auto min-h-[calc(100svh-50px)] max-h-[calc(100svh-50px)] scrollbar-none">
        <div className="mx-auto grid max-w-[520px] gap-6 w-full">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create an account with MamaCare
            </p>
          </div>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                name="reg_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {NaijaStates.states().map((state: string) => (
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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a LGA" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {NaijaStates.lgas(
                          selectedState ? selectedState : "Oyo"
                        )?.lgas?.map((state: string) => (
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
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input placeholder="University of Ibadan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description of skills</FormLabel>
                    <FormControl>
                      <Input placeholder="I major in..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isPending}
              >
                <p>Register</p>
                {isPending ? <Loader className="animate-spin " /> : null}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/medical-dashboard/auth/login"
              className="text-primary hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden relative bg-muted lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={carouselImages[currentImage]}
            alt={`Pregnancy Journey ${currentImage + 1}`}
            width={1920}
            height={1080}
            className="h-full w-full object-cover transition-opacity duration-500 dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/75"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/75"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next image</span>
        </Button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImage ? "bg-primary" : "bg-background/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
