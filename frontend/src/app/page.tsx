import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Edit3, BarChart2, Users, CheckCircle, Link as LinkIcon, BarChart } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/icons";

const features = [
  {
    icon: <Edit3 className="h-8 w-8 text-primary" />,
    title: "Customizable Links",
    description: "Create memorable and brandable short links with custom aliases that are easy to share.",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: "Detailed Analytics",
    description: "Track every click and gain insights into your audience with our comprehensive analytics dashboard.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "User Management",
    description: "Collaborate with your team by managing users and their permissions for link creation and tracking.",
  },
]

const howItWorks = [
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "1. Create Account",
    description: "Sign up for a free account in seconds. No credit card required.",
  },
  {
    icon: <LinkIcon className="h-10 w-10 text-primary" />,
    title: "2. Shorten Link",
    description: "Paste your long URL into our shortener and create a compact link.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "3. Track Clicks",
    description: "Share your new link and watch the real-time analytics on your dashboard.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-bold text-lg">TinyLink</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                Shorten, Share, and Track Your Links
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                TinyLink is a simple and powerful URL shortener to help you manage your digital presence. Create clean links, monitor their performance, and take control.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/register">
                    Get Started for Free
                    <Rocket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Powerful Features, Simple Interface</h2>
              <p className="text-muted-foreground mt-4">
                Everything you need to build brand recognition and track your link performance.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Get Started in 3 Easy Steps</h2>
              <p className="text-muted-foreground mt-4">
                TinyLink makes it incredibly easy to start shortening and tracking your URLs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {howItWorks.map((step) => (
                <div key={step.title} className="flex flex-col items-center">
                  {step.icon}
                  <h3 className="text-xl font-semibold my-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Take Control of Your Links?</h2>
              <p className="text-muted-foreground my-6">
                Join thousands of users who trust TinyLink to manage their links. Sign up now and start creating your branded short URLs in minutes.
              </p>
              <Button asChild size="lg">
                <Link href="/register">
                  Sign Up for Free
                  <Rocket className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 h-16 flex items-center justify-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TinyLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
