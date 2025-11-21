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


        </div>
    );
}
