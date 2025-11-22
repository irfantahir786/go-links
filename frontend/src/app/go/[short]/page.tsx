'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ShortLinkPage() {
    const params = useParams<{ short: string }>();
    const code = params.short;

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!code) {
            setError("Invalid link");
            return;
        }

        const handleRedirect = async () => {
            try {
                // 1️⃣ Get destination
                const res = await fetch(`http://localhost:3001/links/view/${code}`);
                if (!res.ok) throw new Error("Link not found on");

                const json = await res.json();
                const destination = json.data[0].url
                console.log(json.data[0].url)
                if (!destination) throw new Error("Link not found kkc");

                // 2️⃣ Increment clicks
                await fetch(`http://localhost:3001/links/updateClick/${code}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });

                // 3️⃣ Redirect
                // window.location.href = destination;
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            }
        };

        handleRedirect();
    }, [code]);

    if (error) return <p className="text-red-600 mt-20 text-center">{error}</p>;
    return (
        <div className="flex justify-center flex-col items-center min-h-[400px]">
            <p className="text-xl">Getting right direction....</p>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mt-5" />
        </div>
    );;
}
