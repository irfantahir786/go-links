'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("login") === "yes"
        if (isLoggedIn) {
            router.replace('/admin/dashboard');
        } else {
            router.replace('/login');
        }
    }, [router]);

   
}

export default page