'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error boundary component
 * Catches unhandled errors in the app and displays a user-friendly message
 *
 * This is a Client Component (marked with 'use client') because error boundaries
 * currently require client-side interactivity
 */
export default function Error({ error, reset }: ErrorProps): ReactNode {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error)
    }
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <p className="text-6xl font-bold text-red-600 mb-4">Error</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h1>
        </div>

        <p className="text-gray-600 text-lg mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 rounded-lg bg-red-50 border border-red-200 p-4 text-left">
            <p className="text-xs font-mono text-red-600 mb-2 font-semibold">
              Error Details:
            </p>
            <p className="text-xs font-mono text-red-800 whitespace-pre-wrap break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg bg-[#B51F3A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#D42848] focus:outline-none focus:ring-2 focus:ring-[#B51F3A] focus:ring-offset-2"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#B51F3A] focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            If this problem persists, please{' '}
            <a
              href="mailto:support@oversize.co"
              className="text-[#B51F3A] hover:underline"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
