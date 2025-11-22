"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { checkCodeAvailablity, createLink } from "@/services/linkService";
import { redirect } from "next/navigation";

export default function CreateLinkPage() {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  const domainPrefix = "sl.io/";

  // Debounce typing
  useEffect(() => {
    if (!code) {
      setIsAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setChecking(true);

      // TODO: Replace with your real API call

      const response = await checkCodeAvailablity(code)
      console.log(response.data.status)
      if (response.data.status === "ok") {
        setIsAvailable(true)
      }
      else {
        setIsAvailable(false)
      }
      setChecking(false);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [code]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAvailable === false) return alert("Code is already taken!");

    const fullCode = domainPrefix + code;
    console.log({ code: fullCode, url });
    // TODO: call API to create link
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await createLink(code, url)
    if (response.data.status === "ok") {
      redirect("/admin/links")
    }

    // console.log(response.status)

  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl border border-gray-100">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🚀 Create a New Short Link
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination URL */}
            <div>
              <Label htmlFor="url" className="text-gray-700">
                Destination URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            {/* Short Code with Prefix */}
            <div>
              <Label htmlFor="code" className="text-gray-700">
                Short Code
              </Label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 select-none">
                  {domainPrefix}
                </span>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="abc123"
                  required
                  className="pl-20"
                />
              </div>

              {/* Availability signal */}
              {code && (
                <p className="mt-1 text-sm">
                  {checking ? (
                    <span className="text-gray-500">Checking...</span>
                  ) : isAvailable ? (
                    <span className="text-green-600">✅ Short code available</span>
                  ) : (
                    <span className="text-red-600">❌ Short code taken</span>
                  )}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              onClick={handleCreate}
              type="submit"
              className="w-full py-4  from-indigo-500 to-purple-600 text-white font-semibold text-lg rounded-l hover:bg-cyan-700 shadow-lg transition-all"
              disabled={isAvailable === false || checking}
            >
              Create Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
