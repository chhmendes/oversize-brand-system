import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getMDXBySlug, getAdjacentDocs, getAllDocSlugs } from '@/lib/mdx'

interface DocPageProps {
  params: Promise<{ slug?: string[] }>
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const segments = slug ?? []
  const fullSlug = segments.length === 0 ? 'index' : segments.join('/')

  const doc = getMDXBySlug(fullSlug)

  if (!doc) {
    if (segments.length === 0) {
      return (
        <div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">Diretrizes</h1>
          <p className="text-base text-gray-500">Selecione uma seção na barra lateral.</p>
        </div>
      )
    }
    notFound()
  }

  const { prev, next } = getAdjacentDocs(fullSlug)

  return (
    <article>
      {/* Cabeçalho */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {doc.metadata.title}
        </h1>
        {doc.metadata.description && (
          <p className="mt-2 text-base text-gray-400">{doc.metadata.description}</p>
        )}
      </div>

      {/* Conteúdo MDX */}
      <div className="prose prose-gray max-w-none
        prose-headings:font-semibold prose-headings:text-gray-900
        prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base
        prose-p:text-gray-600 prose-p:leading-relaxed
        prose-a:text-[#B51F3A] prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold prose-strong:text-gray-900
        prose-em:text-gray-600
        prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-gray-800 prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:p-5
        prose-blockquote:border-l-4 prose-blockquote:border-[#B51F3A] prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:not-italic
        prose-hr:border-gray-200
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-gray-600
        prose-table:text-sm
        prose-th:text-gray-900 prose-th:font-semibold prose-td:text-gray-600
      ">
        <MDXRemote
          source={doc.source}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {/* Navegação prev/next */}
      {(prev || next) && (
        <nav className="mt-12 flex justify-between gap-4 border-t border-gray-100 pt-8">
          {prev ? (
            <Link
              href={`/docs/${prev.slug}`}
              className="group flex max-w-[45%] flex-col gap-1"
            >
              <span className="text-xs uppercase tracking-wide text-gray-400">Anterior</span>
              <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-[#B51F3A]">
                ← {prev.metadata.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group flex max-w-[45%] flex-col items-end gap-1"
            >
              <span className="text-xs uppercase tracking-wide text-gray-400">Próximo</span>
              <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-[#B51F3A]">
                {next.metadata.title} →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </article>
  )
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const slugs = getAllDocSlugs()
  return slugs
    .filter((s: string) => s !== 'index')
    .map((s: string) => ({ slug: s.split('/').filter(Boolean) }))
}

export const dynamic = 'force-static'
