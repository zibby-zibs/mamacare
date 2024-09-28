import type { Metadata } from "next";
import { Outfit, Poppins, Pacifico, Monoton } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mama Care",
  description: "Prepare for your pregnancy journey.",
};

const outfit = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
});

const monoton = Monoton({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${poppins.className} ${pacifico.className} ${monoton.className} antialiased !font-poppins`}
      >
        {children}
      </body>
    </html>
  );
}
