import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#B51F3A',
}

export const metadata: Metadata = {
  title: 'Oversize Brand System',
  description:
    'Central repository for Oversize brand guidelines, voice, methodology, and visual standards.',
  icons: {
    icon: '/brand/logo-original.png',
    apple: '/brand/logo-original.png',
  },
  openGraph: {
    title: 'Oversize Brand System',
    description: 'Brand guidelines and documentation platform',
    url: 'https://brand.oversize.co',
    siteName: 'Oversize Brand System',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        {/* Apply saved theme before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d))document.documentElement.classList.add('dark');})();`,
          }}
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
