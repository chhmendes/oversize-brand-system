/**
 * Search functionality with Fuse.js integration.
 * Provides client-side full-text search with fuzzy matching.
 */

import { SearchResult } from '@/types/content'
import { getAllDocuments } from './mdx'

/**
 * Build search index from all documents
 */
export function buildSearchIndex(): SearchResult[] {
  const documents = getAllDocuments()

  return documents.map(doc => ({
    id: doc.slug || 'unknown',
    title: doc.metadata.title,
    description: doc.metadata.description,
    content: doc.source,
    href: `/docs/${doc.slug}`,
    section: doc.metadata.section,
  }))
}

/**
 * Simple client-side search using includes (fallback if Fuse.js not available)
 */
export function simpleSearch(query: string, results: SearchResult[]): SearchResult[] {
  if (!query) return []

  const lowerQuery = query.toLowerCase()

  return results.filter(
    result =>
      result.title.toLowerCase().includes(lowerQuery) ||
      result.description?.toLowerCase().includes(lowerQuery) ||
      result.content.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Advanced search with Fuse.js (if available)
 * Note: Fuse.js should be installed separately as a client-side dependency
 */
export async function fuzzySearch(
  query: string,
  results: SearchResult[],
  options?: { limit?: number; threshold?: number }
): Promise<SearchResult[]> {
  const { limit = 10, threshold = 0.3 } = options || {}

  // Dynamic import of Fuse.js (client-side only)
  try {
    const Fuse = (await import('fuse.js')).default

    const fuseIndex = new Fuse(results, {
      keys: ['title', 'description', 'content'],
      threshold,
      minMatchCharLength: 2,
    })

    const searchResults = fuseIndex.search(query)
    return searchResults.slice(0, limit).map(result => ({
      ...result.item,
      score: result.score,
    }))
  } catch (error) {
    console.warn('Fuse.js not available, falling back to simple search', error)
    return simpleSearch(query, results).slice(0, limit)
  }
}

/**
 * Search by section only
 */
export function searchBySection(section: string, results: SearchResult[]): SearchResult[] {
  return results.filter(result => result.section === section)
}

/**
 * Search by tags
 */
export function searchByTags(_tags: string[], results: SearchResult[]): SearchResult[] {
  // This would require tags to be indexed in SearchResult
  // For now, this is a placeholder
  return results
}

/**
 * Get popular search terms (most common words in content)
 */
export function getPopularTerms(results: SearchResult[], limit: number = 10): string[] {
  const wordFreq: Record<string, number> = {}

  results.forEach(result => {
    const words = (result.title + ' ' + (result.description || '') + ' ' + result.content)
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3)

    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    })
  })

  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word)
}

/**
 * Get related documents based on content similarity
 */
export function getRelatedDocuments(
  currentDoc: SearchResult,
  allDocs: SearchResult[],
  limit: number = 5
): SearchResult[] {
  // Simple implementation: find docs in same section or with similar keywords
  const sectionDocs = allDocs.filter(
    doc => doc.section === currentDoc.section && doc.id !== currentDoc.id
  )

  if (sectionDocs.length >= limit) {
    return sectionDocs.slice(0, limit)
  }

  // Fallback to just same section
  return sectionDocs
}
