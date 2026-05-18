/**
 * Site-wide configuration and constants.
 * Centralized settings for the Brand System application.
 */

export const siteConfig = {
  /**
   * Basic site information
   */
  site: {
    name: 'Oversize Brand System',
    shortName: 'Brand System',
    description: 'Interface moderna para centralizar e consultar as diretrizes de marca da Oversize em um único lugar',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    author: 'Christian Mendes',
    email: 'chhmendes@gmail.com',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
  },

  /**
   * SEO configuration
   */
  seo: {
    title: 'Oversize Brand System',
    description: 'Central de diretrizes de marca e metodologia da Oversize',
    keywords: ['brand', 'design', 'methodology', 'Oversize', 'identidade visual', 'tom de voz'],
    ogImage: '/og-image.png',
    twitterHandle: '@oversize',
  },

  /**
   * Features
   */
  features: {
    search: true,
    darkMode: true,
    navigation: true,
    breadcrumbs: true,
    tableOfContents: true,
    readingTime: true,
    lastUpdate: true,
    relatedDocs: true,
    nextPrevNav: true,
  },

  /**
   * Performance and caching
   */
  cache: {
    revalidateInterval: 86400, // 24 hours (ISR)
    staticDuration: 604800, // 7 days
  },

  /**
   * Pagination
   */
  pagination: {
    docsPerPage: 10,
    searchResultsPerPage: 20,
    maxResults: 100,
  },

  /**
   * Layout
   */
  layout: {
    sidebarWidth: 280, // pixels
    maxContentWidth: 1200, // pixels
    mobileBreakpoint: 768, // pixels
  },

  /**
   * Social links
   */
  social: {
    twitter: 'https://twitter.com/oversize',
    linkedin: 'https://linkedin.com/company/oversize',
    instagram: 'https://instagram.com/oversize',
    github: 'https://github.com/oversize',
  },

  /**
   * Analytics (placeholder for future integration)
   */
  analytics: {
    enabled: false,
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },

  /**
   * Integrations (prepared for future use)
   */
  integrations: {
    supabase: {
      enabled: false,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    vercelAnalytics: {
      enabled: false,
    },
  },

  /**
   * Content settings
   */
  content: {
    contentDir: 'content',
    docsDir: 'content/docs',
    defaultAuthor: 'Christian Mendes',
    defaultLocale: 'pt-BR',
  },

  /**
   * Navigation settings
   */
  navigation: {
    mainMenu: 'main', // Identifier for main menu
    enableMobileMenu: true,
    enableSearchInNav: true,
    enableBreadcrumbs: true,
    breadcrumbSeparator: '/',
  },

  /**
   * Component defaults
   */
  components: {
    codeBlockLanguages: [
      'typescript',
      'javascript',
      'jsx',
      'tsx',
      'css',
      'html',
      'markdown',
      'json',
      'yaml',
      'bash',
      'sh',
    ],
    calloutTypes: ['info', 'warning', 'success', 'error', 'tip'],
  },

  /**
   * Security (placeholder for future implementation)
   */
  security: {
    enableCSP: false,
    csrfProtection: false,
  },

  /**
   * API endpoints (prepared for future implementation)
   */
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 5000,
  },
} as const

export type SiteConfig = typeof siteConfig

/**
 * Get config value with fallback
 */
export function getConfig<K extends keyof SiteConfig>(key: K, fallback?: SiteConfig[K]): SiteConfig[K] {
  const value = siteConfig[key]
  return value !== undefined ? value : fallback
}
