"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllLinks } from "@/services/linkService";

interface ShortLink {
  code: string;
  url: string;
  last_clicked: string;
  clicks: number;
  created_at: string;
  updated_at: string;
}



export default function LinksPage() {

  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const check = async () => {
      const res = await getAllLinks();
      if (res.data.status === "ok") {
        setLinks(res.data.data)
        setLoading(false)
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 hover:bg-gray-700 cursor-pointer">Your Links</h1>
        <Link href="/admin/links/new" className="self-end">
          <Button>Create New Link</Button>
        </Link>
      </div>

      {/* Links Table */}
      <Card className="shadow-md border-none">
        <CardContent className="p-4">
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
