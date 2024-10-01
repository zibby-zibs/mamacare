import { requests } from "@/lib/user";
import React from "react";
import RequestCard from "./_components/request-card";

const page = () => {
  const requestList = requests;
  return (
    <main className="px-5 lg:px-12 max-h-svh overflow-y-auto pb-20">
      <h1 className="text-xl lg:text-3xl py-5 font-semibold sticky z-30 top-0 bg-white/40 backdrop-blur-md">
        Requests
      </h1>
      <div className="max-w-screen-md mx-auto flex flex-wrap gap-5">
        {requestList.map((request) => (
          <RequestCard key={request.name} request={request} />
        ))}
      </div>
    </main>
  );
};

export default page;
