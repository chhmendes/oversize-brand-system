# Plano de UI — Oversize Brand System

Documento técnico de referência visual para implementação do Brand System da Oversize. Cobre as três páginas do MVP (Login, Inicial, Diretrizes), sistema de design completo e padrões de implementação com Next.js 15 + Tailwind CSS 4.0.

---

## 1. Sistema Visual — Visão Geral

### 1.1 Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-brand` | `#0066FF` | Primária — botões, links ativos, bordas de foco |
| `--color-brand-dark` | `#0052CC` | Hover de elementos primários |
| `--color-brand-light` | `#3385FF` | Estados de destaque leve |
| `--color-brand-faint` | `#EBF2FF` | Backgrounds de itens ativos na sidebar |
| `--color-black` | `#0A0A0A` | Texto principal |
| `--color-gray-900` | `#111111` | Backgrounds escuros (sidebar dark, login left) |
| `--color-gray-800` | `#1C1C1E` | Cards escuros, superfícies secundárias |
| `--color-gray-600` | `#6B7280` | Texto secundário, placeholders |
| `--color-gray-400` | `#9CA3AF` | Bordas, divisores |
| `--color-gray-200` | `#E5E7EB` | Bordas suaves, backgrounds |
| `--color-gray-100` | `#F3F4F6` | Backgrounds de chips, hover states |
| `--color-white` | `#FFFFFF` | Superfícies claras, texto invertido |
| `--color-error` | `#EF4444` | Estados de erro em inputs |
| `--color-success` | `#10B981` | Confirmações |

**Gradiente de identidade (painel direito do login):**

```
#0066FF → #1a0066 → #000000 → #003399
```

### 1.2 Tipografia

Família exclusiva: **Inter** (Google Fonts ou variável local).

```html
<!-- No <head> do layout.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Escala tipográfica:**

| Nome | Tag | Tamanho | Peso | Line-height | Uso |
|---|---|---|---|---|---|
| Display | — | `48px / 3rem` | 700 | 1.1 | Títulos de hero |
| H1 | `h1` | `36px / 2.25rem` | 700 | 1.2 | Títulos de página |
| H2 | `h2` | `28px / 1.75rem` | 600 | 1.3 | Seções principais |
| H3 | `h3` | `22px / 1.375rem` | 600 | 1.4 | Subseções |
| H4 | `h4` | `18px / 1.125rem` | 600 | 1.4 | Sub-subseções |
| Body Large | `p` | `18px / 1.125rem` | 400 | 1.7 | Texto principal |
| Body | `p` | `16px / 1rem` | 400 | 1.6 | Texto padrão |
| Body Small | `p` | `14px / 0.875rem` | 400 | 1.5 | Metadados, labels |
| Caption | `span` | `12px / 0.75rem` | 400 | 1.4 | Legendas, tooltips |
| Code | `code` | `14px / 0.875rem` | 400 | 1.5 | Inline e blocos de código |

### 1.3 Espaçamento

Sistema base 4px. Escala usada consistentemente:

| Token | Valor | Uso típico |
|---|---|---|
| `space-1` | `4px` | Micro-gaps internos |
| `space-2` | `8px` | Gap entre ícone e texto |
| `space-3` | `12px` | Padding de chips e badges |
| `space-4` | `16px` | Padding interno de cards |
| `space-5` | `20px` | Gap entre elementos de formulário |
| `space-6` | `24px` | Padding de seções |
| `space-8` | `32px` | Espaçamento entre blocos |
| `space-10` | `40px` | Margem de seções grandes |
| `space-12` | `48px` | Padding de páginas (mobile) |
| `space-16` | `64px` | Padding de páginas (desktop) |

### 1.4 Border Radius

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | `4px` | Badges, chips pequenos |
| `radius-md` | `8px` | Inputs, botões |
| `radius-lg` | `12px` | Cards, modais |
| `radius-xl` | `16px` | Prompt area, containers grandes |
| `radius-full` | `9999px` | Pills, avatares |

### 1.5 Sombras

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
--shadow-md: 0 4px 12px rgba(0,0,0,0.12);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.16);
--shadow-brand: 0 0 0 3px rgba(0,102,255,0.2); /* focus ring */
```

---

## 2. Scroll Sem Scrollbar — Implementação Completa

### 2.1 CSS Global

Aplique no `globals.css`, antes de qualquer classe Tailwind:

```css
/* Remover scrollbar em todos os navegadores */
* {
  scrollbar-width: none;          /* Firefox */
  -ms-overflow-style: none;       /* IE 11 */
}

*::-webkit-scrollbar {
  display: none;                  /* Chrome, Safari, Edge */
}

/* Scroll suave global */
html {
  scroll-behavior: smooth;
}
```

### 2.2 Aplicar por Área Específica

O `overflow: hidden` bloqueia o scroll — use `overflow: auto` ou `overflow-y: auto` para manter a rolagem funcional mas invisível:

```css
/* Layout raiz */
html, body {
  height: 100%;
  overflow: hidden;              /* previne scroll no body */
}

/* Sidebar — scroll interno invisível */
.sidebar {
  height: 100vh;
  overflow-y: auto;
  /* scrollbar-width: none já herdado do * */
}

/* Content area — scroll principal da página */
.content-area {
  height: 100vh;
  overflow-y: auto;
}
```

### 2.3 Em Tailwind

Use as classes utilitárias equivalentes em cada componente:

```tsx
{/* Sidebar */}
<aside className="h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

{/* Content area */}
<main className="h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
```

Com Tailwind 4.0, a forma mais limpa é declarar o utilitário uma vez no `globals.css`:

```css
@utility no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
}
```

Depois use `className="no-scrollbar"` em qualquer elemento.

---

## 3. Tokens Tailwind 4.0 — CSS Variables com `@theme`

Em `globals.css`, declare todos os tokens dentro do bloco `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Cores */
  --color-brand: #0066FF;
  --color-brand-dark: #0052CC;
  --color-brand-light: #3385FF;
  --color-brand-faint: #EBF2FF;

  --color-gray-900: #111111;
  --color-gray-800: #1C1C1E;
  --color-gray-600: #6B7280;
  --color-gray-400: #9CA3AF;
  --color-gray-200: #E5E7EB;
  --color-gray-100: #F3F4F6;

  --color-error: #EF4444;
  --color-success: #10B981;

  /* Tipografia */
  --font-sans: "Inter", system-ui, sans-serif;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

Com isso, `bg-brand`, `text-brand-dark`, `font-sans`, `rounded-lg` funcionam diretamente.

---

## 4. Gradient Animation — Keyframes CSS

### 4.1 CSS Completo

```css
@keyframes gradientLoop {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-bg {
  background: linear-gradient(
    135deg,
    #0066FF,
    #1a0066,
    #000000,
    #003399,
    #0D0D2B
  );
  background-size: 400% 400%;
  animation: gradientLoop 8s ease infinite;
}
```

### 4.2 Variação com movimento mais sutil

Para um efeito mais premium (recomendado para produção):

```css
@keyframes gradientShift {
  0%   { background-position: 0% 0%; }
  25%  { background-position: 100% 0%; }
  50%  { background-position: 100% 100%; }
  75%  { background-position: 0% 100%; }
  100% { background-position: 0% 0%; }
}

.gradient-bg-premium {
  background: linear-gradient(
    135deg,
    #0066FF 0%,
    #1a0066 30%,
    #000000 60%,
    #003399 85%,
    #0D0D2B 100%
  );
  background-size: 300% 300%;
  animation: gradientShift 12s ease infinite;
}
```

### 4.3 Como usar em JSX (Tailwind via style prop)

```tsx
// components/GradientPanel.tsx
export function GradientPanel() {
  return (
    <div
      className="w-full h-full"
      style={{
        background: "linear-gradient(135deg, #0066FF, #1a0066, #000000, #003399, #0D0D2B)",
        backgroundSize: "400% 400%",
        animation: "gradientLoop 8s ease infinite",
      }}
    />
  );
}
```

Declare o `@keyframes` em `globals.css` — não pode ser inline via style.

---

## 5. Página de Login (`/auth/login`)

### 5.1 Layout

Split 50/50 em desktop, formulário full-width em mobile.

```
┌──────────────────┬──────────────────┐
│                  │                  │
│  Painel esquerdo │  Painel direito  │
│  (formulário)    │  (gradient anim) │
│                  │                  │
└──────────────────┴──────────────────┘
         ↑ esconde em mobile
```

**Topbar global** aparece acima do split, com `Apps` no canto direito.

### 5.2 Estrutura JSX

```tsx
// app/auth/login/page.tsx
export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Topbar */}
      <Topbar />

      {/* Split principal */}
      <div className="flex flex-1 overflow-hidden">

        {/* Painel esquerdo — formulário */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          {/* Logo */}
          <div className="mb-10">
            <img src="/logo.svg" alt="Oversize" className="h-8" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            Acesse o Brand System da Oversize
          </p>

          {/* Formulário */}
          <form className="space-y-5">
            <InputField label="Email" type="email" placeholder="seu@email.com" />
            <InputField label="Senha" type="password" placeholder="••••••••" />

            <button type="submit" className="btn-primary w-full">
              Entrar
            </button>
          </form>

          {/* Link auxiliar */}
          <p className="mt-4 text-sm text-center text-gray-500">
            <a href="#" className="text-brand hover:text-brand-dark transition-colors">
              Esqueceu sua senha?
            </a>
          </p>
        </div>

        {/* Painel direito — gradient (oculto em mobile) */}
        <div className="hidden md:block w-1/2">
          <GradientPanel />
        </div>

      </div>
    </div>
  );
}
```

### 5.3 Estados dos Inputs

```tsx
// components/InputField.tsx
interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
}

export function InputField({ label, type, placeholder, error }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-800">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-md border text-sm
          transition-all duration-150 outline-none
          ${error
            ? "border-error focus:ring-2 focus:ring-error/20"
            : "border-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/20"
          }
          placeholder:text-gray-400
          bg-white
        `}
      />
      {error && (
        <span className="text-xs text-error">{error}</span>
      )}
    </div>
  );
}
```

**Estados visuais:**

| Estado | Borda | Ring | Fundo |
|---|---|---|---|
| Default | `#E5E7EB` | — | `#FFFFFF` |
| Hover | `#9CA3AF` | — | `#FFFFFF` |
| Focus | `#0066FF` | `rgba(0,102,255,0.2)` | `#FFFFFF` |
| Erro | `#EF4444` | `rgba(239,68,68,0.2)` | `#FFFFFF` |
| Desabilitado | `#E5E7EB` | — | `#F3F4F6` |

### 5.4 Responsividade do Login

| Breakpoint | Painel esquerdo | Painel direito |
|---|---|---|
| `375px` (mobile) | `w-full`, padding `px-6` | `hidden` |
| `768px` (tablet) | `w-1/2`, padding `px-8` | `w-1/2`, visível |
| `1024px`+ (desktop) | `w-1/2`, padding `px-16` | `w-1/2`, visível |

---

## 6. Componentes Globais

### 6.1 Topbar

Presente nas três páginas. Altura fixa de `48px`.

```tsx
// components/Topbar.tsx
export function Topbar() {
  return (
    <header className="h-12 border-b border-gray-200 flex items-center justify-end px-5 shrink-0 bg-white z-10">
      <AppsButton />
    </header>
  );
}
```

### 6.2 Apps Button (ícone grade 3x3)

```tsx
// components/AppsButton.tsx
export function AppsButton() {
  return (
    <button
      className="p-2 rounded-md hover:bg-gray-100 transition-colors"
      aria-label="Apps"
    >
      {/* Grid 3x3 via SVG */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1"  y="1"  width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="7"  y="1"  width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="13" y="1"  width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="1"  y="7"  width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="7"  y="7"  width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="13" y="7"  width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="1"  y="13" width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="7"  y="13" width="4" height="4" rx="1" fill="#6B7280" />
        <rect x="13" y="13" width="4" height="4" rx="1" fill="#6B7280" />
      </svg>
    </button>
  );
}
```

### 6.3 Botão Primário

```tsx
// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({ children, variant = "primary", className = "", type = "button", onClick }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-md text-sm transition-all duration-150 px-5 py-3 outline-none";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark active:scale-[0.98] focus:ring-2 focus:ring-brand/30",
    ghost: "text-brand hover:bg-brand-faint active:bg-brand-faint/80",
    outline: "border border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
```

### 6.4 Sidebar

Largura fixa `280px` em desktop. Oculta em mobile com transição.

```tsx
// components/Sidebar.tsx
interface SidebarProps {
  navigation: NavItem[];
  currentPath: string;
}

export function Sidebar({ navigation, currentPath }: SidebarProps) {
  return (
    <aside className="
      hidden md:flex flex-col
      w-[280px] shrink-0
      h-screen border-r border-gray-200
      bg-white
      no-scrollbar overflow-y-auto
    ">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <img src="/logo.svg" alt="Oversize" className="h-7" />
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => (
          <NavItem key={item.href} item={item} currentPath={currentPath} />
        ))}
      </nav>

      {/* Perfil / footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm text-gray-600">
          <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-xs font-medium">
            C
          </div>
          <span>Christian Mendes</span>
        </button>
      </div>
    </aside>
  );
}
```

### 6.5 Nav Item (sidebar)

```tsx
// components/NavItem.tsx
interface NavItemProps {
  item: { label: string; href: string; children?: NavItem[] };
  currentPath: string;
}

export function NavItem({ item, currentPath }: NavItemProps) {
  const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/");

  return (
    <a
      href={item.href}
      className={`
        flex items-center px-3 py-2 rounded-md text-sm font-medium
        transition-all duration-150
        ${isActive
          ? "bg-brand-faint text-brand border-l-2 border-brand pl-[10px]"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      {item.label}
    </a>
  );
}
```

**Estados visuais do nav item:**

| Estado | Background | Texto | Borda esquerda |
|---|---|---|---|
| Default | transparente | `#6B7280` | — |
| Hover | `#F3F4F6` | `#111111` | — |
| Ativo | `#EBF2FF` | `#0066FF` | `2px solid #0066FF` |

---

## 7. Página Inicial / Home (`/`)

### 7.1 Layout

```
┌─────────────────────────────────────────────────────┐
│  Topbar                                  [Apps]     │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   Sidebar    │        Content area                  │
│   (280px)    │   (prompt area + chips)              │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

### 7.2 Estrutura JSX

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar navigation={navigation} currentPath="/" />
        <main className="flex-1 h-full no-scrollbar overflow-y-auto flex items-center justify-center px-6 py-10">
          <HomePromptArea />
        </main>
      </div>
    </div>
  );
}
```

### 7.3 Prompt Area

Caixa central com ícone de edição, placeholder e chips de sugestão abaixo.

```tsx
// components/HomePromptArea.tsx
"use client";
import { useState } from "react";

const SUGGESTIONS = [
  "Como usamos o azul na comunicação?",
  "Qual é o tom de voz ideal?",
  "Me explique a Estratégia Estruturada",
];

export function HomePromptArea() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-[640px] flex flex-col gap-4">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
        O que você quer saber sobre a Oversize?
      </h1>

      {/* Caixa de prompt */}
      <div className={`
        relative flex items-start gap-3
        border-2 rounded-xl px-4 py-4
        transition-all duration-150
        ${value.length > 0
          ? "border-brand shadow-brand"
          : "border-gray-200 hover:border-gray-300"
        }
        bg-white
      `}>
        {/* Ícone de lápis */}
        <svg
          className="w-5 h-5 mt-0.5 text-gray-400 shrink-0"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Pergunte qualquer coisa sobre a marca..."
          rows={3}
          className="
            flex-1 resize-none outline-none text-sm text-gray-900
            placeholder:text-gray-400 bg-transparent
          "
        />
      </div>

      {/* Chips de sugestão */}
      <div className="flex flex-wrap gap-2 justify-center">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setValue(suggestion)}
            className="
              px-4 py-2 rounded-full text-sm border border-gray-200
              text-gray-600 bg-gray-50
              hover:bg-brand-faint hover:border-brand hover:text-brand
              active:scale-[0.97]
              transition-all duration-150
            "
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Nota de MVP */}
      <p className="text-xs text-center text-gray-400 mt-2">
        Integração com IA em breve — por enquanto, navegue pelas diretrizes.
      </p>
    </div>
  );
}
```

### 7.4 Especificação da Prompt Area

| Propriedade | Valor |
|---|---|
| Largura máxima | `640px` |
| Border radius | `12px` (rounded-xl) |
| Border default | `2px solid #E5E7EB` |
| Border hover | `2px solid #9CA3AF` |
| Border focus/typing | `2px solid #0066FF` |
| Ring focus | `rgba(0,102,255,0.2)` |
| Padding interno | `16px` horizontal, `16px` vertical |
| Textarea rows | `3` linhas (expandível) |
| Ícone | Pencil/Edit (24px, cor `#9CA3AF`) |

### 7.5 Chips de Sugestão

| Propriedade | Valor |
|---|---|
| Border radius | `9999px` (pill) |
| Border | `1px solid #E5E7EB` |
| Background default | `#F3F4F6` |
| Texto default | `#6B7280` |
| Border hover | `#0066FF` |
| Background hover | `#EBF2FF` |
| Texto hover | `#0066FF` |
| Transição | `all 150ms ease` |
| Click scale | `scale(0.97)` |

---

## 8. Página de Diretrizes (`/docs/[...slug]`)

### 8.1 Layout Geral

```
┌─────────────────────────────────────────────────────┐
│  Topbar                                  [Apps]     │
├──────────────┬──────────────────────────────────────┤
│              │  Breadcrumb                          │
│   Sidebar    │  ──────────────────────────────────  │
│   (280px)    │  H1 Título                          │
│   fixa       │                                      │
│   sem scroll │  Conteúdo MDX (scroll invisível)    │
│   visível    │                                      │
│              │  ──────────────────────────────────  │
│              │  ← Anterior     Próximo →           │
└──────────────┴──────────────────────────────────────┘
```

### 8.2 Estrutura JSX

```tsx
// app/docs/layout.tsx
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar navigation={docsNavigation} currentPath={/* pathname */} />
        <main className="flex-1 no-scrollbar overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

```tsx
// app/docs/[...slug]/page.tsx
export default async function DocsPage({ params }: { params: { slug: string[] } }) {
  const { content, frontmatter } = await getMdxContent(params.slug);

  return (
    <article className="max-w-[720px] mx-auto px-6 md:px-10 py-10">
      {/* Breadcrumb */}
      <Breadcrumb items={frontmatter.breadcrumb} />

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-8">
        {frontmatter.title}
      </h1>

      {/* Conteúdo MDX */}
      <div className="prose-oversize">
        <MDXContent content={content} />
      </div>

      {/* Navegação prev/next */}
      <DocNavigation prev={frontmatter.prev} next={frontmatter.next} />
    </article>
  );
}
```

### 8.3 Largura e Padding do Content Area

| Propriedade | Valor |
|---|---|
| Largura máxima do artigo | `720px` |
| Margin horizontal | `auto` (centralizado) |
| Padding horizontal (mobile) | `24px` |
| Padding horizontal (desktop) | `40px` |
| Padding vertical | `40px` |

### 8.4 Tipografia MDX — Prose Oversize

Define o estilo de todos os elementos gerados pelo MDX. Declare como CSS customizado ou via plugin `@tailwindcss/typography` com override:

```css
/* styles/prose.css ou dentro de globals.css */

.prose-oversize {
  color: #111111;
  font-size: 1rem;
  line-height: 1.7;
}

.prose-oversize h1 { font-size: 2.25rem; font-weight: 700; margin-top: 0; margin-bottom: 1rem; }
.prose-oversize h2 { font-size: 1.75rem; font-weight: 600; margin-top: 2.5rem; margin-bottom: 0.75rem; }
.prose-oversize h3 { font-size: 1.375rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.5rem; }
.prose-oversize h4 { font-size: 1.125rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; }

.prose-oversize p  { margin-top: 0; margin-bottom: 1rem; }

.prose-oversize a  { color: #0066FF; text-decoration: underline; }
.prose-oversize a:hover { color: #0052CC; }

.prose-oversize ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
.prose-oversize ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
.prose-oversize li { margin-bottom: 0.25rem; }

.prose-oversize blockquote {
  border-left: 3px solid #0066FF;
  padding-left: 1rem;
  color: #6B7280;
  font-style: italic;
  margin: 1.5rem 0;
}

.prose-oversize code {
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.875rem;
  background: #F3F4F6;
  color: #111111;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.prose-oversize pre {
  background: #111111;
  color: #F3F4F6;
  padding: 1.25rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  scrollbar-width: none;
}
.prose-oversize pre::-webkit-scrollbar { display: none; }

.prose-oversize table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.875rem;
}
.prose-oversize th {
  text-align: left;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid #E5E7EB;
  font-weight: 600;
  color: #111111;
}
.prose-oversize td {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #E5E7EB;
  color: #374151;
}
.prose-oversize tr:last-child td { border-bottom: none; }

.prose-oversize hr {
  border: none;
  border-top: 1px solid #E5E7EB;
  margin: 2.5rem 0;
}
```

### 8.5 Breadcrumb

```tsx
// components/Breadcrumb.tsx
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.href ? (
            <a href={item.href} className="hover:text-brand transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && (
            <span className="text-gray-300">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

### 8.6 Navegação Prev/Next

```tsx
// components/DocNavigation.tsx
export function DocNavigation({ prev, next }: { prev?: DocLink; next?: DocLink }) {
  return (
    <div className="flex items-center justify-between mt-16 pt-8 border-t border-gray-200">
      {prev ? (
        <a href={prev.href} className="flex flex-col gap-1 text-sm group">
          <span className="text-gray-400 text-xs">Anterior</span>
          <span className="text-brand group-hover:text-brand-dark font-medium transition-colors">
            ← {prev.label}
          </span>
        </a>
      ) : <div />}

      {next ? (
        <a href={next.href} className="flex flex-col gap-1 text-sm text-right group">
          <span className="text-gray-400 text-xs">Próximo</span>
          <span className="text-brand group-hover:text-brand-dark font-medium transition-colors">
            {next.label} →
          </span>
        </a>
      ) : <div />}
    </div>
  );
}
```

---

## 9. Responsividade

### 9.1 Breakpoints

| Nome | Valor | Tailwind |
|---|---|---|
| Mobile | `375px` | default (sem prefixo) |
| Tablet | `768px` | `md:` |
| Desktop | `1024px` | `lg:` |
| Wide | `1280px` | `xl:` |

### 9.2 Comportamento por Página

**Login:**
- Mobile: painel esquerdo ocupa `100%`, painel direito com gradiente `hidden`
- Tablet+: split 50/50 (`md:w-1/2`)
- Padding horizontal: `px-6` mobile → `px-16` desktop

**Home:**
- Mobile: sidebar oculta (`hidden md:flex`), burger menu no topbar
- Desktop: sidebar fixa `280px`, content area `flex-1`
- Prompt area: `max-w-[640px]`, centralizada com `mx-auto`

**Diretrizes:**
- Mobile: sidebar oculta, ativada por drawer/menu
- Desktop: sidebar fixa `280px`, content area max `720px` centralizada

### 9.3 Sidebar Mobile (Drawer)

Em mobile, a sidebar vira um drawer lateral ativado por botão no topbar:

```tsx
// Adicionar ao Topbar em mobile:
<button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={toggleSidebar}>
  {/* Hamburguer icon */}
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
</button>
```

```tsx
// Sidebar com overlay mobile
<>
  {/* Overlay */}
  {isOpen && (
    <div
      className="fixed inset-0 bg-black/30 z-40 md:hidden"
      onClick={() => setIsOpen(false)}
    />
  )}

  {/* Sidebar */}
  <aside className={`
    fixed left-0 top-0 bottom-0 z-50 md:relative md:z-auto
    w-[280px] bg-white
    transform transition-transform duration-200
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:flex
    flex flex-col
    border-r border-gray-200
    no-scrollbar overflow-y-auto
  `}>
    {/* conteúdo da sidebar */}
  </aside>
</>
```

---

## 10. Micro-interações

### 10.1 Hover nos Nav Items

```css
/* Transição suave de background e cor */
.nav-item {
  transition: background-color 150ms ease, color 150ms ease;
}
```

### 10.2 Focus nos Inputs

```css
input:focus, textarea:focus {
  outline: none;
  border-color: #0066FF;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.2);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
```

### 10.3 Botão Primário

```css
.btn-primary {
  transition: background-color 150ms ease, transform 80ms ease;
}
.btn-primary:active {
  transform: scale(0.98);
}
```

### 10.4 Chip de Sugestão ao Clicar

```css
.suggestion-chip {
  transition: all 150ms ease;
}
.suggestion-chip:active {
  transform: scale(0.97);
  background-color: #EBF2FF;
}
```

### 10.5 Links na Sidebar

```css
/* Borda esquerda aparece com slide-in sutil */
.nav-item.active {
  border-left: 2px solid #0066FF;
  padding-left: calc(0.75rem - 2px); /* compensa o border para não deslocar texto */
  transition: border-left 120ms ease;
}
```

### 10.6 Transição de Página (Next.js App Router)

Com App Router, as transições entre páginas são instantâneas por padrão. Para adicionar fade suave:

```css
/* globals.css */
@keyframes pageFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

main {
  animation: pageFadeIn 200ms ease forwards;
}
```

---

## 11. Estrutura de Arquivos — Resumo

```
src/
├── app/
│   ├── globals.css           ← @theme tokens, no-scrollbar, gradient animation, prose-oversize
│   ├── layout.tsx            ← RootLayout com Inter + topbar
│   ├── page.tsx              ← Home (prompt area)
│   ├── auth/
│   │   └── login/page.tsx   ← Login (split layout)
│   └── docs/
│       ├── layout.tsx        ← DocsLayout (sidebar + content scroll)
│       └── [...slug]/
│           └── page.tsx      ← Página dinâmica MDX
│
├── components/
│   ├── Topbar.tsx
│   ├── AppsButton.tsx
│   ├── Sidebar.tsx
│   ├── NavItem.tsx
│   ├── Button.tsx
│   ├── InputField.tsx
│   ├── GradientPanel.tsx
│   ├── HomePromptArea.tsx
│   ├── Breadcrumb.tsx
│   ├── DocNavigation.tsx
│   └── MDXRenderer.tsx
│
└── lib/
    ├── mdx.ts
    ├── navigation.ts
    └── types.ts
```

---

## 12. Checklist de Implementação

- [ ] Declarar `@theme` tokens no `globals.css`
- [ ] Aplicar `no-scrollbar` globalmente e nas áreas de scroll
- [ ] Declarar `@keyframes gradientLoop` no `globals.css`
- [ ] Implementar `GradientPanel` com a animação
- [ ] Implementar `Topbar` com `AppsButton`
- [ ] Implementar `Sidebar` com drawer mobile
- [ ] Implementar `NavItem` com estado ativo (borda esquerda azul)
- [ ] Implementar `InputField` com todos os estados
- [ ] Implementar `Button` primário com active scale
- [ ] Implementar `HomePromptArea` com chips de sugestão
- [ ] Implementar layout Login (split 50/50)
- [ ] Implementar layout Docs (sidebar + content scroll)
- [ ] Aplicar `.prose-oversize` no container MDX
- [ ] Validar responsividade em 375px, 768px e 1024px
- [ ] Validar scroll invisível em todos os navegadores
