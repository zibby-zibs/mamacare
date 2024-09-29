import React from "react";
import UserTable from "./_components/user-table";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="px-5 lg:px-12">
      <UserTable />
    </div>
  );
};

export default page;
