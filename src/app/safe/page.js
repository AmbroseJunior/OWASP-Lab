'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import XSSDemo from '../components/XXSDemo';


export default function SecureDemo() {
  const router = useRouter();
  const [authInput, setAuthInput] = useState({ user: '', pass: '' });
  const [authStatus, setAuthStatus] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sqlInput, setSqlInput] = useState('');
  const [results, setResults] = useState([]);
  const [showProtected, setShowProtected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const products = [
    { id: 1, name: "Laptop", description: "High-performance", price: 999.99 },
    { id: 2, name: "Phone", description: "Flagship", price: 699.99 }
  ];

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/safe/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: authInput.user.trim().toLowerCase(),
          pass: authInput.pass
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        sessionStorage.setItem('authToken', data.username);
        setIsLoggedIn(true);
        router.push('/safe/dashboard');
      } else {
        setAuthStatus({
          success: false,
          message: data.error || 'Authentication failed',
          details: 'User credentials encrypted using AES-256-CBC'
        });
      }
    } catch (error) {
      setAuthStatus({
        success: false,
        message: 'Network error - please try again',
        details: 'Secure connection enforced (TLS 1.3)'
      });
    }
  };

  const handleSafeSearch = async (e) => {
    e.preventDefault();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(sqlInput.toLowerCase())
    );
    setResults(filteredProducts);
  };

  const handleLocalSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleProtectedClick = (e) => {
    e.preventDefault();
    setShowProtected(true);
    setTimeout(() => {
      setShowProtected(false);
    }, 5000);
  };

  return (
    <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 text-white">
      {/* SQL Injection Test (API-Driven) */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">SQL Injection Test (API)</h2>
        <form onSubmit={handleSafeSearch} className="mb-4">
          <input
            type="text"
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="Try: ' OR 1=1--"
            className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            API Safe Search
          </button>
        </form>

        <div>
          {results.length > 0 ? (
            results.map((product) => (
              <div key={product.id} className="p-2 bg-slate-700/50 rounded mb-2">
                {product.name} - ${product.price}
              </div>
            ))
          ) : (
            <p className="text-slate-400">No results found</p>
          )}
        </div>
      </div>

      {/* Local Safe Search */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Safe Search (Local)</h2>
        <form onSubmit={handleLocalSearch} className="space-y-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded bg-slate-900 border-slate-700 text-white"
            placeholder="Try: ' OR 1=1--"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Local Safe Search
          </button>
        </form>

        {searchResults.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
            <pre className="bg-slate-700 p-4 rounded overflow-x-auto">
              {JSON.stringify(searchResults, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="mt-4 text-slate-400">No results found</p>
        )}
      </div>

      

      {/* Authentication Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">🔐 Secure Authentication</h2>
      {!isLoggedIn ? (
        <>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 rounded bg-slate-900 border border-slate-700"
              value={authInput.user}
              onChange={(e) => setAuthInput({...authInput, user: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded bg-slate-900 border border-slate-700"
              value={authInput.pass}
              onChange={(e) => setAuthInput({...authInput, pass: e.target.value})}
              required
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded"
            >
              Login
            </button>
          </form>

          {authStatus && (
            <div className={`mt-4 p-4 rounded ${
              authStatus.success ? 'bg-green-900/50' : 'bg-red-900/50'
            }`}>
              <span className={authStatus.success ? 'text-green-400' : 'text-red-400'}>
                {authStatus.success ? '✓' : '✗'} {authStatus.message}
              </span>
              <div className="text-xs text-slate-400">{authStatus.details}</div>
            </div>
          )}

          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
            <h3 className="text-lg mb-2">🔑 Password Management</h3>
            <ul className="text-sm space-y-2 text-slate-400">
              <li>• Minimum 12 character length</li>
              <li>• BCrypt hashing (work factor: 12)</li>
              <li>• Regular password rotation enforced</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="text-center p-6">
          <div className="text-green-400 mb-4">✓ Successful authentication</div>
          <button
            onClick={() => {
              sessionStorage.removeItem('authToken');
              setIsLoggedIn(false);
            }}
            className="text-red-400 hover:text-red-300 underline"
          >
            Logout
          </button>
        </div>
      )}

      {/* Sensitive Data Access Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Sensitive Data Access</h2>
        <a
          href="#protected"
          onClick={handleProtectedClick}
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
        >
          View Protected User Data
        </a>

        {showProtected && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div>
                <p className="font-semibold">Access Denied</p>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                  This data is protected by AES-256 encryption and requires 
                  multi-factor authentication to access.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Protection Info */}
      <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
        <h3 className="text-lg mb-2">🛡️ Data Protection</h3>
        <div className="text-sm space-y-2 text-slate-400">
          <p>• AES-256 encryption at rest</p>
          <p>• TLS 1.3 for data in transit</p>
          <p>• HMAC-SHA256 integrity verification</p>
        </div>
      </div>
       {/* XSS Protection Demo */}
       <XSSDemo />
    </div>
  );
}
