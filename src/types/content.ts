/**
 * TypeScript types for content management, navigation, and MDX rendering.
 */

/**
 * Metadata extracted from MDX frontmatter
 */
export interface ContentMetadata {
  title: string
  description?: string
  author?: string
  lastUpdate?: string
  section?: string
  subsection?: string
  order?: number
  tags?: string[]
  [key: string]: any
}

/**
 * Navigation item structure
 */
export interface NavigationItem {
  title: string
  href?: string
  children?: NavigationItem[]
  icon?: string
  active?: boolean
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  title: string
  href: string
}

/**
 * Search result
 */
export interface SearchResult {
  id: string
  title: string
  description?: string
  content: string
  href: string
  section?: string
  score?: number
}

/**
 * MDX document
 */
export interface MDXDocument {
  metadata: ContentMetadata
  source: string
  slug?: string
}

/**
 * MDX component props
 */
export interface MDXProps {
  components?: Record<string, React.ComponentType<any>>
  [key: string]: any
}

/**
 * Table of Contents entry
 */
export interface TableOfContentsEntry {
  id: string
  title: string
  level: number
  children?: TableOfContentsEntry[]
}

/**
 * Doc page structure
 */
export interface DocPage {
  slug: string
  title: string
  description?: string
  content: string
  metadata: ContentMetadata
  breadcrumb?: BreadcrumbItem[]
  toc?: TableOfContentsEntry[]
  nextPage?: { title: string; href: string }
  prevPage?: { title: string; href: string }
}

/**
 * Callout component type
 */
export type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip'

/**
 * Callout props
 */
export interface CalloutProps {
  type: CalloutType
  title?: string
  children: React.ReactNode
}

/**
 * Badge props
 */
export interface BadgeProps {
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'gray'
  children: React.ReactNode
  className?: string
}

/**
 * Image props
 */
export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  className?: string
}

/**
 * Code block props
 */
export interface CodeBlockProps {
  language?: string
  filename?: string
  children: string
  className?: string
}

/**
 * Card props (for content layout)
 */
export interface CardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  href?: string
}

/**
 * Timeline item (for methodology section)
 */
export interface TimelineItem {
  step: number
  title: string
  description: string
  icon?: string
}

/**
 * Grid item (for territories, formats, etc)
 */
export interface GridItem {
  id: string
  title: string
  description?: string
  icon?: string
  color?: string
  href?: string
}
