import { NextRequest, NextResponse } from "next/server";

import pool from "@/db/postgresdb"



type LoginRequestBody = {
    code: string;
    url: string;
}

export default function handler(request: NextRequest) {
    console.log("Hllo")

}


// export async function GET(request: NextRequest) {
//     return NextResponse.json({ hello: "yes" })

// }