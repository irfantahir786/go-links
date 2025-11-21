"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShortLink {
  id: string;
  short: string;
  destination: string;
  clicks: number;
  createdAt: string;
}

const dummyLinks: ShortLink[] = [
  { id: "1", short: "abc123", destination: "https://google.com", clicks: 540, createdAt: "2 days ago" },
  { id: "2", short: "yt456", destination: "https://youtube.com", clicks: 210, createdAt: "5 days ago" },
];

export default function LinksPage() {
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
                  <th className="p-3 text-gray-600 font-medium">Short URL</th>
                  <th className="p-3 text-gray-600 font-medium hidden sm:table-cell">Destination</th>
                  <th className="p-3 text-gray-600 font-medium hidden md:table-cell">Clicks</th>
                  <th className="p-3 text-gray-600 font-medium hidden lg:table-cell">Created</th>
                  <th className="p-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {dummyLinks.map((link) => (
                  <tr
                    key={link.id}
                    className="hover:bg-gray-50 transition-colors duration-150 flex flex-col sm:table-row mb-4 sm:mb-0"
                  >
                    <td className="p-3 font-medium text-indigo-600" data-label="Short URL">
                      <span className="sm:hidden font-semibold">Short URL: </span>
                      sl.io/{link.short}
                    </td>
                    <td className="p-3 truncate sm:table-cell" data-label="Destination">
                      <span className="sm:hidden font-semibold">Destination: </span>
                      {link.destination}
                    </td>
                    <td className="p-3 sm:table-cell" data-label="Clicks">
                      <span className="sm:hidden font-semibold">Clicks: </span>
                      {link.clicks}
                    </td>
                    <td className="p-3 sm:table-cell" data-label="Created">
                      <span className="sm:hidden font-semibold">Created: </span>
                      {link.createdAt}
                    </td>
                    <td className="p-3 flex gap-2" data-label="Actions">
                      <Link href={`/dashboard/links/${link.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Button variant="destructive" size="sm">Delete</Button>
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
