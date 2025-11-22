'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDashboard, getAllLinks } from "@/services/linkService";
import { ShortLink, Stats } from "@/lib/types";
import { toast } from "react-toastify";

export default function DashboardPage() {

    const [links, setLinks] = useState<ShortLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<Stats | undefined>();
    useEffect(() => {
        const check = async () => {
            const res = await fetchDashboard();
            if (res.data.status === "ok") {
                setLinks(res.data.data.links)
                setLoading(false)

                console.log(res.data.data.stats)
                setStats(res.data.data.stats)
            }
            else {
                setLoading(false)
                toast("Error getting data")
            }

        };

        check();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mt-5" />
            </div>
        );
    }


    return (
        <div className="space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Total Links</p>
                        <h2 className="text-3xl font-bold text-indigo-600">{stats && stats.total_links}</h2>
                    </CardContent>
                </Card>

                  <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Active Links</p>
                        <h2 className="text-3xl font-bold text-indigo-600">{stats && stats.active_links}</h2>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Total Clicks</p>
                        <h2 className="text-3xl font-bold text-indigo-600">{stats && stats.total_clicks}</h2>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Today's Clicks</p>
                        <h2 className="text-3xl font-bold text-indigo-600">{stats && stats.today_clicks}</h2>
                    </CardContent>
                </Card>

              

            </div>

            {/* Recent Table */}



            <Card className="shadow-md border-none">
                <CardHeader><h1 className="text-2xl">Recent Links </h1></CardHeader>
                <CardContent className="px-4 py-3">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] md:min-w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-3 text-gray-600 font-medium">S.No</th>
                                    <th className="p-3 text-gray-600 font-medium">Short URL</th>
                                    <th className="p-3 text-gray-600 font-medium hidden sm:table-cell">Destination</th>
                                    <th className="p-3 text-gray-600 font-medium hidden md:table-cell">Clicks</th>
                                    <th className="p-3 text-gray-600 font-medium hidden lg:table-cell">Created</th>
                                    <th className="p-3 text-gray-600 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {links.map((link, index) => (

                                    <tr
                                        key={link.code}
                                        className="hover:bg-gray-50 transition-colors duration-150 flex flex-col sm:table-row mb-4 sm:mb-0"
                                    >
                                        <td className="p-3 font-medium">
                                            <span className="sm:hidden font-semibold">S.No: </span>
                                            {index + 1}
                                        </td>
                                        <td className="p-3 font-medium text-indigo-600" data-label="Short URL">
                                            <span className="sm:hidden font-semibold">Short URL: </span>
                                            <div className="cursor-pointer"> sl.io/{link.code}</div>
                                        </td>
                                        <td className="p-3 truncate sm:table-cell text-indigo-500" data-label="Destination">
                                            <span className="sm:hidden font-semibold">Destination: </span>
                                            <div className="cursor-pointer">   {link.url}</div>

                                        </td>
                                        <td className="p-3 sm:table-cell" data-label="Clicks">
                                            <span className="sm:hidden font-semibold">Clicks: </span>
                                            {link.clicks}
                                        </td>
                                        <td className="p-3 sm:table-cell" data-label="Created">
                                            <span className="sm:hidden font-semibold">Created: </span>
                                            {link.created_at}
                                        </td>
                                        <td className="p-3 flex gap-2" data-label="Actions">
                                            <Link href={`/admin/links/${link.code}`}>
                                                <Button variant="outline" size="sm">View</Button>
                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>


        </div>
    );
}
