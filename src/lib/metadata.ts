/**
 * Content metadata utilities for generating metadata from documents.
 * Used for SEO, social sharing, and dynamic page metadata.
 */

import { Metadata } from 'next'
import { ContentMetadata, MDXDocument } from '@/types/content'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SEO } from '@/utils/constants'

/**
 * Generate metadata from MDX document metadata
 */
export function generateMetadata(
  doc: MDXDocument,
  baseUrl: string = SITE_URL
): Metadata {
  const title = doc.metadata.title || SITE_NAME
  const description = doc.metadata.description || SITE_DESCRIPTION
  const url = `${baseUrl}/docs/${doc.slug}`

  return {
    title,
    description,
    keywords: doc.metadata.tags || SEO.KEYWORDS,
    authors: doc.metadata.author ? [{ name: doc.metadata.author }] : undefined,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: SITE_NAME,
      locale: doc.metadata.locale || SEO.LOCALE,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

/**
 * Generate default site metadata
 */
export function generateSiteMetadata(title?: string, description?: string): Metadata {
  const siteTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const siteDescription = description || SITE_DESCRIPTION

  return {
    title: siteTitle,
    description: siteDescription,
    keywords: SEO.KEYWORDS,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: SITE_URL,
      type: 'website',
      siteName: SITE_NAME,
      locale: SEO.LOCALE,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
    },
  }
}

/**
 * Extract metadata from frontmatter
 */
export function extractMetadata(frontmatter: Record<string, any>): ContentMetadata {
  return {
    title: frontmatter.title || '',
    description: frontmatter.description,
    author: frontmatter.author,
    lastUpdate: frontmatter.lastUpdate,
    section: frontmatter.section,
    subsection: frontmatter.subsection,
    order: frontmatter.order,
    tags: frontmatter.tags || [],
    ...frontmatter,
  }
}

/**
 * Validate metadata required fields
 */
export function validateMetadata(metadata: ContentMetadata): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!metadata.title) {
    errors.push('Missing required field: title')
  }

  if (!metadata.section && !metadata.subsection) {
    errors.push('Missing section or subsection')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Generate reading time estimate (in minutes)
 */
export function estimateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return Math.max(1, minutes)
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, length: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .trim()

  // Get first paragraph
  const firstParagraph = plainText.split('\n\n')[0]

  if (firstParagraph.length <= length) {
    return firstParagraph
  }

  return firstParagraph.slice(0, length).trim() + '...'
}

/**
 * Format metadata for display
 */
export function formatMetadata(metadata: ContentMetadata): {
  title: string
  description?: string
  author?: string
  date?: string
  readingTime?: string
} {
  return {
    title: metadata.title,
    description: metadata.description,
    author: metadata.author,
    date: metadata.lastUpdate,
    readingTime: undefined,
  }
}

/**
 * Merge metadata with defaults
 */
export function mergeMetadata(
  metadata: Partial<ContentMetadata>,
  defaults: ContentMetadata
): ContentMetadata {
  return {
    ...defaults,
    ...metadata,
  }
}
