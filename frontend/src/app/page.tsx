import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Hero */}
      <section className="px-6 py-28 bg-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Shorten. Track. Manage. All in One Dashboard.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            A modern short-links platform designed for businesses that need clean analytics, custom branding, and a powerful admin panel — not a messy public tool.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/login"
              className="px-8 py-3 bg-black text-white rounded-lg font-semibold"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-8 py-3 border border-black rounded-lg font-semibold"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Built for Businesses</h2>
          <p className="text-gray-700 mb-6">
            No public link creation. No spam. Only verified users through your admin panel.
            Manage everything from a clean and efficient dashboard.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Central admin control</li>
            <li>✔ Role-based access</li>
            <li>✔ Analytics dashboard</li>
            <li>✔ Custom short domains</li>
            <li>✔ Device & location tracking</li>
            <li>✔ Unlimited link management</li>
          </ul>
        </div>

        <div className="rounded-xl border p-6 shadow-sm bg-white">
          <img
            src="/dashboard-preview.png"
            alt="App Dashboard"
            className="rounded-lg w-full"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            Admin Dashboard Preview
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-gray-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold mb-16">
            Why Choose Our Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <Feature
              title="Admin-Controlled Creation"
              desc="Only approved users can generate short links, eliminating abuse."
            />
            <Feature
              title="Deep Analytics"
              desc="Track clicks, devices, countries and referrers with precision."
            />
            <Feature
              title="Brand-Safe Domains"
              desc="Use custom domains to maintain trust and protect brand identity."
            />
            <Feature
              title="Team Access"
              desc="Invite staff and assign roles with powerful permissions."
            />
            <Feature
              title="Secure & Stable"
              desc="Built with Next.js, protected routes, and safe redirects."
            />
            <Feature
              title="Fast & Modern UI"
              desc="A clean admin interface designed for high-speed workflows."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-black text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Manage Short Links the Smart Way?
        </h2>
        <p className="text-gray-300 mb-8">
          No public access. You control everything.
        </p>
        <a
          href="/register"
          className="px-10 py-3 bg-white text-black rounded-lg font-semibold"
        >
          Get Started →
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} — ShortLink Platform
      </footer>
    </main>
  );
}



interface HomeProps {
  title:string
  desc: string
}

function Feature({ title, desc } : HomeProps) {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

