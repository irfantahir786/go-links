'use client'
import { formatDate } from "@/lib/basicUtils";
import { ShortLink } from "@/lib/types";
import { Edit, Check, X, Copy, Trash2, ExternalLink, MousePointerClick, Clock, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";




const LinkViewPage: React.FC = () => {
  const path = usePathname();
  const segments = path?.split("/").filter(Boolean);
  const lastParam = segments?.[segments.length - 1];

  const [link, setLink] = useState<ShortLink | null>(null);
  const [loading, setLoading] = useState(true);


  // Edit states

  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const [editedUrl, setEditedUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      if (!lastParam) return;
      try {
        const res = await fetch(`http://localhost:3001/links/view/${lastParam}`);
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data[0] : json.data;
        setLink(data || null);
        if (data) {

          setEditedUrl(data.url);
        }
      } catch (err: any) {

      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [lastParam]);



  const handleSaveUrl = async () => {

    if (!link || editedUrl === link.url) {
      setIsEditingUrl(false);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:3001/links/${link.code}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: editedUrl, code: link.code }),
      });
      if (!res.ok) toast("Error while updating")
      if (res.ok) toast("Link updated")
      setLink({ ...link, url: editedUrl });
      setIsEditingUrl(false);
    } catch (err: any) {

    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!link) return;
    setDeleting(true);
    try {
      await fetch(`http://localhost:3001/links/${link.code}`, { method: "DELETE" });
      window.location.href = "/links";
    } catch (err: any) {

      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);

  };


  const cancelEditUrl = () => {
    setEditedUrl(link?.url || "");
    setIsEditingUrl(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mt-5" />
      </div>
    );
  }



  if (!link) {
    return (
      <div className="flex justify-center p-6">
        <div className="bg-gray-50 border border-gray-200 text-gray-600 px-6 py-4 rounded-xl">
          <p className="text-xl"> {lastParam} doesn't exists.</p>
        </div>
      </div>
    );
  }

  const shortUrl = `http://localhost:3000/go/${link.code}`;

  return (
    <div className="flex justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Link Details</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Short Code Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Short Code
            </label>
            <div className="flex items-center gap-3">
              <>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-600 hover:text-blue-800 font-mono font-semibold hover:underline flex items-center gap-1"
                >
                  {link.code}
                  <ExternalLink size={16} className="opacity-50" />
                </a>
              </>

            </div>
          </div>

          {/* Original URL Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Original URL
            </label>
            <div className="flex items-start gap-3">
              {isEditingUrl ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                    className="flex-1 border-2 border-blue-400 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600 transition"
                    autoFocus
                    disabled={saving}
                  />
                  <button
                    onClick={handleSaveUrl}
                    disabled={saving}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition disabled:opacity-50"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={cancelEditUrl}
                    disabled={saving}
                    className="p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 hover:underline break-all flex-1"
                  >
                    {link.url}
                  </a>
                  <button
                    onClick={() => setIsEditingUrl(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-gray-700 flex-shrink-0"
                    title="Edit URL"
                  >
                    <Edit size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MousePointerClick className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{link.clicks}</p>
                <p className="text-sm text-gray-500">Total Clicks</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {link.last_clicked ? formatDate(link.last_clicked) : "Never"}
                </p>
                <p className="text-sm text-gray-500">Last Clicked</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{formatDate(link.created_at)}</p>
                <p className="text-sm text-gray-500">Created</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{formatDate(link.updated_at)}</p>
                <p className="text-sm text-gray-500">Updated</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <button
              onClick={() => copyToClipboard(shortUrl, "Short URL")}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition font-medium"
            >
              <Copy size={18} />
              Copy Short URL
            </button>
            <button
              onClick={() => copyToClipboard(link.url, "Original URL")}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition font-medium"
            >
              <Copy size={18} />
              Copy Original URL
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition font-medium ml-auto"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Dialog Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Delete Link</h3>
              </div>
            </div>

            {/* Dialog Body */}
            <div className="px-6 py-5">
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete this link?
              </p>
              <div className="bg-gray-50 rounded-lg p-3 border">
                <p className="font-mono text-sm text-gray-800 font-semibold">{link.code}</p>
                <p className="text-sm text-gray-500 truncate">{link.url}</p>
              </div>
              <p className="text-sm text-red-600 mt-3">
                This action cannot be undone. All click statistics will be permanently lost.
              </p>
            </div>

            {/* Dialog Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
              <button
                onClick={() => setShowDeleteDialog(false)}
                disabled={deleting}
                className="px-5 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkViewPage;


