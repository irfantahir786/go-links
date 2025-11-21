import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Total Links</p>
                        <h2 className="text-3xl font-bold text-indigo-600">284</h2>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Total Clicks</p>
                        <h2 className="text-3xl font-bold text-indigo-600">12.4K</h2>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Today's Clicks</p>
                        <h2 className="text-3xl font-bold text-indigo-600">320</h2>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white rounded-xl">
                    <CardContent className="p-5">
                        <p className="text-gray-500 text-sm">Active Links</p>
                        <h2 className="text-3xl font-bold text-indigo-600">91</h2>
                    </CardContent>
                </Card>

            </div>

            {/* Recent Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Recent Links
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Short URL</th>
                                <th className="p-3">Destination</th>
                                <th className="p-3">Clicks</th>
                                <th className="p-3">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3 text-indigo-600 font-medium">sl.io/ab12</td>
                                <td className="p-3">https://google.com</td>
                                <td className="p-3 font-semibold">540</td>
                                <td className="p-3">2 days ago</td>
                            </tr>

                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3 text-indigo-600 font-medium">sl.io/yt90</td>
                                <td className="p-3">https://youtube.com</td>
                                <td className="p-3 font-semibold">210</td>
                                <td className="p-3">5 days ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
