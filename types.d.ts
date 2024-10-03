import { create } from "zustand";
import { description } from "./src/components/user/user-dashboard";

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  state: string;
  lga: string;
  phone_number: string;
  isDoctor: boolean;
  doctorId: string;
  school: string | null;
  reg_number: string | null;
  description: string | null;
  doctorId: string | null;
  image: string | null;
  role: "PRACTITIONER" | "USER";
  expectedDeliveryDate: date | null;
  createdAt: string;
  updatedAt: string;
}

interface User {
  message: string;
  hasError: false;
  access_token: string;
  token_expiration: string;
  data: UserData;
}

interface Request {
  message: string;
  data: {
    id: string;
    userId: string;
    doctorId: string | null;
    description: string;
    status: "PENDING" | "ACCEPTED";
    createdAt: string;
    updatedAt: string;
    user: UserData;
    doctor: string | null;
  }[];
}

interface Appointment {
  message: string;
  data: {
    id: string;
    userId: string;
    doctorId: string;
    date: string;
    status: "PENDING" | "ACCEPTED";
    description: string;
    createdAt: string;
    updatedAt: string;
    user: UserData;
  }[];
  hasError: boolean;
}

interface Message {
  id: string;
  name: string;
  text: string;
  userId: string;
  createdAt: {
    Timestamp: {
      seconds: number;
      nanoseconds: number;
    };
  };
}

interface Metric {
  message: string;
  data: {
    newRequests: number;
    unapprovedAppointments: number;
    engagedWomen: number;
  };
  hasError: boolean;
}
