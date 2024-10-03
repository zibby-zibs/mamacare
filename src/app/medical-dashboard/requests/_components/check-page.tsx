"use client";

import { useAuthStore } from "@/store/user";
import React from "react";
import RequestCard from "./request-card";
import { Request } from "../../../../../types";

type Props = {
  requestList: Request;
};

const CheckPage = ({ requestList }: Props) => {
  const user = useAuthStore((state) => state.user);

  if (!user?.data?.isDoctorVerified) {
    return (
      <div className="w-full h-[calc(100svh-100px)] flex items-center justify-center">
        <p className="max-w-[350px] text-4xl text-center">
          Your account is not verified yet. Please check back later
        </p>
      </div>
    );
  }
  return (
    <main className="px-5 lg:px-12 max-h-svh overflow-y-auto pb-20">
      <h1 className="text-xl lg:text-3xl py-5 font-semibold sticky z-30 top-0 bg-white/40 backdrop-blur-md">
        Requests
      </h1>

      {requestList?.data?.length === 0 && (
        <div className="flex items-center justify-center h-[calc(100svh-200px)]">
          <p className="text-2xl">No requests found</p>
        </div>
      )}
      <div className="max-w-screen-md mx-auto flex flex-wrap gap-5">
        {requestList?.data?.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </main>
  );
};

export default CheckPage;
