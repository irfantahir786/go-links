// 'use server'
import pool from "@/db/postgresdb";

import { APIResponse, ApiResponse, NodeResponse, LinksData } from "@/lib/types";
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

export async function updateCode(code: string, url: string, is_active: boolean) {
  let payload;
  if (url === "") {
    payload = {
      code: code,
      is_active: is_active
    }
  }
  else {
    payload = {
      code: code,
      is_active: is_active
    }
  }
  try {
    const response = await axios.patch(`http://localhost:3001/api/links/${code}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return ({ data: response.data })
  } catch (error: any) {
    return {
      status: error || "error",
      data: { data: "error" }

    };
  }
}

export async function viewCode(code: string): Promise<NodeResponse> {

  try {
    const response = await axios.get(`http://localhost:3001/links/view/${code}`, {
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
export async function fetchDashboard(): Promise<ApiResponse> {

  try {
    const response = await axios.get(
      "http://localhost:3001/api/dashboard",
      {
        withCredentials: true,   // ← this is what makes cookies work
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    return {
      status: response.data.status.toString(),
      data: response.data.data

    };
  } catch (error: any) {
    return {
      status: error || "error",
      data: null

    };
  }
}


