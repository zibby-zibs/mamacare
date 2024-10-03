import MetricCard from "./_components/metric-card";
import RecentAppointments from "./_components/recent-appointments";
import RecentRequests from "./_components/recent-requests";
import { fetchRequests } from "@/actions/user";
import { Request } from "../../../types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) redirect("/medical-dashboard/auth/login");
  const requestList = await fetchRequests(accessToken);
  return (
    <Suspense
      fallback={
        <div className="h-svh w-full jusc' items-center flex">
          <Loader2 className="animate-spin" size={40} />
          <p className="text-4xl font-monoton">MamaCare</p>
        </div>
      }
    >
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-screen-xl mx-auto font-poppins">
        <MetricCard />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <RecentRequests
            requests={requestList?.data?.slice(0, 5) as Request["data"]}
          />
          <RecentAppointments />
        </div>
      </main>
    </Suspense>
  );
}

export default page;
