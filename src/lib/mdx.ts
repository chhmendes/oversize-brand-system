import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ContentMetadata, MDXDocument } from '@/types/content'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs')

export function getAllMDXFiles(dir: string = CONTENT_DIR): string[] {
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir)
  let mdxFiles: string[] = []

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      mdxFiles = [...mdxFiles, ...getAllMDXFiles(filePath)]
    } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
      mdxFiles.push(filePath)
    }
  }

  return mdxFiles
}

export function getMDXContent(filePath: string): MDXDocument {
  if (!fs.existsSync(filePath)) {
    throw new Error(`MDX file not found: ${filePath}`)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const slug = filePath
    .replace(CONTENT_DIR, '')
    .replace(/\.mdx?$/, '')
    .replace(/^\//, '')
    .replace(/\/index$/, '') || 'index'

  return {
    metadata: data as ContentMetadata,
    source: content,
    slug,
  }
}

export function getMDXBySlug(slug: string): MDXDocument | null {
  try {
    const possiblePaths = [
      path.join(CONTENT_DIR, `${slug}.mdx`),
      path.join(CONTENT_DIR, `${slug}.md`),
      path.join(CONTENT_DIR, `${slug}/index.mdx`),
    ]

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        return getMDXContent(filePath)
      }
    }

    return null
  } catch (error) {
    console.error(`Error reading MDX file for slug: ${slug}`, error)
    return null
  }
}

export function getAllDocSlugs(): string[] {
  const files = getAllMDXFiles()
  return files.map((file) =>
    file
      .replace(CONTENT_DIR, '')
      .replace(/\.mdx?$/, '')
      .replace(/^\//, '')
      .replace(/\/index$/, '') || 'index'
  )
}

export function getAllDocuments(): MDXDocument[] {
  const files = getAllMDXFiles()
  return files
    .map((file) => {
      try {
        return getMDXContent(file)
      } catch {
        return null
      }
    })
    .filter((doc): doc is MDXDocument => doc !== null)
}

export function sortDocumentsByOrder(documents: MDXDocument[]): MDXDocument[] {
  return [...documents].sort((a, b) => {
    const orderA = a.metadata.order ?? Infinity
    const orderB = b.metadata.order ?? Infinity
    return orderA - orderB
  })
}

export function extractHeadings(content: string) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings: Array<{ level: number; title: string; id: string }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].match(/^#+/)?.[0].length || 1
    const title = match[1].trim()
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ level, title, id })
  }

  return headings
}

export function getAdjacentDocs(slug: string): {
  prev: MDXDocument | null
  next: MDXDocument | null
} {
  const allDocs = sortDocumentsByOrder(
    getAllDocuments().filter((d) => d.slug !== 'index')
  )
  const currentIndex = allDocs.findIndex((doc) => doc.slug === slug)

  return {
    prev: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
    next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null,
  }
}
