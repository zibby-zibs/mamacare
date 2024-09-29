import React from "react";
import ApprovalCard from "./_components/approval-card";
import { portrait } from "@/images";

type Props = {};

const page = (props: Props) => {
  const pendingApprovals = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      registrationNumber: "MDC123456",
      image: portrait,
      lga: "Ikeja",
      state: "Lagos",
      summary:
        "Cardiologist with 10 years of experience, specializing in interventional cardiology.",
    },
    {
      id: 2,
      name: "Dr. Michael Johnson",
      registrationNumber: "MDC789012",
      image: portrait,
      lga: "Owerri",
      state: "Imo",
      summary:
        "Pediatrician focused on neonatal care, 8 years of practice in leading hospitals.",
    },
    {
      id: 3,
      name: "Dr. Amina Bello",
      registrationNumber: "MDC345678",
      image: portrait,
      lga: "Kano Municipal",
      state: "Kano",
      summary:
        "Neurologist specializing in stroke treatment and rehabilitation, 12 years of experience.",
    },
  ];
  return (
    <div className="max-w-screen-xl mx-auto px-5 lg:px-12 mt-20">
      <h1 className="text-3xl font-bold mb-6">Pending Doctor Approvals</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pendingApprovals.map((doctor) => (
          <ApprovalCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default page;
