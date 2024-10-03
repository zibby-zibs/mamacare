import React, { Suspense } from "react";
import HomePage from "./_components/home";
import { Loader2 } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  return (
    <Suspense
      fallback={
        <div className="h-svh w-full jusc' items-center flex">
          <Loader2 className="animate-spin" size={40} />
          <p className="text-4xl font-monoton">MamaCare</p>
        </div>
      }
    >
      <div>
        <HomePage />
      </div>
    </Suspense>
  );
};

export default page;
