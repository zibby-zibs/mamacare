"use server";

import axios from "axios";

import { Appointment, Request } from "../../types";
import { redirect } from "next/navigation";

export const fetchUserById = async (id: any, accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      redirect("/auth/login");
    }
    console.log("FETCH_SINGLE_USER_ERROR", error.response?.data);
  }
};

export const fetchRequests = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/medic/requests`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data as Request;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      redirect("/auth/login");
    }
    console.log("FETCH_REQUEST_ERROR", error.response?.data);
  }
};
export const fetchRecentAppointments = async (
  doctorId: string,
  accessToken: string
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}//medic/appointments/recent/${doctorId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data as Appointment;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      redirect("/auth/login");
    }
    console.log("FETCH_APPOINTMENT_ERROR", error.response?.data);
  }
};
