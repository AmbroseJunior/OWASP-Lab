'use client';
import { useState } from 'react';

export default function VulnerableDemo() {
  const [sqlInput, setSqlInput] = useState('');
  const [authInput, setAuthInput] = useState({user: '', pass: ''});
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState(null);
  const [xssInput, setXssInput] = useState('');

  // 1. SQL Injection Demo
  const handleSQL = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/vulnerable/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sqlInput }),
    });
    setResults(await response.json());
  };

  // 2. Broken Authentication Demo
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/vulnerable/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authInput),
    });
    setUserData(await response.json());
  };

  return (
    <div className="p-4 border-2 border-red-500">
      <h1 className="text-2xl mb-4">🔓 Vulnerable Demo</h1>

      {/* 1. SQL Injection Section */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">1. SQL Injection</h2>
        <form onSubmit={handleSQL} className="mb-4">
          <input
            type="text"
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            placeholder="Enter product ID"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-red-500 text-white p-2">
            Search Products
          </button>
        </form>
        <div className="mb-2">
          Try: <code>&apos; OR 1=1--</code>
        </div>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>

      {/* 2. Broken Authentication Section */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">2. Weak Authentication</h2>
        <form onSubmit={handleLogin} className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 mr-2"
            onChange={(e) => setAuthInput({...authInput, user: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mr-2"
            onChange={(e) => setAuthInput({...authInput, pass: e.target.value})}
          />
          <button type="submit" className="bg-red-500 text-white p-2">
            Login
          </button>
        </form>
        {userData && <pre>User Data: {JSON.stringify(userData)}</pre>}
      </div>

      {/* 3. Sensitive Data Exposure Section */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">3. Exposed Data</h2>
        <a href="/api/vulnerable/users" className="text-red-500">
          Download User Database
        </a>
      </div>

      {/* 4. XSS Vulnerability */}
      <div className="mb-8">
        <h2 className="text-xl mb-2 text-red-600">4. XSS Vulnerability</h2>
        <textarea
          value={xssInput}
          onChange={(e) => setXssInput(e.target.value)}
          className="w-full p-2 border border-red-400 rounded h-24 mb-2"
          placeholder='Try: <script>alert("XSS")</script>'
        />
        <div className="p-4 border rounded border-red-300 bg-white text-black">
          <p className="font-semibold">Rendered Output:</p>
          <div dangerouslySetInnerHTML={{ __html: xssInput }} />
        </div>
        <p className="text-sm text-red-500 mt-2">⚠️ This area is intentionally vulnerable. Any script input here will execute!</p>
      </div>
    </div>
  );
}
