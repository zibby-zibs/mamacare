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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DoctorRegistrationformSchema,
  UserLoginformSchema,
  UserRegistrationformSchema,
  userProfileSchema,
} from "@/lib/schemas";
import { useSignIn } from "@/hooks/user";

const carouselImages = [
  pregnant_womaan_one,
  pregnant_woman_two,
  pregnant_woman_three,
  pregnant_woman_four,
];

const SignupPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { isPending, mutateAsync } = useSignIn();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const form = useForm<z.infer<typeof UserLoginformSchema>>({
    resolver: zodResolver(UserLoginformSchema),
    defaultValues: {
      email: "",
      password: "",
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

  function onSubmit(values: z.infer<typeof UserLoginformSchema>) {
    console.log(values);
    mutateAsync(values);
  }

  return (
    <div className="w-full lg:grid lg:grid-cols-2 !max-h-svh min-h-svh overflow-hidden px-6">
      <div className="py-12 flex items-center justify-center overflow-y-auto min-h-[calc(100svh-50px)] max-h-[calc(100svh-50px)] scrollbar-none">
        <div className="mx-auto grid w-[520px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-balance text-muted-foreground">
              Login to access the best pregnancy care
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
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
                      <Input placeholder="Enter password" {...field} />
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
                <p>Login</p>
                {isPending ? <Loader className="animate-spin " /> : null}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              Sign Up
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
