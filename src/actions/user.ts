"use server";

import axios from "axios";
import { cookies } from "next/headers";

const cookieStore = cookies();
export const fetchUserById = async (id: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("FETCH_SINGLE_USER_ERROR", error);
  }
};
