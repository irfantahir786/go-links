// 'use server'
import pool from "@/db/postgresdb";

import { APIResponse, LoginRequestBody } from "@/lib/types";
import axios from 'axios'




export async function loginUser({ email, password }: LoginRequestBody): Promise<APIResponse> {

  try {
    const payload = { email, password };

    const response = await axios.post("http://localhost:3001/api/auth/login", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      code: response.status,
      message: response.data.message

    };
  } catch (error: any) {
    return {
      code: error?.response?.status || 500,
      message: error?.response?.data?.message || "Invalid Credentials"

    };
  }
}


