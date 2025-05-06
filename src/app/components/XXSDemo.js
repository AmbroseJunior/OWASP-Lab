'use client';
import { useState } from 'react';

export default function XSSDemo() {
  const [userContent, setUserContent] = useState('');
  const [sanitizedContent, setSanitizedContent] = useState('');

  const handleUserInput = (e) => {
    const input = e.target.value;
    setUserContent(input);
    const clean = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    setSanitizedContent(clean);
  };

  return (
    <section className="mt-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">XSS Protection Demo</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Raw User Input
            </label>
            <textarea
              value={userContent}
              onChange={handleUserInput}
              className="w-full p-2 border rounded-md h-32 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Try: <script>alert(1)</script>"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Sanitized Output
            </label>
            <div
              className="h-32 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-300">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold">XSS Protection Active</p>
              <p className="text-sm mt-1">
                HTML tags sanitized using contextual encoding. Try these payloads:
              </p>
              <code className="block mt-2 text-xs opacity-75">
                {`<img src="x" onerror="alert(1)">`}<br />
                {`<script>document.cookie</script>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
