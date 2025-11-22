'use client';
import React, { useState, useRef, useEffect, JSX } from 'react';
import {
    Link2, ArrowLeft, ExternalLink, Copy, Check, Edit, Trash2, X,
    MousePointerClick, Globe, Users, Calendar, Clock, TrendingUp,
    TrendingDown, Monitor, Smartphone, Tablet, MapPin, BarChart3,
    Chrome, Apple, RefreshCw, Share2, QrCode, Download
} from 'lucide-react';

// Types
interface LinkData {
    id: string;
    code: string;
    url: string;
    clicks: number;
    uniqueVisitors: number;
    lastClicked: string | null;
    createdAt: string;
    updatedAt: string;
    trend: number;
    isActive: boolean
}


interface CountryData {
    country: string;
    code: string;
    clicks: number;
    percentage: number;
}




const link: LinkData = {
    id: '1',
    code: 'promo-2024',
    url: 'https://example.com/summer-sale-2024-special-offer-with-discount-codes',
    clicks: 15420,
    uniqueVisitors: 12350,
    lastClicked: '2 minutes ago',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
    trend: 12.5,
    isActive: true
};

const LinkStatsPage: React.FC = () => {
    const [copied, setCopied] = useState<boolean>(false);
    const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
    const [editedUrl, setEditedUrl] = useState<string>('');
    const [saving, setSaving] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [linkData, setLinkData] = useState<LinkData>(link)


    // Mock data






    const countries: CountryData[] = [
        { country: 'United States', code: '🇺🇸', clicks: 5420, percentage: 35 },
        { country: 'United Kingdom', code: '🇬🇧', clicks: 2890, percentage: 19 },
        { country: 'Germany', code: '🇩🇪', clicks: 1950, percentage: 13 },
        { country: 'France', code: '🇫🇷', clicks: 1540, percentage: 10 },
        { country: 'Canada', code: '🇨🇦', clicks: 1230, percentage: 8 },
        { country: 'Others', code: '🌍', clicks: 2390, percentage: 15 },
    ];








    useEffect(() => {
        setEditedUrl(link.url);
    }, []);

    const shortUrl = `https://short.ly/${link.code}`;

    const copyToClipboard = (): void => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveUrl = async (): Promise<void> => {
        if (editedUrl === link.url) {
            setIsEditingUrl(false);
            return;
        }
        setSaving(true);
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSaving(false);
        setIsEditingUrl(false);
    };

    const handleDelete = async (): Promise<void> => {
        setDeleting(true);
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Redirect to links page
        window.location.href = '/dashboard';
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const toggleActive = () => {
        setLinkData(prev => ({
            ...prev,
            isActive: !prev.isActive,
        }));
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => (window.location.href = '/dashboard')}
                                className="p-2 hover:bg-white/10 rounded-xl transition text-gray-400 hover:text-white"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                                    <Link2 size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">Link Statistics</h1>
                                    <p className="text-sm text-gray-400">Detailed analytics for your link</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Link Info Card */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* Link Details */}
                        <div className="flex-1 space-y-4">
                            {/* Short URL */}
                            <div className="flex items-center gap-3">
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl font-bold font-mono text-blue-400 hover:text-blue-300 transition flex items-center gap-2"
                                >
                                    short.ly/{link.code}
                                    <ExternalLink size={18} className="opacity-50" />
                                </a>
                                <button
                                    onClick={copyToClipboard}
                                    className={`p-2 rounded-lg transition ${copied ? 'bg-green-500/20 text-green-400' : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white'
                                        }`}
                                    title="Copy short URL"
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>

                            {/* Original URL */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Original URL</label>
                                {isEditingUrl ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="url"
                                            value={editedUrl}
                                            onChange={(e) => setEditedUrl(e.target.value)}
                                            className="flex-1 bg-white/10 border border-blue-500/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                            autoFocus
                                            disabled={saving}
                                        />
                                        <button
                                            onClick={handleSaveUrl}
                                            disabled={saving}
                                            className="p-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl transition disabled:opacity-50"
                                        >
                                            {saving ? <RefreshCw size={18} className="animate-spin" /> : <Check size={18} />}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditedUrl(link.url);
                                                setIsEditingUrl(false);
                                            }}
                                            disabled={saving}
                                            className="p-2.5 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition disabled:opacity-50"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-300 transition truncate max-w-xl"
                                            title={link.url}
                                        >
                                            {link.url}
                                        </a>
                                        <button
                                            onClick={() => setIsEditingUrl(true)}
                                            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition flex-shrink-0"
                                            title="Edit URL"
                                        >
                                            <Edit size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    Created {formatDate(link.createdAt)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} />
                                    Updated {formatDate(link.updatedAt)}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 justify-between">
                            <button
                                onClick={toggleActive}
                                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${linkData.isActive
                                        ? 'bg-linear-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/20'
                                        : 'bg-gray-700'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${linkData.isActive
                                            ? 'left-7 bg-white shadow-md'
                                            : 'left-1 bg-gray-400'
                                        }`}
                                />
                            </button>


                            <button
                                onClick={() => setShowDeleteDialog(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl transition"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Clicks', value: link.clicks.toLocaleString(), icon: MousePointerClick, trend: link.trend, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                        { label: 'Unique Visitors', value: link.uniqueVisitors.toLocaleString(), icon: Users, trend: 8.3, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                        { label: 'Last Clicked', value: link.lastClicked || 'Never', icon: Clock, trend: null, color: 'text-green-400', bg: 'bg-green-500/10' },
                        { label: 'Countries', value: countries.length.toString(), icon: Globe, trend: 2.1, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                    ].map((stat, i) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                                        <IconComponent size={20} className={stat.color} />
                                    </div>
                                    {stat.trend !== null && (
                                        <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {stat.trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                            {Math.abs(stat.trend)}%
                                        </div>
                                    )}
                                </div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>



            </main>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/20 rounded-full">
                                    <Trash2 className="text-red-400" size={24} />
                                </div>
                                <h3 className="text-xl font-bold">Delete Link</h3>
                            </div>
                        </div>

                        <div className="px-6 py-5">
                            <p className="text-gray-300 mb-3">Are you sure you want to delete this link?</p>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <p className="font-mono text-blue-400 font-semibold">{link.code}</p>
                                <p className="text-sm text-gray-500 truncate mt-1">{link.url}</p>
                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <MousePointerClick size={14} />
                                        {link.clicks.toLocaleString()} clicks
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users size={14} />
                                        {link.uniqueVisitors.toLocaleString()} visitors
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-red-400 mt-4">
                                This action cannot be undone. All click statistics will be permanently lost.
                            </p>
                        </div>

                        <div className="bg-white/5 px-6 py-4 flex justify-end gap-3 border-t border-white/10">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                disabled={deleting}
                                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-medium transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition flex items-center gap-2 disabled:opacity-50"
                            >
                                {deleting ? (
                                    <>
                                        <RefreshCw size={18} className="animate-spin" />
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

export default LinkStatsPage;