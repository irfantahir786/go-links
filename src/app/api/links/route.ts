import { NextRequest, NextResponse } from 'next/server';
import pool from '@/db/postgresdb';

export async function GET(req: NextRequest) {
  try {
    const result = await pool.query('SELECT * FROM links');
    return new NextResponse(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: 'Database query failed' }), { status: 500 });
  }
}
