/**
 * Site-wide constants and configuration values.
 */

export const SITE_NAME = 'Oversize Brand System'
export const SITE_DESCRIPTION = 'Interface moderna para centralizar e consultar as diretrizes de marca da Oversize em um único lugar'
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

/**
 * Brand colors (from design tokens)
 */
export const COLORS = {
  primary: '#B51F3A',
  secondary: '#FF6B6B',
  accent: '#FFE66D',
  neutral50: '#FAFAFA',
  neutral900: '#1A1A1A',
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
}

/**
 * Typography scale
 */
export const TYPOGRAPHY = {
  H1: { size: '3rem', weight: 700, lineHeight: 1.2 },
  H2: { size: '2.25rem', weight: 700, lineHeight: 1.3 },
  H3: { size: '1.875rem', weight: 600, lineHeight: 1.4 },
  H4: { size: '1.5rem', weight: 600, lineHeight: 1.4 },
  H5: { size: '1.25rem', weight: 600, lineHeight: 1.5 },
  H6: { size: '1rem', weight: 600, lineHeight: 1.5 },
  Body: { size: '1rem', weight: 400, lineHeight: 1.6 },
  Small: { size: '0.875rem', weight: 400, lineHeight: 1.5 },
  Caption: { size: '0.75rem', weight: 400, lineHeight: 1.4 },
}

/**
 * Spacing scale (in rem)
 */
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
}

/**
 * Sidebar configuration
 */
export const SIDEBAR = {
  DESKTOP_WIDTH: 280,
  MOBILE_BREAKPOINT: 768,
}

/**
 * Default pagination
 */
export const PAGINATION = {
  PER_PAGE: 10,
  MAX_PER_PAGE: 100,
}

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  DOCS: '/docs',
  SEARCH: '/search',
  NOT_FOUND: '/404',
}

/**
 * Navigation section slugs (from briefing.md)
 */
export const SECTIONS = {
  VOICE_IDENTITY: 'voz-e-identidade',
  METHODOLOGY: 'metodologia',
  ICP_BUSINESS: 'icp-e-negocio',
  CONTENT: 'conteudo',
  VISUALS: 'visuais',
  RESOURCES: 'recursos',
}

/**
 * Content frontmatter defaults
 */
export const FRONTMATTER_DEFAULTS = {
  author: 'Christian Mendes',
  locale: 'pt-BR',
}

/**
 * SEO defaults
 */
export const SEO = {
  TITLE: SITE_NAME,
  DESCRIPTION: SITE_DESCRIPTION,
  KEYWORDS: ['brand', 'design', 'methodology', 'Oversize'],
  LOCALE: 'pt-BR',
}
