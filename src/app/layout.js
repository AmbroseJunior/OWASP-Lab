import Link from 'next/link';
import './globals.css';


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gradient-to-br from-slate-900 to-slate-800">
      <body className="h-full text-slate-100">
        <main className="max-w-4xl mx-auto p-6">
          <nav className="mb-12 p-4 bg-slate-800/50 rounded-2xl backdrop-blur-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SecureDemo
              </h1>
              <div className="flex gap-4">
                <Link 
                  href="/vulnerable"
                  className="px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-all"
                >
                  Vulnerable
                </Link>
                <Link
                  href="/safe"
                  className="px-4 py-2 rounded-lg hover:bg-slate-700/50 transition-all"
                >
                  Secure
                </Link>
              </div>
            </div>
          </nav>
          
          {children}
        </main>
      </body>
    </html>
  );
}