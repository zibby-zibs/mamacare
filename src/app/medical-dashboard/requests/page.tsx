import { requests } from "@/lib/user";
import React from "react";
import RequestCard from "./_components/request-card";
import { fetchRequests } from "@/actions/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) redirect("/medical-dashboard/auth/login");
  const requestList = await fetchRequests(accessToken);
  // const requestList = requests;
  return (
    <main className="px-5 lg:px-12 max-h-svh overflow-y-auto pb-20">
      <h1 className="text-xl lg:text-3xl py-5 font-semibold sticky z-30 top-0 bg-white/40 backdrop-blur-md">
        Requests
      </h1>
      <div className="max-w-screen-md mx-auto flex flex-wrap gap-5">
        {requestList?.data?.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </main>
  );
};

export default page;
