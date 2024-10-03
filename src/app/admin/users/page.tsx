"use client";

import React from "react";
import UserTable from "./_components/user-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetAllUsers } from "@/hooks/admin";

type Props = {};

const UsersPage = (props: Props) => {
  const { data, isPending, isError, error } = useGetAllUsers();
  return (
    <div className="px-5 lg:px-12">
      <div className="max-w-screen-xl mx-auto py-10 ">
        <h1 className="text-2xl font-bold mb-5">Users</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((user) => (
              <TableRow key={user.phone_number}>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
