# Especificação Técnica — Brand System Web App

**Data:** 16 maio 2026
**Versão:** 1.0
**Status:** Ativo
**Responsável:** Christian Mendes
**Stack:** Next.js 15+, TypeScript, Tailwind CSS 4.0+, MDX

---

## 1. Stack e Justificativas

### Next.js 15 (App Router)

Escolhido como framework principal por três razões concretas:

1. **Static Generation nativa.** Todo o conteúdo MDX é compilado em build-time via `generateStaticParams`. O resultado é HTML puro — zero JavaScript server-side em produção para páginas de conteúdo.
2. **React Server Components.** Componentes de layout (Sidebar, Navigation) rodam no servidor. Nenhum JS é enviado ao cliente para renderizar a estrutura da página.
3. **App Router.** A convenção de pastas (`app/`) torna o roteamento legível e elimina configuração manual. Layouts aninhados (`layout.tsx`) permitem composição sem prop drilling.

**Alternativa considerada:** Astro. Descartado porque o projeto usa React extensivamente e a integração com MDX React components é mais natural no Next.js.

### Tailwind CSS 4.0

A versão 4.0 muda a configuração para CSS-first: tokens são definidos como variáveis CSS em `globals.css`, não em `tailwind.config.ts`. Isso elimina o `tailwind.config.ts` para a maioria dos casos e mantém as variáveis acessíveis no CSS nativo.

**Por que não CSS Modules ou Styled Components?** Tailwind resolve o problema de naming e escoping sem adicionar abstração. Para um sistema de documentação com muitos componentes pequenos, a produtividade é maior.

### MDX

MDX permite que arquivos de conteúdo usem componentes React diretamente. Um arquivo `.mdx` sobre paleta de cores pode renderizar `<ColorSwatch>` inline. Isso elimina a necessidade de um CMS separado para conteúdo rico.

**Biblioteca escolhida: `next-mdx-remote`** (não `@next/mdx`).

Razão: `@next/mdx` compila arquivos `.mdx` como páginas Next.js — funciona bem para documentação estática simples, mas não suporta compilação de MDX a partir de arquivos em `content/` com roteamento dinâmico. `next-mdx-remote` compila MDX em runtime de servidor (Server Component), aceita qualquer fonte de conteúdo e é compatível com RSC via `next-mdx-remote/rsc`.

### Supabase (Fase 2)

Quando o projeto precisar de autenticação e controle de acesso, Supabase oferece:
- Auth com suporte a OAuth (Google, GitHub) e email/senha
- PostgreSQL gerenciado para eventuais metadados de usuário
- Storage para brand assets (logos, fontes, arquivos)
- Tudo em um único serviço com SDK TypeScript

**Alternativa:** Auth.js (NextAuth) + S3. Mais flexível, porém mais configuração. Supabase é mais rápido para um time pequeno.

### Vercel (Fase 2)

Zero-config para Next.js. O deploy funciona com `git push`. Suporta preview deployments automáticos por branch, o que é útil para revisar mudanças de conteúdo antes de publicar.

---

## 2. Estrutura de Pastas

```
brand-system/
├── app/
│   ├── layout.tsx                  # Root layout: HTML, body, fontes
│   ├── page.tsx                    # Home — área de boas-vindas
│   ├── globals.css                 # Tailwind + CSS variables (tokens)
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx            # Página de login (Fase 2)
│   └── docs/
│       ├── layout.tsx              # Layout com Sidebar + Content Area
│       └── [...slug]/
│           └── page.tsx            # Rota dinâmica para qualquer MDX
│
├── content/
│   └── docs/                       # Arquivos .mdx — fonte de verdade do conteúdo
│       ├── introducao.mdx
│       ├── identidade/
│       │   ├── logotipo.mdx
│       │   ├── cores.mdx
│       │   └── tipografia.mdx
│       ├── tom-de-voz/
│       │   ├── principios.mdx
│       │   └── exemplos.mdx
│       └── aplicacoes/
│           ├── redes-sociais.mdx
│           └── apresentacoes.mdx
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx             # Menu lateral com navegação
│   │   ├── SidebarLink.tsx         # Item individual de navegação
│   │   └── MobileNav.tsx           # Drawer para mobile
│   ├── mdx/
│   │   ├── MDXContent.tsx          # Wrapper next-mdx-remote/rsc
│   │   ├── Callout.tsx             # Box info/warning/tip
│   │   ├── ColorSwatch.tsx         # Swatch de cor com hex e nome
│   │   ├── CodeBlock.tsx           # Código com syntax highlight e copy
│   │   └── components.tsx          # Map: tag HTML → componente customizado
│   └── ui/
│       ├── Breadcrumbs.tsx         # Breadcrumb derivado do slug
│       ├── TableOfContents.tsx     # TOC gerado dos headings do MDX
│       └── NavLinks.tsx            # Prev/Next entre páginas
│
├── lib/
│   ├── mdx.ts                      # Lê, parseia e compila arquivos MDX
│   ├── navigation.ts               # Gera estrutura de navegação e breadcrumb
│   └── types.ts                    # Tipos TypeScript compartilhados
│
├── public/
│   ├── fonts/                      # Arquivos de fonte (se self-hosted)
│   └── brand/                      # Logos, ícones exportados
│
├── docs/                           # Documentação do projeto (este arquivo)
│   ├── briefing.md
│   ├── prd.md
│   ├── spec.md
│   └── ui-plan.md
│
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts              # Mínimo — Tailwind 4.0 usa CSS-first
└── tsconfig.json
```

---

## 3. Padrão de Roteamento

### App Router (Next.js 15)

Todas as rotas vivem em `app/`. O sistema usa:

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `app/page.tsx` | Home |
| `/auth/login` | `app/auth/login/page.tsx` | Login (Fase 2) |
| `/docs/introducao` | `app/docs/[...slug]/page.tsx` | Página MDX simples |
| `/docs/identidade/cores` | `app/docs/[...slug]/page.tsx` | Página MDX aninhada |

O catch-all `[...slug]` captura qualquer profundidade de rota dentro de `/docs/`.

### Geração Estática

Todas as páginas de documentação são pré-renderizadas em build-time via `generateStaticParams`:

```typescript
// app/docs/[...slug]/page.tsx

import { getAllDocSlugs } from '@/lib/mdx'

export async function generateStaticParams() {
  const slugs = getAllDocSlugs() // lê content/docs/ recursivamente
  return slugs.map((slug) => ({ slug }))
}

export default async function DocPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const slugPath = params.slug.join('/')
  const { content, frontmatter } = await getDocBySlug(slugPath)

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <MDXContent source={content} />
    </article>
  )
}
```

### Derivação do slug a partir do caminho do arquivo

```
content/docs/identidade/cores.mdx  →  slug: ['identidade', 'cores']  →  /docs/identidade/cores
content/docs/introducao.mdx        →  slug: ['introducao']            →  /docs/introducao
```

---

## 4. Sistema MDX

### Biblioteca: `next-mdx-remote/rsc`

A versão RSC de `next-mdx-remote` compila MDX dentro de um React Server Component — sem JavaScript enviado ao cliente para a compilação. O conteúdo renderizado chega como HTML.

```typescript
// components/mdx/MDXContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from './components'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { rehypeShiki } from '@shikijs/rehype'

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypeShiki, { theme: 'github-dark' }],
          ],
        },
      }}
    />
  )
}
```

### Frontmatter — campos obrigatórios

Todo arquivo `.mdx` em `content/docs/` deve ter estes campos no frontmatter:

```yaml
---
title: string          # Título da página (aparece no H1 e na aba do browser)
description: string    # Descrição curta (meta description, sidebar tooltip)
section: string        # Seção pai (ex: "identidade", "tom-de-voz")
order: number          # Ordem dentro da seção (define sequência no sidebar)
---
```

Campos opcionais:

```yaml
---
updated: string        # Data da última atualização (ex: "2026-05-16")
status: string         # "draft" | "review" | "published"
---
```

### Exemplo completo de arquivo MDX

```mdx
---
title: "Paleta de Cores"
description: "Sistema cromático da Oversize — cores primárias, neutras e de suporte."
section: "identidade"
order: 2
updated: "2026-05-16"
status: "published"
---

## Cor primária

A cor primária da Oversize é o azul `#0066FF`. Ela aparece em botões, bordas ativas e links.

<ColorSwatch hex="#0066FF" name="Blue Primary" usage="Botões, links, bordas ativas" />

## Neutros

<ColorSwatch hex="#0A0A0A" name="Black" usage="Texto principal" />
<ColorSwatch hex="#FFFFFF" name="White" usage="Fundo padrão" />
<ColorSwatch hex="#F5F5F5" name="Gray 100" usage="Fundo de cards, seções alternadas" />

## Uso incorreto

<Callout type="warning">
  Não use a cor primária em fundos de grandes áreas. Reservada para elementos de ação e destaque.
</Callout>
```

### Pipeline de compilação

```
arquivo .mdx
    ↓
gray-matter (extrai frontmatter)
    ↓
remark-gfm (tabelas, strikethrough, task lists GitHub-flavored)
    ↓
rehype-slug (gera id nos headings H2, H3)
    ↓
rehype-autolink-headings (links âncora nos headings)
    ↓
@shikijs/rehype (syntax highlight com tema github-dark)
    ↓
MDXRemote (renderiza como React Server Component)
    ↓
HTML estático com componentes customizados injetados
```

### Map de componentes customizados

```typescript
// components/mdx/components.tsx
import { Callout } from './Callout'
import { ColorSwatch } from './ColorSwatch'
import { CodeBlock } from './CodeBlock'

export const mdxComponents = {
  // Overrides de elementos HTML
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mt-10 mb-4 text-zinc-900" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-medium mt-8 mb-3 text-zinc-800" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed text-zinc-700 mb-4" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-sm bg-zinc-100 px-1.5 py-0.5 rounded" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  // Componentes customizados disponíveis no MDX
  Callout,
  ColorSwatch,
  CodeBlock,
}
```

---

## 5. Sistema de Navegação

### Estrutura de `navigation.json`

A navegação é derivada automaticamente dos arquivos MDX via `lib/navigation.ts`, mas pode ser sobrescrita por um `navigation.json` manual se a ordem precisar de ajuste fino.

Estrutura esperada:

```json
{
  "sections": [
    {
      "title": "Identidade",
      "slug": "identidade",
      "items": [
        { "title": "Logotipo", "slug": "identidade/logotipo", "order": 1 },
        { "title": "Cores", "slug": "identidade/cores", "order": 2 },
        { "title": "Tipografia", "slug": "identidade/tipografia", "order": 3 }
      ]
    },
    {
      "title": "Tom de Voz",
      "slug": "tom-de-voz",
      "items": [
        { "title": "Princípios", "slug": "tom-de-voz/principios", "order": 1 },
        { "title": "Exemplos", "slug": "tom-de-voz/exemplos", "order": 2 }
      ]
    }
  ]
}
```

### Geração automática da navegação

```typescript
// lib/navigation.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content/docs')

export interface NavItem {
  title: string
  slug: string
  order: number
}

export interface NavSection {
  title: string
  slug: string
  items: NavItem[]
}

export function buildNavigation(): NavSection[] {
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })

  const sections = entries
    .filter((e) => e.isDirectory())
    .map((dir) => {
      const files = fs.readdirSync(path.join(CONTENT_DIR, dir.name))

      const items = files
        .filter((f) => f.endsWith('.mdx'))
        .map((file) => {
          const raw = fs.readFileSync(
            path.join(CONTENT_DIR, dir.name, file),
            'utf8'
          )
          const { data } = matter(raw)
          return {
            title: data.title as string,
            slug: `${dir.name}/${file.replace('.mdx', '')}`,
            order: (data.order as number) ?? 99,
          }
        })
        .sort((a, b) => a.order - b.order)

      return {
        title: dir.name
          .split('-')
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(' '),
        slug: dir.name,
        items,
      }
    })

  return sections
}
```

### Detecção do link ativo na Sidebar

```typescript
// components/layout/SidebarLink.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarLinkProps {
  href: string
  title: string
}

export function SidebarLink({ href, title }: SidebarLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === `/docs/${href}`

  return (
    <Link
      href={`/docs/${href}`}
      className={cn(
        'block px-3 py-1.5 text-sm rounded transition-colors',
        isActive
          ? 'bg-blue-50 text-blue-600 font-medium'
          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
      )}
    >
      {title}
    </Link>
  )
}
```

---

## 6. Design System — Tokens

### Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-brand` | `#0066FF` | Botões, links, bordas ativas, highlights |
| `--color-black` | `#0A0A0A` | Texto principal, títulos |
| `--color-white` | `#FFFFFF` | Fundo padrão |
| `--color-gray-50` | `#F9F9F9` | Fundo alternativo, cards |
| `--color-gray-100` | `#F0F0F0` | Bordas suaves, separadores |
| `--color-gray-400` | `#999999` | Texto secundário, placeholders |
| `--color-gray-700` | `#444444` | Texto de corpo |
| `--color-success` | `#16A34A` | Callout tipo "tip" |
| `--color-warning` | `#D97706` | Callout tipo "warning" |
| `--color-error` | `#DC2626` | Callout tipo "danger" |

### Tipografia

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-sans` | `'Inter', sans-serif` | Todo o texto da interface |
| `--font-mono` | `'JetBrains Mono', monospace` | Blocos de código, inline code |
| `--text-xs` | `0.75rem / 1.5` | Caption, labels pequenos |
| `--text-sm` | `0.875rem / 1.5` | Sidebar links, metadados |
| `--text-base` | `1rem / 1.75` | Corpo do texto |
| `--text-lg` | `1.125rem / 1.6` | Lead, subtítulos menores |
| `--text-xl` | `1.25rem / 1.5` | H3 |
| `--text-2xl` | `1.5rem / 1.4` | H2 |
| `--text-4xl` | `2.25rem / 1.2` | H1 de página |

### Configuração em Tailwind 4.0 (CSS-first)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand: #0066FF;
  --color-black: #0A0A0A;
  --color-white: #FFFFFF;
  --color-gray-50: #F9F9F9;
  --color-gray-100: #F0F0F0;
  --color-gray-200: #E5E5E5;
  --color-gray-400: #999999;
  --color-gray-700: #444444;
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;

  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --sidebar-width: 280px;
  --content-max-width: 720px;
}
```

No Tailwind 4.0, variáveis definidas em `@theme` são automaticamente disponíveis como classes utilitárias: `bg-brand`, `text-gray-700`, `font-mono`, etc.

---

## 7. Componentes Principais

### `Sidebar`

**Arquivo:** `components/layout/Sidebar.tsx`

Props:
```typescript
interface SidebarProps {
  navigation: NavSection[]
}
```

Comportamento:
- Desktop (≥ 1024px): posição fixa à esquerda, largura `280px`, altura `100vh`, scroll interno
- Mobile (< 1024px): escondida por padrão, abre como drawer via estado `useState`
- Seções colapsáveis com `<details>` nativo (sem JavaScript adicional)
- Link ativo detectado via `usePathname()` — componente `'use client'`

### `MDXContent`

**Arquivo:** `components/mdx/MDXContent.tsx`

```typescript
interface MDXContentProps {
  source: string
}
```

Server Component. Recebe a string de conteúdo MDX (já extraída do arquivo, sem frontmatter) e renderiza via `MDXRemote`. Injeta os `mdxComponents` automaticamente.

### `TableOfContents`

**Arquivo:** `components/ui/TableOfContents.tsx`

Gerado a partir dos headings do MDX. A estratégia é extrair os headings diretamente do source MDX (texto) antes de compilar, usando regex simples:

```typescript
// lib/mdx.ts
export function extractHeadings(source: string) {
  const regex = /^#{2,3}\s+(.+)$/gm
  const headings: { level: number; text: string; slug: string }[] = []
  let match

  while ((match = regex.exec(source)) !== null) {
    const level = match[0].startsWith('###') ? 3 : 2
    const text = match[1].trim()
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ level, text, slug })
  }

  return headings
}
```

O TOC renderiza links `href="#slug"` que apontam para os `id` gerados pelo plugin `rehype-slug`.

### `Breadcrumbs`

**Arquivo:** `components/ui/Breadcrumbs.tsx`

Derivado do slug atual. Exemplo: slug `['identidade', 'cores']` gera:

```
Docs  /  Identidade  /  Cores
```

```typescript
interface BreadcrumbsProps {
  slug: string[]
}

export function Breadcrumbs({ slug }: BreadcrumbsProps) {
  const crumbs = [
    { label: 'Docs', href: '/docs' },
    ...slug.map((segment, i) => ({
      label: segment
        .split('-')
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(' '),
      href: `/docs/${slug.slice(0, i + 1).join('/')}`,
    })),
  ]

  return (
    <nav aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href}>
          {i > 0 && <span className="mx-2 text-gray-400">/</span>}
          <a href={crumb.href} className="text-sm text-gray-500 hover:text-brand">
            {crumb.label}
          </a>
        </span>
      ))}
    </nav>
  )
}
```

### `NavLinks` (Prev / Next)

**Arquivo:** `components/ui/NavLinks.tsx`

Recebe a lista ordenada de todas as páginas da seção e exibe links para a página anterior e próxima. Calculado em `app/docs/[...slug]/page.tsx` a partir da navegação construída em `lib/navigation.ts`.

---

## 8. CSS e Scroll

### Scroll fluido sem scrollbar visível

Aplicado em três lugares:

1. **Body global** — para a página como um todo
2. **Content area** — para a área principal de conteúdo quando o layout é fixo
3. **Sidebar** — para scroll interno da navegação quando o conteúdo é longo

```css
/* app/globals.css */

/* Remove scrollbar — todos os browsers */
* {
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE/Edge legado */
}

*::-webkit-scrollbar {
  display: none;               /* Chrome, Safari, Opera */
}

/* Scroll suave em toda a página */
html {
  scroll-behavior: smooth;
}

/* Content area: scroll interno sem barra */
.content-area {
  height: 100vh;
  overflow-y: auto;
}

/* Sidebar: scroll independente do conteúdo */
.sidebar {
  height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;
}
```

O `scroll-behavior: smooth` faz com que os links de âncora do TOC (ex: `href="#instalacao"`) animem o scroll em vez de pular abruptamente.

---

## 9. Dependências — `package.json` esperado

```json
{
  "name": "oversize-brand-system",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3",
    "remark-gfm": "^4.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "@shikijs/rehype": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

**Nota sobre Tailwind 4.0:** Não usa `postcss-nesting` ou `autoprefixer` separados. O `@tailwindcss/postcss` já inclui tudo.

---

## 10. Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento com hot reload
npm run dev
# → http://localhost:3000

# Build de produção (Static Generation de todas as rotas MDX)
npm run build

# Servir o build localmente
npm run start
# → http://localhost:3000

# Lint (ESLint com regras Next.js)
npm run lint
```

Para verificar o output estático gerado:

```bash
# Após npm run build, inspecionar o diretório .next/server/app/docs/
ls .next/server/app/docs/
```

Cada rota MDX deve aparecer como um arquivo `.html` pré-renderizado.

---

## 11. Preparação para Fase 2 — Supabase

O projeto MVP não usa Supabase. Mas a estrutura está organizada para que a integração não exija refatoração.

### O que precisará ser adicionado

**Variáveis de ambiente** (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Apenas server-side
```

**Client Supabase** (`lib/supabase.ts`):
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Middleware de autenticação** (`middleware.ts` na raiz):
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Redirecionar para login se não autenticado e tentando acessar /docs
  if (!session && req.nextUrl.pathname.startsWith('/docs')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/docs/:path*'],
}
```

### Como o projeto já facilita essa integração

1. A rota `/auth/login` já existe como estrutura de pasta — só precisa ter o componente implementado.
2. O `lib/` é o local correto para adicionar `lib/supabase.ts` sem tocar em componentes.
3. O middleware de Next.js opera antes da renderização das páginas — não exige mudança nos `page.tsx` existentes.
4. Todo o conteúdo MDX está em `content/` como arquivos estáticos. Na Fase 2, pode migrar para Supabase Storage se necessário — a lógica de leitura fica isolada em `lib/mdx.ts`.

---

## 12. Decisões Técnicas e Trade-offs

| Decisão | Alternativas consideradas | Razão da escolha |
|---------|--------------------------|-----------------|
| `next-mdx-remote` sobre `@next/mdx` | `@next/mdx`, `contentlayer` | Suporta conteúdo em `content/` com roteamento dinâmico; compatível com RSC |
| Tailwind 4.0 CSS-first | Tailwind 3.x com `tailwind.config.ts` | CSS variables nativas, sem arquivo de config separado para tokens |
| Static Generation | Server-Side Rendering (SSR) | Conteúdo de marca não muda em tempo real; SSG = zero custo de servidor |
| `rehype-slug` + `rehype-autolink-headings` | Headings manuais com ids | Automático, sem necessidade de escrever `id` em cada heading do MDX |
| `@shikijs/rehype` | `rehype-highlight`, `prism` | Shiki usa grammar do VS Code; melhor fidelidade de cores e suporte a temas |
| Sem estado global (Fase 1) | Zustand, Jotai, React Context | Não há estado compartilhado relevante no MVP; `usePathname` resolve o ativo |
| Scroll hidden no `*` global | Apenas em elementos específicos | Consistência visual — nenhum elemento mostra scrollbar em nenhuma situação |

---

## 13. TypeScript — Tipos Principais

```typescript
// lib/types.ts

export interface DocFrontmatter {
  title: string
  description: string
  section: string
  order: number
  updated?: string
  status?: 'draft' | 'review' | 'published'
}

export interface DocFile {
  slug: string[]
  frontmatter: DocFrontmatter
  content: string
}

export interface NavItem {
  title: string
  slug: string
  order: number
}

export interface NavSection {
  title: string
  slug: string
  items: NavItem[]
}

export interface Heading {
  level: 2 | 3
  text: string
  slug: string
}
```

---

## 14. `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Não precisa de configuração MDX aqui ao usar next-mdx-remote
  // O MDX é compilado dentro dos Server Components em lib/mdx.ts

  images: {
    // Domínios permitidos para next/image (Fase 2: Supabase Storage)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },

  // Exportação estática completa (opcional para deploy sem servidor)
  // output: 'export',
}

export default nextConfig
```

---

## 15. Sequência de Implementação (MVP)

Ordem recomendada para não bloquear progresso:

1. Scaffold `npx create-next-app@latest brand-system --typescript --tailwind --app`
2. Instalar dependências MDX: `npm install next-mdx-remote gray-matter remark-gfm rehype-slug rehype-autolink-headings @shikijs/rehype`
3. Configurar tokens em `app/globals.css` via `@theme` do Tailwind 4.0
4. Implementar `lib/mdx.ts` e `lib/navigation.ts`
5. Criar dois arquivos `.mdx` de teste em `content/docs/`
6. Implementar `app/docs/[...slug]/page.tsx` com `generateStaticParams`
7. Construir `components/layout/Sidebar.tsx` com navegação estática
8. Implementar `components/mdx/MDXContent.tsx` com componentes básicos
9. Adicionar `TableOfContents`, `Breadcrumbs`, `NavLinks`
10. Validar `npm run build` — todas as rotas devem aparecer como estáticas
11. Testar scroll sem scrollbar em Chrome, Firefox e Safari

---

*Versão 1.0 — 16 maio 2026*
