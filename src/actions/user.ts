"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { Appointment, Request } from "../../types";

const cookieStore = cookies();
export const fetchUserById = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("FETCH_SINGLE_USER_ERROR", error.response.data);
  }
};

export const fetchRequests = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/medic/requests`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
        },
      }
    );

    return response.data as Request;
  } catch (error: any) {
    console.log("FETCH_REQUEST_ERROR", error.response.data);
  }
};
export const fetchRecentAppointments = async (doctorId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}//medic/appointments/recent/${doctorId}`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
        },
      }
    );

    return response.data as Appointment;
  } catch (error: any) {
    console.log("FETCH_APPOINTMENT_ERROR", error.response.data);
  }
};
