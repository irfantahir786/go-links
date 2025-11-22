'use client';
import React, { useState } from 'react';
import {
  LinkIcon, Search, 
  TrendingUp, TrendingDown, MousePointerClick, Globe, Users, 
  ExternalLink, Copy, Trash2, Eye, Clock, Check
  
  } from 'lucide-react';
import Link from 'next/link';

// Types
interface LinkItem {
  id: string;
  code: string;
  url: string;
  clicks: number;
  lastClicked: string | null;
  createdAt: string;
  trend: number;
  isActive: boolean;
}

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}



type ActivePage = 'dashboard' | 'links';

const DashboardPage: React.FC = () => {


  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null);
 
  const [linksData, setLinksData] = useState<LinkItem[]>([
    { id: '1', code: 'promo-2024', url: 'https://example.com/summer-sale-2024-special-offer', clicks: 15420, lastClicked: '2 mins ago', createdAt: '2024-01-15', trend: 12.5, isActive: true },
    { id: '2', code: 'youtube-main', url: 'https://youtube.com/channel/example', clicks: 8930, lastClicked: '5 mins ago', createdAt: '2024-02-20', trend: 8.3, isActive: true },
    { id: '3', code: 'twitter-bio', url: 'https://twitter.com/example', clicks: 6721, lastClicked: '1 hour ago', createdAt: '2024-03-01', trend: -3.2, isActive: false },
    { id: '4', code: 'portfolio', url: 'https://myportfolio.com/work/projects', clicks: 4502, lastClicked: '3 hours ago', createdAt: '2024-03-10', trend: 15.7, isActive: true },
    { id: '5', code: 'discord-inv', url: 'https://discord.gg/example', clicks: 3891, lastClicked: '30 mins ago', createdAt: '2024-03-15', trend: 22.1, isActive: true },
    { id: '6', code: 'github-repo', url: 'https://github.com/example/awesome-project', clicks: 2156, lastClicked: '2 hours ago', createdAt: '2024-04-01', trend: -1.5, isActive: false },
  ]);
  const stats: StatCard[] = [
    { title: 'Total Clicks', value: '124,892', change: 12.5, icon: MousePointerClick, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { title: 'Total Links', value: '1,247', change: 8.2, icon: LinkIcon, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { title: 'Unique Visitors', value: '45,678', change: -2.4, icon: Users, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { title: 'Countries', value: '89', change: 5.1, icon: Globe, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  ];

 

 



  const toggleLinkStatus = (id: string): void => {
    setLinksData((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, isActive: !link.isActive } : link
      )
    );
  };

  const copyToClipboard = (code: string, id: string): void => {
    navigator.clipboard.writeText(`https://short.ly/${code}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };


  const filteredLinks = linksData.filter(
    (link) =>
      link.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

 

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
    
     

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-slate-900/50 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            
            </div>
            
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Page */}
     
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                          <IconComponent size={22} className={stat.color} />
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm font-medium ${
                            stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {stat.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {Math.abs(stat.change)}%
                        </div>
                      </div>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-gray-400 text-sm mt-1">{stat.title}</p>
                    </div>
                  );
                })}
              </div>

            
             

           
            </div>
       

       
         
            <div className="space-y-6 mt-4">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
               
              </div>

              {/* Links Table */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-sm font-medium text-gray-400">
                  <div className="col-span-3">Short Link</div>
                  <div className="col-span-3">Original URL</div>
                  <div className="col-span-1 text-center">Clicks</div>
                  <div className="col-span-2">Last Clicked</div>
               
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-white/5">
                  {filteredLinks.map((link) => (
                    <div
                      key={link.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition items-center"
                    >
                      {/* Short Link */}
                      <div className="col-span-3 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${link.isActive ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-white/5'}`}>
                          <LinkIcon size={16} className={link.isActive ? 'text-blue-400' : 'text-gray-500'} />
                        </div>
                        <div>
                          <p className={`font-medium font-mono ${link.isActive ? 'text-blue-400' : 'text-gray-500'}`}>{link.code}</p>
                          <p className="text-xs text-gray-500 md:hidden truncate">{link.url}</p>
                        </div>
                      </div>

                      {/* Original URL */}
                      <div className="hidden md:block col-span-3">
                        <p className={`text-sm truncate ${link.isActive ? 'text-gray-400' : 'text-gray-600'}`} title={link.url}>
                          {link.url}
                        </p>
                      </div>

                      {/* Clicks */}
                      <div className="col-span-1 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-lg text-sm font-medium">
                          <Eye size={14} className="text-gray-400" />
                          {link.clicks.toLocaleString()}
                        </span>
                      </div>

                      {/* Last Clicked */}
                      <div className="hidden md:flex col-span-2 items-center gap-2 text-sm text-gray-400">
                        <Clock size={14} />
                        {link.lastClicked || 'Never'}
                      </div>

                      {/* Trend */}
                     

                      {/* Status Toggle */}
                      <div className="col-span-1 flex justify-center me-5">
                        <button
                          onClick={() => toggleLinkStatus(link.id)}
                          className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                            link.isActive
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/20'
                              : 'bg-gray-700'
                          }`}
                          title={link.isActive ? 'Active - Click to disable' : 'Inactive - Click to enable'}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                              link.isActive
                                ? 'left-7 bg-white shadow-md'
                                : 'left-1 bg-gray-400'
                            }`}
                          />
                          <span className="sr-only">{link.isActive ? 'Disable link' : 'Enable link'}</span>
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex items-center justify-center gap-1 ms-5 relative">
                        <button
                          onClick={() => copyToClipboard(link.code, link.id)}
                          className={`p-2 rounded-lg transition ${
                            copiedId === link.id
                              ? 'bg-green-500/20 text-green-400'
                              : 'hover:bg-white/10 text-gray-400 hover:text-white'
                          }`}
                          title="Copy short URL"
                        >
                          {copiedId === link.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <a
                          href={`https://short.ly/${link.code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition"
                          title="Open link"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <div className="relative">
                          <Link
                           href={"code/abcd"}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition">
                            View
                          
                          </Link>
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredLinks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div className="p-4 bg-white/5 rounded-full mb-4">
                      <Search size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300 mb-1">No links found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your search query</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
             
            </div>
         
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && selectedLink && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Dialog Header */}
            <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-full">
                  <Trash2 className="text-red-400" size={24} />
                </div>
                <h3 className="text-xl font-bold">Delete Link</h3>
              </div>
            </div>

            {/* Dialog Body */}
            <div className="px-6 py-5">
              <p className="text-gray-300 mb-3">Are you sure you want to delete this link?</p>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="font-mono text-blue-400 font-semibold">{selectedLink.code}</p>
                <p className="text-sm text-gray-500 truncate mt-1">{selectedLink.url}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <MousePointerClick size={14} />
                    {selectedLink.clicks.toLocaleString()} clicks
                  </span>
                </div>
              </div>
              <p className="text-sm text-red-400 mt-4">
                This action cannot be undone. All click statistics will be permanently lost.
              </p>
            </div>

            {/* Dialog Footer */}
            <div className="bg-white/5 px-6 py-4 flex justify-end gap-3 border-t border-white/10">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle delete
                  setShowDeleteDialog(false);
                  setSelectedLink(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;