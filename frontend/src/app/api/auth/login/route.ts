import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/db/postgresdb";
import { LoginRequestBody } from "@/lib/types";






export async function POST(req: NextRequest) {
    //  const formData = await request.formData();

    console.log(process.env.DATABASE_URL)

    const data: LoginRequestBody = (await req.json()) as LoginRequestBody;

   

    const { email, password }: LoginRequestBody = data

    if (email === undefined || password === undefined) {
        return new NextResponse(JSON.stringify({ error: "Email or password is invalid" }));
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return new NextResponse(JSON.stringify({ error: "Email not Found", }));
        }
        const user = result.rows[0]
        if (user.password === data.password) {
            return new NextResponse(JSON.stringify({ error: "login done", }), {status : 200});
        }
        else {
            return new NextResponse( JSON.stringify({ error: "Invalid Password" }),{ status: 401 });
        }

    }
    catch (err) {
        console.log(`error ${err}`)
        return new NextResponse( JSON.stringify({ error: err }),{ status: 500 });
    }










    //return new NextResponse(JSON.stringify({ error: email }))

}

