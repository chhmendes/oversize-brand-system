/**
 * Navigation helpers for building navigation structures,
 * breadcrumbs, and navigating the documentation tree.
 */

import { NavigationItem, BreadcrumbItem, DocPage } from '@/types/content'
import { navigationConfig } from '@/config/navigation.config'
import { getAllDocuments, getMDXBySlug } from './mdx'

/**
 * Get the full navigation structure
 */
export function getNavigationStructure(): NavigationItem[] {
  return navigationConfig
}

/**
 * Find a navigation item by href
 */
export function findNavItem(href: string, items: NavigationItem[] = navigationConfig): NavigationItem | null {
  for (const item of items) {
    if (item.href === href) {
      return item
    }

    if (item.children) {
      const found = findNavItem(href, item.children)
      if (found) return found
    }
  }

  return null
}

/**
 * Get breadcrumb path for a given slug
 */
export function getBreadcrumb(slug: string): BreadcrumbItem[] {
  const parts = slug.split('/')
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Docs', href: '/docs' },
  ]

  let currentPath = '/docs'
  for (const part of parts) {
    if (part) {
      currentPath += `/${part}`
      const navItem = findNavItem(currentPath)

      if (navItem) {
        breadcrumbs.push({
          title: navItem.title,
          href: currentPath,
        })
      } else {
        // Fallback: use humanized part name
        breadcrumbs.push({
          title: part.replace(/-/g, ' '),
          href: currentPath,
        })
      }
    }
  }

  return breadcrumbs
}

/**
 * Get all doc paths for static generation
 */
export function getAllDocPaths(): string[] {
  const documents = getAllDocuments()
  return documents.map(doc => doc.slug || 'index').filter(Boolean)
}

/**
 * Get navigation items by section
 */
export function getNavItemsBySection(section: string): NavigationItem[] {
  const sections = navigationConfig[0]?.children || []
  const sectionItem = sections.find(item => item.href?.includes(section))
  return sectionItem?.children || []
}

/**
 * Get active navigation item based on current path
 */
export function getActiveNavItem(
  currentPath: string,
  items: NavigationItem[] = navigationConfig
): NavigationItem | null {
  for (const item of items) {
    if (item.href === currentPath) {
      return { ...item, active: true }
    }

    if (item.children) {
      const activeChild = getActiveNavItem(currentPath, item.children)
      if (activeChild) {
        return {
          ...item,
          children: item.children.map(child => (child === activeChild ? activeChild : child)),
          active: false,
        }
      }
    }
  }

  return null
}

/**
 * Get next and previous doc pages
 */
export function getAdjacentDocs(
  currentSlug: string
): { next: DocPage | null; prev: DocPage | null } {
  const allPaths = getAllDocPaths()
  const currentIndex = allPaths.indexOf(currentSlug)

  const prevSlug = currentIndex > 0 ? allPaths[currentIndex - 1] : null
  const nextSlug = currentIndex < allPaths.length - 1 ? allPaths[currentIndex + 1] : null

  const prev = prevSlug ? getMDXBySlug(prevSlug) : null
  const next = nextSlug ? getMDXBySlug(nextSlug) : null

  return {
    prev: prev
      ? {
          slug: prev.slug || '',
          title: prev.metadata.title,
          description: prev.metadata.description,
          content: prev.source,
          metadata: prev.metadata,
          breadcrumb: getBreadcrumb(prev.slug || ''),
        }
      : null,
    next: next
      ? {
          slug: next.slug || '',
          title: next.metadata.title,
          description: next.metadata.description,
          content: next.source,
          metadata: next.metadata,
          breadcrumb: getBreadcrumb(next.slug || ''),
        }
      : null,
  }
}

/**
 * Flatten navigation tree to array
 */
export function flattenNavTree(items: NavigationItem[] = navigationConfig): NavigationItem[] {
  let flattened: NavigationItem[] = []

  for (const item of items) {
    flattened.push({ ...item, children: undefined })

    if (item.children) {
      flattened = flattened.concat(flattenNavTree(item.children))
    }
  }

  return flattened
}

/**
 * Check if a path is active (exact match or parent)
 */
export function isPathActive(currentPath: string, navPath: string | undefined): boolean {
  if (!navPath) return false
  return currentPath === navPath || currentPath.startsWith(navPath + '/')
}

/**
 * Get navigation depth for a given path
 */
export function getNavDepth(path: string, items: NavigationItem[] = navigationConfig, depth: number = 0): number {
  for (const item of items) {
    if (item.href === path) {
      return depth
    }

    if (item.children) {
      const found = getNavDepth(path, item.children, depth + 1)
      if (found !== 0) return found
    }
  }

  return 0
}
