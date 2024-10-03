import type { Metadata } from "next";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Medical Dashboard",
  description: "Dashboard for medical professionals to help pregnant women.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div>
        <Navbar />
      </div>
      <div className="">{children}</div>
    </div>
  );
}
