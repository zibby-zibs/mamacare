"use client";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllDoctors } from "@/hooks/admin";

type Props = {};

const UsersPage = (props: Props) => {
  const { data, isPending, isError, error } = useGetAllDoctors();
  return (
    <div className="px-5 lg:px-12">
      <div className="max-w-screen-xl mx-auto py-10 ">
        <h1 className="text-2xl font-bold mb-5">Doctors</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>

              <TableHead>Last Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>State</TableHead>
              <TableHead>LGA</TableHead>
              <TableHead>Registration Number</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((user) => (
              <TableRow key={user.user?.phone_number}>
                <TableCell>{user.user?.first_name}</TableCell>

                <TableCell>{user.user?.last_name}</TableCell>
                <TableCell>{user.user?.phone_number}</TableCell>
                <TableCell>{user.user?.state}</TableCell>
                <TableCell>{user.user?.lga}</TableCell>
                <TableCell>{user.user?.reg_number}</TableCell>
                <TableCell>{user.user?.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
