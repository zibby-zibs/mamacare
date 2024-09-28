import React from "react";
import Profile from "./_components/profile";
import { user } from "@/lib/user";

const ProfilePage = () => {
  const userData = user;
  return (
    <main>
      <Profile user={userData} />
    </main>
  );
};

export default ProfilePage;
