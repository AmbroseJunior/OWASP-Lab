// components/Nav.js
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="p-5 bg-gray-100 dark:bg-gray-900">
      <div className="flex space-x-4">
        <Link
          href="/vulnerable"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Vulnerable
        </Link>
        <Link
          href="/safe"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Safe
        </Link>
      </div>
    </nav>
  );
}