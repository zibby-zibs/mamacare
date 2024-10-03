import { requests } from "@/lib/user";
import React from "react";
import RequestCard from "./_components/request-card";
import { fetchRequests } from "@/actions/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckPage from "./_components/check-page";

const page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) redirect("/medical-dashboard/auth/login");
  const requestList = await fetchRequests(accessToken);
  // const requestList = requests;
  return <CheckPage requestList={requestList!} />;
};

export default page;
