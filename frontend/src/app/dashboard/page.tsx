'use client';
import React, { useEffect, useState } from 'react';
import {
  Link2, Home, Search,
  ExternalLink, Copy, Eye, Clock,
  Check, MousePointerClick, LinkIcon, Globe
} from 'lucide-react';
import { fetchDashboard, updateClick, updateCode } from '@/services/linkService';
import { LinkItem, StatItem } from '@/lib/types';
import { formatDate } from '@/lib/basicUtils';

// Types


const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);


  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const [linksData, setLinksData] = useState<LinkItem[]>([]);
  const [statsData, setStatsData] = useState<StatItem[]>([]);

  const [loading, setLoading] = useState(true)



  const toggleLinkStatus = async (code: string) => {

    const current = linksData.find(link => link.code === code);
    if (!current) return;

    const newStatus = !current.is_active;

    // Update UI instantly
    setLinksData(prev =>
      prev.map(link =>
        link.code === code ? { ...link, is_active: newStatus } : link
      )
    );

    // Send correct value to backend
    const res = await updateCode(code, current.url, newStatus);
    console.log(res.data.status);
  };

  const copyToClipboard = (code: string, id: string): void => {
    navigator.clipboard.writeText(`https://short.ly/${code}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const load = async () => {
      const response = await fetchDashboard()

      console.log(response.data)
      console.log(response.status)
      if (response.status === "ok") {
        setLinksData(response.data?.links ?? [])
        setStatsData(response.data?.stats ?? [])
        setLoading(false)
      }
    }
    load()
  }, [])





  const filteredLinks = linksData.filter(
    (link) =>
      link.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLinks = filteredLinks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}

      {loading ? (
        <>
          <div className="flex justify-center flex-col items-center min-h-screen">

            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mt-5" />
          </div>
        </>
      ) : (
        <>
          <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl">
                    <Link2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Manage your short links</p>
                  </div>
                </div>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-3 sm:px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
                >
                  <Home size={18} />
                  <span className="hidden sm:inline">Home</span>
                </button>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">

              {statsData.map((stat, index) => (
                <div key={stat.title}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                    <div className="flex items-start justify-between mb-3">
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                    <p className="text-gray-400 text-sm mt-1">{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search links by code or URL..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Links Table */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-white/10 text-sm font-medium text-gray-400">
                      <th className="w-12 text-center px-6 py-4">S.No</th>
                      <th className="text-left px-6 py-4">Short Link</th>
                      <th className="text-left px-6 py-4">Original URL</th>
                      <th className="text-center px-6 py-4">Clicks</th>
                      <th className="text-left px-6 py-4">Last Clicked</th>

                      <th className="text-center px-6 py-4">Status</th>
                      <th className="text-right px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedLinks.map((link, index) => (
                      <tr key={link.code} className="hover:bg-white/5 transition">
                        {/* Short Link */}

                        <td className='w-12 text-center p-2'>
                          <span className={`text-sm truncate max-w-[250px] ${link.is_active ? 'text-gray-400' : 'text-gray-600'}`}> {index + 1}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 group ">
                            <div className={`p-2 rounded-lg ${link.is_active ? 'bg-linear-to-br from-blue-500/20 to-purple-500/20' : 'bg-white/5'}`}>
                              <LinkIcon size={16} className={link.is_active ? 'text-blue-400' : 'text-gray-500'} />
                            </div>
                            <span className={`font-medium ml-2 font-mono ${link.is_active ? 'text-blue-400' : 'text-gray-500'}`}>
                              {link.code}
                            </span>
                            <button
                              onClick={() => copyToClipboard(link.code, link.code)}
                              className={`opacity-0 group-hover:opacity-100 p-0 rounded-lg transition ${copiedId === link.code
                                ? 'bg-green-500/20 text-green-400'
                                : 'hover:bg-white/10 text-gray-400 hover:text-white'
                                }`}
                              title="Copy short URL"
                            >
                              {copiedId === link.code ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                          </div>
                        </td>

                        {/* Original URL */}
                        <td className="px-6 py-4">
                          <p className={`text-sm truncate max-w-[250px] ${link.is_active ? 'text-gray-400' : 'text-gray-600'}`} title={link.url}>
                            {link.url}
                          </p>
                        </td>

                        {/* Clicks */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-lg text-sm font-medium">
                            <Eye size={14} className="text-gray-400" />
                            {link.clicks.toLocaleString()}
                          </span>
                        </td>

                        {/* Last Clicked */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock size={14} />
                            {link.last_clicked ? <>{formatDate(link.last_clicked)}  </> : <>Never</>}
                          </div>
                        </td>



                        {/* Status Toggle */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => toggleLinkStatus(link.code)}
                              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${link.is_active
                                ? 'bg-linear-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/20'
                                : 'bg-gray-700'
                                }`}
                              title={link.is_active ? 'Active - Click to disable' : 'Inactive - Click to enable'}
                            >
                              <span
                                className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${link.is_active ? 'left-7 bg-white shadow-md' : 'left-1 bg-gray-400'
                                  }`}
                              />
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1 relative">

                            <a
                              href={`https://short.ly/${link.code}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition"
                              title="Open link"
                            >
                              <ExternalLink size={16} />
                            </a>


                            <button
                              onClick={() => {
                                window.location.href = `/code/${link.code}`;
                              }}
                              className=" px-2 py-3 hover:bg-white/10 text-sm rounded-lg text-gray-300 transition"
                            >

                              View
                            </button>


                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {paginatedLinks.length === 0 && (
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
            {filteredLinks.length > itemsPerPage && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
                <p className="text-sm text-gray-400">
                  Showing <span className="font-medium text-white">{startIndex + 1}</span> to{' '}
                  <span className="font-medium text-white">{Math.min(startIndex + itemsPerPage, filteredLinks.length)}</span> of{' '}
                  <span className="font-medium text-white">{filteredLinks.length}</span> links
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition ${currentPage === page
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </>
      )}


    </div>
  );
};

export default DashboardPage;