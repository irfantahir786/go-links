import { NextRequest, NextResponse } from "next/server";
import pool from "@/db/postgresdb"; // your Postgres pool

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const checkCode = url.searchParams.get("check_code");
    console.log(checkCode)

    if (checkCode) {
      // Check if the short code exists
      const result = await pool.query("SELECT * FROM links WHERE code = $1", [checkCode]);
      const available = result.rowCount === 0;

      return NextResponse.json({ available });
    }

    // No check_code? return all links
    const result = await pool.query("SELECT * FROM links");
    return NextResponse.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
