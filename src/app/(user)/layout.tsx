import type { Metadata } from "next";
import UserSidebar from "@/components/user/sidebar";

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
    <html lang="en">
      <body className={` antialiased`}>
        <div className="grid h-svh max-h-svh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-y-hidden">
          <div>
            <UserSidebar />
          </div>
          <div className="max-h-svh overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
