import Link from "next/link";
import "./globals.css";


export default function Home() {
    return (
      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Web Security Demo
          </h1>
          <p className="text-xl text-slate-300">
            Understand modern security vulnerabilities through interactive examples
          </p>
        </div>
  
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            href="/vulnerable"
            className="p-6 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all border border-slate-700"
          >
            <h2 className="text-2xl font-semibold mb-2">Vulnerable Demo</h2>
            <p className="text-slate-400">Explore security weaknesses</p>
          </Link>
  
          <Link
            href="/safe"
            className="p-6 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-all border border-slate-700"
          >
            <h2 className="text-2xl font-semibold mb-2">Secure Demo</h2>
            <p className="text-slate-400">See best practices in action</p>
          </Link>
        </div>
  
        <div className="mt-12 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
          <p className="text-slate-400">
            🔒 Built with Next.js | Demonstrates OWASP Top 10 vulnerabilities
          </p>
        </div>
      </div>
    );
  }