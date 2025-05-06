// app/safe/dashboard/page.js
'use client';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    router.push('/safe');
  };

  useEffect(() => {
    if (!sessionStorage.getItem('authToken')) {
      router.push('/safe');
    }
  }, [router]);

  return (
    <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LockClosedIcon className="h-6 w-6 text-green-400" />
          Secure Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <span>Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 text-slate-300">
        <p className="flex items-center gap-2">
          <span className="text-green-400">•</span>
          User session encrypted with AES-256-CBC
        </p>
        <p className="flex items-center gap-2">
          <span className="text-green-400">•</span>
          Activity logging enabled
        </p>
        <p className="flex items-center gap-2">
          <span className="text-green-400">•</span>
          Role-based access control
        </p>
      </div>
    </div>
  );
}