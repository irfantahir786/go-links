'use client'
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")





    return (
        <main className="min-h-screen flex items-center justify-center px-6 bg-gray-800">
            <div className="w-full max-w-md bg-slate-700 p-8 rounded-xl shadow-sm border">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Login
                </h1>

                <form className="space-y-4">

                    <div>
                        <label className="block text-sm mb-1 font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-gray-300"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 font-medium">Password</label>
                        <input
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-gray-300"
                            placeholder="********"
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 cursor-pointer">
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-200 mt-4">
                    Don’t have an account?{" "}
                    <a href="/register" className="font-medium underline">
                        Create Account
                    </a>
                </p>
            </div>
        </main>
    );
}
