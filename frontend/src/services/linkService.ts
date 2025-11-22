// 'use server'
import pool from "@/db/postgresdb";

import { APIResponse, LoginRequestBody, NodeResponse } from "@/lib/types";
import axios from 'axios'


export async function createLink(code: string, url: string): Promise<NodeResponse> {

  const payload = {
    code: code,
    url: url
  }


  try {
    const response = await axios.post(`http://localhost:3001/links/`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status.toString(),
      data: response.data

    };
  } catch (error: any) {
    return {
      status: error || "error",
      data: { data: "error" }

    };
  }

}


export async function updateClick(code: string) {
  const payload = {
    code: code,
  }
  try {
    const response = await axios.post(`http://localhost:3001/links/`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return ({ done: "done" })
  } catch (error: any) {
    return {
      status: error || "error",
      data: { data: "error" }

    };
  }
}





export async function checkCodeAvailablity(code: string): Promise<NodeResponse> {

  try {
    const response = await axios.get(`http://localhost:3001/links/check/${code}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status.toString(),
      data: response.data

    };
  } catch (error: any) {
    return {
      status: error || "error",
      data: { data: "error" }

    };
  }
}

export async function getAllLinks(): Promise<NodeResponse> {

  try {
    const response = await axios.get(`http://localhost:3001/links/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status.toString(),
      data: response.data

    };
  } catch (error: any) {
    return {
      status: error || "error",
      data: { data: "error" }

    };
  }
}
export async function fetchDashboard(): Promise<NodeResponse> {

  try {
    const response = await axios.get(`http://localhost:3001/links/dashboard`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: response.status.toString(),
      data: response.data

    };
  } catch (error: any) {
    return {
      status: error || "error",
      data: { data: "error" }

    };
  }
}


