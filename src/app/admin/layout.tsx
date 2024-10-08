import type { Metadata } from "next";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 max-h-svh overflow-y-auto pb-8">
          <div className="!sticky top-0 z-30">
            <Header />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
