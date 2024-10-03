import Image from "next/image";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <main className="h-svh w-screen flex items-center justify-center backdrop-blur-md bg-white/40">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={100}
        height={100}
        className=" animate-pulse"
      />
    </main>
  );
};

export default Loading;
