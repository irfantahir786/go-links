'use client'
import { FormEventHandler, useState } from "react";

export default function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleRegisteration = async (e: React.FormEvent) => {
        e.preventDefault()

    }



    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-700">

            <h1 className="text-6xl text-white font-semibold">ShortLinks</h1>
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-sm border mt-15">

                <h1 className="text-2xl font-bold  text-center mb-6">
                    Create Account
                </h1>

                <form className="space-y-4" onSubmit={handleRegisteration}>

                    <div>
                        <label className="block text-sm mb-1 font-medium">Name</label>
                        <input
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring focus:ring-gray-300"
                            placeholder="Your full name"
                        />
                    </div>

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
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium underline">
                        Login
                    </a>
                </p>
            </div>
        </main>
    );
}
