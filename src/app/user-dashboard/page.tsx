import { fetchUserById } from "@/actions/user";
import { UserDashboard } from "@/components/user/user-dashboard";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const user = await fetchUserById(cookieStore.get("userId")?.value);

  console.log(user);
  return (
    <main>
      <UserDashboard />
    </main>
  );
}
