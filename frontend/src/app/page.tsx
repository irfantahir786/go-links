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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
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
         <div className='flex flex-row justify-center items-center gap-4'>
 <Link
            href={"/login"}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
          >
            Login
           
          </Link>

           <Link
            href={"/dashboard"}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
          >
            Register
          
          </Link>
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