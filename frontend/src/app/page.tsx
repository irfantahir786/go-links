'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Link2, Zap, Shield, BarChart3, Globe, ArrowRight, Check, Copy, ExternalLink, Sparkles, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface Feature {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
}

const LandingPage: React.FC = () => {
  const [longUrl, setLongUrl] = useState<string>('');
  const [customCode, setCustomCode] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Code availability states
  const [checkingCode, setCheckingCode] = useState<boolean>(false);
  const [codeAvailable, setCodeAvailable] = useState<boolean | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Check code availability with debounce
  const checkCodeAvailability = (code: string): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!code || code.length < 3) {
      setCodeAvailable(null);
      setCheckingCode(false);
      return;
    }

    setCheckingCode(true);
    setCodeAvailable(null);

    timeoutRef.current = setTimeout(async () => {
      try {

        const res = await fetch(`http://localhost:3001/links/check/${code}`);
        const response = await res.json();
        console.log(response)

        if (response.status === "empty") {
          setCodeAvailable(true);
          setCheckingCode(false)
        }
        else {
          console.log("outside If")
          setCodeAvailable(false);
          setCheckingCode(false)
        }
      } catch (err) {
        console.log('Error checking code:', err);
        setCodeAvailable(null);
        setCheckingCode(false)
      }
    }, 500);
  };

  const handleCustomCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^a-zA-Z0-9-_]/g, '');
    setCustomCode(value);
    checkCodeAvailability(value);
  };

  const handleShorten = async (): Promise<void> => {
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }

    if (customCode.length >= 3 && codeAvailable === false) {
      setError('Please choose an available custom code');
      return;
    }

    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      // Simulated API call - replace with your actual endpoint
      const res = await fetch('http://localhost:3001/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: longUrl, code: customCode || undefined }),
      });
      const response = await res.json();
      console.log(response)
      if (response.status === "ok") {
        console.log("Hello")
        setLongUrl("")
        setCustomCode("")
        setShortUrl(`http://localhost:3000/${response.data.code}`);
      }
      else {

      }

      // toast("Short link created")
    } catch (err) {
      setError('Failed to create short link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features: Feature[] = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Generate short links instantly with our optimized infrastructure', color: 'from-yellow-400 to-orange-500' },
    { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime guarantee', color: 'from-green-400 to-emerald-500' },
    { icon: BarChart3, title: 'Advanced Analytics', desc: 'Track clicks, locations, devices and more in real-time', color: 'from-blue-400 to-indigo-500' },
    { icon: Globe, title: 'Custom Domains', desc: 'Use your own branded domain for professional links', color: 'from-purple-400 to-pink-500' },
  ];

  const stats: Stat[] = [
    { value: '10M+', label: 'Links Created' },
    { value: '500M+', label: 'Clicks Tracked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '150+', label: 'Countries' },
  ];

  const getInputBorderClass = (): string => {
    if (customCode.length >= 3) {
      if (codeAvailable === true) return 'border-green-500/50 focus:ring-green-500';
      if (codeAvailable === false) return 'border-red-500/50 focus:ring-red-500';
    }
    return 'border-white/20 focus:ring-blue-500';
  };

  const isSubmitDisabled = (): boolean => {
    return loading || (customCode.length >= 3 && (checkingCode || codeAvailable === false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Link2 size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            ShortLink
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#features" className="hidden md:block text-gray-300 hover:text-white transition">
            Features
          </a>

          <Link
            href={"/dashboard"}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
          >
            Dashboard
            <ChevronRight size={18} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 lg:px-4 pt-3 pb-3">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-gray-300">Trusted by 100,000+ users worldwide</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Shorten Links,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Amplify Results
            </span>
          </h1>

          <p className="text-l text-gray-400 text-center max-w-2xl mx-auto mb-4">
            Transform long, ugly URLs into powerful, trackable short links. Boost your marketing with detailed
            analytics and custom branding.
          </p>

          {/* Link Shortener Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-4">
                {/* Long URL Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Paste your long URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="url"
                      value={longUrl}
                      onChange={(e) => setLongUrl(e.target.value)}
                      placeholder="https://example.com/very/long/url/that/needs/shortening"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Custom Code Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Custom short code <span className="text-gray-600">(optional)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-gray-400">
                      <span>short.ly/</span>
                    </div>
                    <div className="relative flex-1">
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="text"
                        value={customCode}
                        onChange={handleCustomCodeChange}
                        placeholder="my-custom-link"
                        className={`w-full bg-white/10 border rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${getInputBorderClass()}`}
                      />
                      {/* Status indicator */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {checkingCode ? (
                          <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                        ) : customCode.length >= 3 && codeAvailable === true ? (
                          <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                            <Check size={14} className="text-white" />
                          </div>
                        ) : customCode.length >= 3 && codeAvailable === false ? (
                          <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
                            <X size={14} className="text-white" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Availability message */}
                  <div className="mt-2 min-h-[24px]">
                    {checkingCode ? (
                      <p className="text-sm text-blue-400 flex items-center gap-2">
                        <span className="inline-block w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                        Checking availability...
                      </p>
                    ) : customCode.length >= 3 && codeAvailable === true ? (
                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <Check size={14} />
                        Great! &quot;{customCode}&quot; is available
                      </p>
                    ) : customCode.length >= 3 && codeAvailable === false ? (
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <X size={14} />
                        Sorry, &quot;{customCode}&quot; is already taken. Try another one.
                      </p>
                    ) : customCode.length > 0 && customCode.length < 3 ? (
                      <p className="text-sm text-gray-500">Enter at least 3 characters to check availability</p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        Leave empty for auto-generated code. Only letters, numbers, hyphens and underscores allowed.
                      </p>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <X size={16} />
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleShorten}
                  disabled={isSubmitDisabled()}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Short Link...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      Shorten URL
                    </>
                  )}
                </button>
              </div>

              {/* Result */}
              {shortUrl && (
                <div className="mt-6 p-5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
                  <div className="flex items-center gap-2 text-green-400 mb-3">
                    <Check size={20} />
                    <span className="font-medium">Your short link is ready!</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 font-mono text-lg text-white truncate">
                      {shortUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className={`p-3 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                        }`}
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-gray-300"
                      title="Open link"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage, track, and optimize your links
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={i}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-xl"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${feature.color} mb-4`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of marketers and developers who trust ShortLink</p>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Go to Dashboard
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Link2 size={18} className="text-white" />
            </div>
            <span className="font-semibold">ShortLink</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 ShortLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;