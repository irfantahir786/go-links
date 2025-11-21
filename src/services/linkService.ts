// 'use server'
import pool from "@/db/postgresdb";

import { APIResponse, LoginRequestBody } from "@/lib/types";
import axios from 'axios'




export async function checkCodeAvailablity(code : string): Promise<APIResponse> {

  try {
    const payload = { code};

    const response = await axios.post("https://localhost:3000/api/links/check", payload, {
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


