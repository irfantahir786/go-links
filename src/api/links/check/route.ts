import { NextRequest, NextResponse } from "next/server";

import pool from "@/db/postgresdb"



type LoginRequestBody = {
    code: string;
}


export async function POST(req: NextRequest) {
    //  const formData = await request.formData();
    const data: LoginRequestBody = (await req.json()) as LoginRequestBody;

    const { code }: LoginRequestBody = data;
    

    return new NextResponse(JSON.stringify({ error: code }));

    if (code === undefined) {
        return new NextResponse(JSON.stringify({ error: "Email or password is invalid" }));
    }

    try {
        const result = await pool.query('SELECT * FROM links WHERE code = $1', [code]);

        if (result.rows.length === 0) {
            return new NextResponse(JSON.stringify({ error: "Email not Found", }));
        }
        const user = result.rows[0]
        if (user.password === data.code) {
            return new NextResponse(JSON.stringify({ error: "login done", }));
        }
        else {
            return new NextResponse(JSON.stringify({ error: "Invalid Password", }));
        }

    }
    catch (err) {

    }










    //return new NextResponse(JSON.stringify({ error: email }))

}