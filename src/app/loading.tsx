import Loading from "@/components/loading";
import React from "react";

type Props = {};

const LoaderPage = (props: Props) => {
  return (
    <div className="flex w-full h-svh items-center justify-center">
      <Loading />;
    </div>
  );
};

export default LoaderPage;
