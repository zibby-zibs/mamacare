import Welcome from "@/components/welcome-component";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <Welcome />
    </div>
  );
};

export default page;
