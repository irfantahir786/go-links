'use client'
import { redirect, useParams } from "next/navigation";


interface Params {
    short: string;
}

// Dummy function — replace with your DB/API
async function getDestination(shortCode: string): Promise<string | null> {
    const links: Record<string, string> = {
        "abc123": "https://google.com",
        "yt456": "https://youtube.com",
    };
    return links[shortCode] || null;
}

export default async function ShortLinkPage() {

    const params = useParams<{ tag: string; short: string }>()
    const shortCode = params?.short;
    console.log("Shortcode --", shortCode)
    if (!shortCode) {
        return <p className="text-red-600 mt-20 text-center">Invalid link</p>;
    }

    const destination = await getDestination(shortCode);

    if (!destination) {
        return <p className="text-red-600 mt-20 text-center">Link not found</p>;
    }

    redirect(destination);
}

