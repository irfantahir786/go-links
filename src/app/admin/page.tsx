'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()

    useEffect(() => {
        const isAdmin = true
        if (isAdmin) {
            router.replace('/admin/dashboard');
        } else {
            router.replace('/login');
        }
    }, [router]);

    return (
        <div>page</div>
    )
}

export default page