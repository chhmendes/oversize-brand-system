import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * 404 Not Found page
 * Displayed when a route does not exist
 */
export default function NotFound(): ReactNode {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <p className="text-6xl font-bold text-gray-900 mb-4">404</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-[#B51F3A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#D42848] focus:outline-none focus:ring-2 focus:ring-[#B51F3A] focus:ring-offset-2"
          >
            Back to Home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#B51F3A] focus:ring-offset-2"
          >
            View Docs
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Looking for something specific?
          </p>
          <ul className="text-left space-y-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="text-[#B51F3A] hover:underline"
              >
                → Brand System Home
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                className="text-[#B51F3A] hover:underline"
              >
                → Documentation Index
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
