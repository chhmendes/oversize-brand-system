# PRD — Brand System Web App

| Campo | Valor |
|-------|-------|
| Data | 16 maio 2026 |
| Versão | 1.0 |
| Status | Draft |
| Autor | Christian Mendes |
| Projeto | Oversize Brand System |

---

## 1. Introdução e Contexto

### 1.1 Problema

A Oversize opera com um sistema de marca denso e proprietary: cores, tipografia, tom de voz, metodologia autoral (Estratégia Estruturada em 12 passos), vocabulário específico e princípios de comunicação. Hoje esse material está fragmentado em arquivos Markdown, documentos internos e no brandbook HTML — sem uma interface centralizada, consultável e organizada.

O resultado prático: quem vai criar um conteúdo, onboarding de cliente ou material visual precisa caçar o arquivo certo, abrir HTML bruto ou lembrar de cabeça. A consistência depende de memória, não de sistema.

### 1.2 Solução Proposta

Um Brand System Web App — interface web estática, renderizada a partir de arquivos MDX, que centraliza todas as diretrizes de marca da Oversize em um único lugar navegável, com sidebar hierárquica, tipografia de leitura, responsividade completa e experiência de leitura sem atrito.

Não é um CMS. Não é um wiki colaborativo. É uma referência técnica de marca — como a documentação de um design system, mas aplicada ao brand da Oversize.

### 1.3 Objetivos do Produto

| # | Objetivo | Métrica de Sucesso |
|---|----------|--------------------|
| O1 | Centralizar todas as diretrizes em um lugar | 100% do conteúdo do brandbook acessível via app |
| O2 | Permitir consulta rápida antes de criar | Tempo até encontrar uma diretriz < 30 segundos |
| O3 | Manter consistência de marca no time | Zero inconsistências por "não sabia a regra" |
| O4 | Facilitar onboarding de clientes e partners | Cliente consegue navegar sozinho sem explicação |
| O5 | Estrutura extensível para novo conteúdo | Adicionar nova página MDX em < 5 minutos |

---

## 2. Personas e Casos de Uso

### 2.1 Persona 1 — Christian (Fundador / Admin)

**Perfil:** Cria e mantém todas as diretrizes. Conhece o conteúdo a fundo, mas precisa de um lugar para consolidar e versionar.

**Necessidades:**
- Adicionar e editar diretrizes via MDX sem precisar de developer
- Ver tudo organizado exatamente como planejado
- Compartilhar link específico de seção com time ou cliente

**Casos de uso:**
- Atualiza diretriz de tom de voz após evolução da marca
- Compartilha link da seção "Estratégia Estruturada" com novo cliente
- Verifica como uma cor específica está documentada antes de passar para designer

---

### 2.2 Persona 2 — Time Interno

**Perfil:** Usa o brand system antes de criar qualquer peça — conteúdo, visual, apresentação. Não editam, apenas consultam.

**Necessidades:**
- Encontrar a informação certa sem precisar perguntar
- Ver exemplos práticos, não só teoria
- Navegar com fluidez entre seções relacionadas

**Casos de uso:**
- Designer consulta paleta de cores antes de montar apresentação
- Copywriter checa vocabulário proibido antes de publicar post
- Estrategista revisa os 12 passos da metodologia antes de sessão com cliente

---

### 2.3 Persona 3 — Cliente / Partner

**Perfil:** Acessa após onboarding para entender a metodologia e os princípios da Oversize. Não edita. Pode ter acesso limitado (fase 2).

**Necessidades:**
- Entender a metodologia antes das sessões
- Ter referência para alinhar expectativas
- Navegar de forma independente

**Casos de uso:**
- Cliente novo lê a seção de Metodologia antes da primeira sessão
- Partner revisa princípios de tom de voz para criar conteúdo alinhado
- Cliente acessa seção de Templates para usar formatos aprovados

---

## 3. Features do MVP (Fase 1)

### F01 — Sidebar de Navegação

**Descrição:** Sidebar lateral fixa no desktop (280px), hierárquica, com seções colapsáveis e indicação visual do link ativo. Em mobile, abre como drawer via menu hambúrguer.

**User Stories:**
- Como membro do time, quero ver todas as seções organizadas na sidebar para navegar rapidamente sem perder contexto.
- Como Christian, quero que a seção ativa fique visualmente destacada para saber onde estou no brand system.
- Como usuário mobile, quero abrir e fechar a navegação com um botão para não ocupar espaço de leitura.

**Critérios de Aceitação:**
- [ ] Sidebar exibe hierarquia de 2 níveis (seção > página)
- [ ] Seções colapsáveis com estado persistido no session (não colapsa ao navegar)
- [ ] Link da página atual visualmente destacado (cor primária `#0066FF`, peso bold)
- [ ] Em desktop (≥1024px): sidebar fixa lateral, sempre visível
- [ ] Em tablet (768–1023px): sidebar colapsável, toggled por botão
- [ ] Em mobile (<768px): sidebar como drawer overlay com botão hambúrguer
- [ ] Transição de abertura/fechamento do drawer animada (150ms ease)
- [ ] Clique fora do drawer fecha o menu no mobile
- [ ] Sidebar sem scrollbar visível, mas com scroll funcional quando conteúdo excede viewport

---

### F02 — Content Area com Renderização MDX

**Descrição:** Área principal de conteúdo que renderiza arquivos MDX com tipografia otimizada para leitura. Suporta todos os elementos HTML básicos mais componentes customizados.

**User Stories:**
- Como leitor, quero que o conteúdo seja apresentado com tipografia limpa e confortável para leitura prolongada.
- Como Christian, quero usar componentes customizados dentro do MDX (ex: color swatches, code blocks com syntax highlight) sem sair do formato Markdown.
- Como usuário, quero que tabelas, imagens e blocos de código sejam renderizados corretamente em qualquer dispositivo.

**Elementos Suportados:**
- Headings H1–H4 com hierarquia visual clara
- Parágrafos com line-height confortável (1.7–1.8)
- Listas ordenadas e não-ordenadas
- Tabelas com header destacado e linhas alternadas
- Blocos de código com syntax highlight (Shiki)
- Inline code
- Blockquotes estilizados
- Imagens responsivas com caption
- Negrito, itálico, links internos e externos
- Componentes MDX customizados (ColorSwatch, CalloutBox, StepCard)

**Critérios de Aceitação:**
- [ ] Todos os elementos Markdown padrão renderizam corretamente
- [ ] Syntax highlight funciona para pelo menos: `tsx`, `ts`, `bash`, `json`
- [ ] Imagens são responsivas (max-width: 100%, height: auto)
- [ ] Tabelas têm scroll horizontal em mobile (overflow-x: auto)
- [ ] Links externos abrem em nova aba (`target="_blank"`)
- [ ] Links internos navegam sem refresh de página (Next.js Link)
- [ ] Componentes MDX customizados são registrados e renderizam sem erro
- [ ] Largura máxima da área de texto: 720px centrada (legibilidade)
- [ ] Padding lateral adequado em todas as breakpoints

---

### F03 — Página Inicial / Home

**Descrição:** Primeira página após o login. Apresenta o brand system com uma visão geral, cards de acesso rápido para as seções principais e uma frase de apresentação da Oversize.

**User Stories:**
- Como novo usuário, quero entender rapidamente o que está disponível neste brand system sem precisar explorar a sidebar toda.
- Como usuário frequente, quero acessar as seções mais usadas diretamente da home sem navegar pela sidebar.
- Como Christian, quero que a home transmita a identidade Oversize desde o primeiro segundo.

**Critérios de Aceitação:**
- [ ] Header com logo Oversize e título da seção
- [ ] Frase de apresentação do brand system (estática, via MDX ou hardcoded)
- [ ] Grid de cards com as seções principais (mínimo 4 cards): Identidade, Tom de Voz, Metodologia, Visual
- [ ] Cada card tem: ícone ou emoji, título da seção, breve descrição (1 linha), link para a primeira página da seção
- [ ] Cards respondem a hover com transição suave
- [ ] Layout responsivo: 2 colunas em mobile, 3–4 em desktop
- [ ] Rota: `/` ou `/home`

---

### F04 — Página de Login

**Descrição:** Tela de login com visual polido e identidade Oversize. No MVP, não há autenticação real — o botão "Entrar" navega diretamente para a home. Preparada para integração com Supabase Auth na Fase 2.

**User Stories:**
- Como usuário, quero uma página de entrada que reflita a identidade da Oversize antes de acessar o conteúdo.
- Como Christian, quero que o login seja visualmente impecável mesmo sem autenticação real no MVP.

**Critérios de Aceitação:**
- [ ] Logo Oversize centralizado
- [ ] Campo de e-mail (visual, não funcional no MVP)
- [ ] Campo de senha (visual, não funcional no MVP)
- [ ] Botão "Entrar" que navega para `/home` (sem validação no MVP)
- [ ] Animação de gradiente no background (loop suave, 8–12s)
- [ ] Layout centralizado verticalmente no viewport
- [ ] Responsivo em todas as breakpoints
- [ ] Componente de input estilizado conforme design system (borda `#0066FF` no focus)
- [ ] Rota: `/auth/login`
- [ ] Middleware preparado para redirecionar para login (desativado no MVP)

---

### F05 — Navegação Entre Páginas

**Descrição:** Sistema de navegação contextual: breadcrumbs no topo, links prev/next no rodapé da página, table of contents (TOC) inline no lado direito para páginas longas.

**User Stories:**
- Como leitor, quero saber exatamente onde estou na hierarquia do brand system via breadcrumbs.
- Como leitor de página longa, quero um índice lateral para pular para a seção que me interessa sem fazer scroll manual.
- Como usuário, quero avançar e voltar entre páginas sequenciais com um clique, sem voltar à sidebar.

**Critérios de Aceitação:**
- [ ] Breadcrumbs exibem caminho completo: Home > Seção > Página
- [ ] Cada item do breadcrumb é clicável (exceto o último, que é a página atual)
- [ ] TOC gerado automaticamente a partir dos headings H2 e H3 da página
- [ ] TOC exibido na coluna direita em desktop (≥1280px), oculto em mobile
- [ ] TOC destaca o heading atualmente visível no viewport (scroll spy)
- [ ] Links prev/next no rodapé com título da página anterior e próxima
- [ ] Prev/next respeita a ordem definida em `navigation.json`
- [ ] Prev/next ocultos quando não há página anterior ou próxima

---

### F06 — Scroll Fluido Sem Scrollbar Visível

**Descrição:** Toda a interface deve ter scroll funcional e fluido, mas sem scrollbar visível no layout. Aplica-se ao content area, sidebar e qualquer container com overflow.

**User Stories:**
- Como usuário, quero uma experiência de leitura limpa sem a scrollbar quebrando o visual do layout.

**Critérios de Aceitação:**
- [ ] `scrollbar-width: none` aplicado no Firefox
- [ ] `::-webkit-scrollbar { display: none }` aplicado para Chrome/Safari
- [ ] Scroll funcional em todos os containers que precisam (não bloqueia navegação por teclado)
- [ ] `scroll-behavior: smooth` no documento
- [ ] Ancora internos (TOC, prev/next) fazem scroll suave até o destino
- [ ] Funciona em: Chrome, Safari, Firefox (últimas 2 versões)

---

### F07 — Responsividade

**Descrição:** Layout adapta-se a três breakpoints principais. Todos os componentes têm comportamento definido para cada faixa de tamanho.

**User Stories:**
- Como usuário mobile, quero conseguir consultar o brand system pelo celular com a mesma qualidade de conteúdo que no desktop.
- Como usuário tablet, quero que a interface aproveite o espaço disponível de forma inteligente.

**Breakpoints:**

| Nome | Faixa | Comportamento Principal |
|------|-------|-------------------------|
| Mobile | < 768px | Sidebar como drawer, TOC oculto, cards em 1–2 colunas |
| Tablet | 768–1023px | Sidebar colapsável, TOC oculto, cards em 2 colunas |
| Desktop | ≥ 1024px | Sidebar fixa, TOC visível, cards em 3–4 colunas |
| Wide | ≥ 1280px | TOC como coluna fixa lateral direita |

**Critérios de Aceitação:**
- [ ] Nenhum elemento causa scroll horizontal em qualquer breakpoint
- [ ] Fontes legíveis em mobile (mínimo 16px para body)
- [ ] Touch targets mínimo 44×44px em mobile
- [ ] Imagens não transbordam containers em mobile
- [ ] Tabelas têm scroll horizontal em containers menores que a tabela
- [ ] Testado nos viewports: 375px, 768px, 1024px, 1440px

---

## 4. Features Fora do MVP (Fase 2+)

| Feature | Descrição | Dependência |
|---------|-----------|-------------|
| Autenticação Real | Login com e-mail/senha via Supabase Auth. Proteção de rotas por middleware Next.js. | Supabase projeto criado |
| Storage de Assets | Upload e gestão de assets (logos, ícones, imagens) via Supabase Storage com URLs públicas. | Supabase Auth ativo |
| Busca Full-Text | Campo de busca global que indexa todo o conteúdo MDX e retorna resultados com preview de contexto. | Decisão de solução (Algolia, Fuse.js, etc.) |
| Deploy em Vercel | CI/CD automático a partir da branch main. Preview deployments por PR. | Repositório no GitHub |
| Editor Inline | Interface web para editar conteúdo MDX diretamente no browser, sem precisar abrir arquivos. | Fase 2 completa |
| Controle de Acesso | Roles (admin, viewer) com acesso granular a seções específicas. | Supabase Auth + RLS |
| Versionamento de Diretrizes | Histórico de mudanças por seção com diff visual. | Git + UI customizada |
| Dark Mode | Toggle de tema claro/escuro com preferência persistida. | Design tokens revisados |
| Analytics de Consultas | Quais páginas são mais acessadas, tempo de leitura médio. | Vercel Analytics ou Posthog |

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance

| Métrica | Target | Como Medir |
|---------|--------|------------|
| Build time | < 30s para ≤ 50 páginas MDX | `npm run build` |
| LCP (Largest Contentful Paint) | < 1.5s em conexão 4G | Lighthouse |
| FCP (First Contentful Paint) | < 0.8s | Lighthouse |
| Total Blocking Time | < 200ms | Lighthouse |
| Bundle size (JS inicial) | < 150kb gzipped | `@next/bundle-analyzer` |

**Estratégias:**
- Static Generation para todas as páginas MDX (build-time, zero runtime)
- Nenhuma chamada de API em runtime no MVP
- Imagens com `next/image` (lazy load, WebP automático)
- Fontes com `next/font` (zero layout shift)

### 5.2 Acessibilidade

**Nível mínimo:** WCAG 2.1 AA

| Requisito | Critério |
|-----------|----------|
| Contraste de texto | Mínimo 4.5:1 para texto normal, 3:1 para texto grande |
| Navegação por teclado | Todos os elementos interativos acessíveis via Tab |
| Focus visible | Outline visível em todos os elementos focados |
| Semântica HTML | Uso correto de `nav`, `main`, `article`, `aside`, headings sequenciais |
| Alt text | Todas as imagens com `alt` descritivo (ou `alt=""` para decorativas) |
| ARIA labels | Sidebar, drawer e botões sem texto visível têm `aria-label` |
| Skip link | Link "Pular para o conteúdo" no topo da página |

### 5.3 SEO

- `<title>` único por página (frontmatter `title` + " — Oversize Brand System")
- `<meta name="description">` vindo do frontmatter `description`
- OG tags básicas: `og:title`, `og:description`, `og:type`
- Canonical URLs automáticos via Next.js Metadata API
- Robots: `noindex` em desenvolvimento, `index` em produção (configurável via env)

### 5.4 Manutenibilidade

**Adicionar nova página MDX:**
1. Criar arquivo `content/docs/[secao]/[slug].mdx` com frontmatter
2. Adicionar entrada em `content/navigation.json`
3. Rodar `npm run build` — página disponível

Tempo estimado: < 5 minutos, sem tocar em código TypeScript.

**Frontmatter obrigatório:**
```yaml
---
title: "Título da Página"
description: "Descrição em uma linha para SEO e TOC"
section: "identidade"
order: 2
---
```

**Estrutura de `navigation.json`:**
```json
{
  "sections": [
    {
      "id": "identidade",
      "label": "Identidade",
      "pages": [
        { "slug": "logo", "title": "Logo" },
        { "slug": "cores", "title": "Cores" }
      ]
    }
  ]
}
```

---

## 6. Estrutura de Navegação do Brand System

Hierarquia completa que aparece na sidebar:

```
Brand System
│
├── 1. Identidade
│   ├── 1.1 Logo — variações, uso correto, área de proteção, erros comuns
│   ├── 1.2 Cores — paleta primária, secundária, neutros, gradientes, uso por contexto
│   └── 1.3 Tipografia — Inter scale, hierarquia H1–Caption, peso, espaçamento
│
├── 2. Tom de Voz
│   ├── 2.1 Princípios — o que somos, o que não somos, os 4 pilares de comunicação
│   ├── 2.2 Vocabulário — palavras certas, palavras proibidas, glossário Oversize
│   └── 2.3 Exemplos — antes/depois, headlines aprovadas, padrões de copy
│
├── 3. Metodologia
│   ├── 3.1 Visão Geral — os 4 blocos, os 12 passos, fluxo completo
│   ├── 3.2 Bloco Negócio — Passos 1–3 (ICP, Método Autoral, Resultado Entregável)
│   ├── 3.3 Bloco Valor — Passos 4–6 (Escada de Valor, Core 4, Jornada)
│   ├── 3.4 Bloco Comunicação — Passos 7–9 (Territórios, Roteiros, Sequências)
│   └── 3.5 Bloco Receita — Passos 10–12 (Proposta, Modelo, Projeção)
│
├── 4. Comunicação
│   ├── 4.1 Formatos — tipos de conteúdo aprovados, estrutura de cada formato
│   └── 4.2 Templates — modelos de e-mail, proposta comercial, posts
│
└── 5. Visual
    ├── 5.1 Iconografia — conjunto de ícones, estilo, tamanhos, uso
    ├── 5.2 Fotografia — estilo fotográfico, tratamento, o que evitar
    └── 5.3 Layout — grid, espaçamento, composição, exemplos de peças aprovadas
```

**Total MVP:** 5 seções, 15 páginas de conteúdo

---

## 7. User Flows Principais

### 7.1 Flow de Consulta de Diretriz

```
Usuário está criando conteúdo e precisa verificar uma cor
│
├── [1] Abre o Brand System no browser
├── [2] Vê a home com cards de seções
├── [3] Clica no card "Identidade"
├── [4] Página "Identidade > Logo" abre (primeira da seção)
├── [5] Clica em "Cores" na sidebar
├── [6] Página de cores renderiza com swatches e hexcodes
├── [7] Copia o hex code que precisava
└── [8] Volta para o trabalho
```

Tempo estimado: < 45 segundos

---

### 7.2 Flow de Navegação Lateral

```
Usuário está lendo "Tom de Voz > Princípios" e quer ver exemplos
│
├── [Opção A — Sidebar]
│   ├── [1] Vê "Exemplos" na sidebar, na seção Tom de Voz
│   ├── [2] Clica
│   └── [3] Página abre
│
├── [Opção B — Next Link]
│   ├── [1] Termina de ler Princípios
│   ├── [2] Clica "Próxima: Vocabulário" no rodapé
│   ├── [3] Lê Vocabulário
│   ├── [4] Clica "Próxima: Exemplos"
│   └── [5] Chega nos exemplos
│
└── [Opção C — TOC]
    ├── [1] Na página de Exemplos, vê TOC lateral com âncoras
    ├── [2] Clica na seção que interessa
    └── [3] Scroll suave até o heading
```

---

### 7.3 Flow de Login (MVP Visual)

```
Usuário acessa a URL do brand system
│
├── [1] Rota `/` ou qualquer rota protegida
├── [2] (MVP) Não há redirect real — vai direto para home
│   └── [Fase 2] Middleware detecta ausência de sessão → redirect para `/auth/login`
├── [3] Página de login renderiza com gradiente e logo
├── [4] Usuário digita e-mail e senha (campos visuais no MVP)
├── [5] Clica "Entrar"
├── [6] (MVP) Navega para `/home` sem validação
│   └── [Fase 2] Supabase Auth valida → cria sessão → redirect para `/home`
└── [7] Home do brand system carrega
```

---

## 8. Critérios de Aceitação do MVP

O MVP está completo quando **todos os itens abaixo** estão verificados:

### Interface e Navegação
- [ ] Sidebar renderiza com todas as 5 seções e 15 páginas da estrutura definida
- [ ] Link ativo destacado visualmente ao navegar
- [ ] Sidebar colapsável em mobile funciona com drawer animado
- [ ] Breadcrumbs corretos em todas as páginas
- [ ] Links prev/next funcionam na sequência correta
- [ ] TOC aparece em desktop para páginas com ≥ 3 headings H2/H3

### Conteúdo
- [ ] Pelo menos 1 página de conteúdo real por seção (5 páginas mínimo)
- [ ] Renderização MDX completa sem erros em nenhuma página
- [ ] Imagens carregam corretamente via `next/image`
- [ ] Syntax highlight funciona em blocos de código

### Visual e UX
- [ ] Página de login com visual polido e animação de gradiente
- [ ] Home com cards das seções principais
- [ ] Scroll fluido sem scrollbar visível em Chrome, Safari e Firefox
- [ ] Zero scroll horizontal em qualquer viewport entre 375px e 1440px
- [ ] Fontes carregam via `next/font` sem layout shift

### Performance
- [ ] `npm run build` conclui sem erros ou warnings críticos
- [ ] Lighthouse score ≥ 90 em Performance no desktop
- [ ] Lighthouse score ≥ 80 em Acessibilidade

### Código
- [ ] Zero erros TypeScript (`npm run type-check`)
- [ ] Zero erros de lint (`npm run lint`)
- [ ] Estrutura de pastas conforme spec.md

---

## 9. Dependências e Riscos

### 9.1 Dependências

| Dependência | Tipo | Status | Impacto se Bloqueada |
|-------------|------|--------|----------------------|
| Conteúdo MDX das 15 páginas | Conteúdo | A criar | Sem conteúdo real, apenas estrutura |
| Definição final das cores e tipografia | Design | Documentado no brandbook | Baixo — já existe referência |
| Assets visuais (logo SVG, ícones) | Assets | Existem no brandbook HTML | Médio — precisam ser extraídos |
| Wireframes das 3 páginas | Design | Em `Imagens/` | Baixo — já disponíveis |
| Decisão sobre domínio e deploy | Infra | Pendente | Não bloqueia MVP local |

### 9.2 Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| MDX com componentes customizados complexos causa erro no build | Média | Alto | Começar com MDX padrão; adicionar componentes incrementalmente |
| Conteúdo das 15 páginas não está escrito ainda | Alta | Médio | MVP aceita placeholder content — estrutura > conteúdo no início |
| Tailwind CSS 4.0 tem breaking changes com bibliotecas terceiras | Baixa | Médio | Testar versão no início; fallback para Tailwind 3 se necessário |
| TOC com scroll spy causa rerender excessivo | Baixa | Baixo | Usar Intersection Observer API (nativo, leve) |
| Assets visuais em formatos não-otimizados (PNG pesado, etc.) | Média | Baixo | Converter para WebP; usar `next/image` para otimização automática |

### 9.3 Decisões Pendentes

| # | Decisão | Responsável | Prazo |
|---|---------|-------------|-------|
| D1 | Domínio e URL do brand system em produção | Christian | Fase 2 |
| D2 | Quais seções serão públicas vs. restritas (quando auth real existir) | Christian | Fase 2 |
| D3 | Ferramenta de busca (Algolia, Fuse.js, or outra) | Christian | Fase 2 |
| D4 | Política de acesso para clientes (link individual ou conta?) | Christian | Fase 2 |

---

## Apêndice — Glossário

| Termo | Definição no Contexto deste PRD |
|-------|--------------------------------|
| MDX | Formato de arquivo que combina Markdown com JSX (componentes React) |
| Frontmatter | Metadados YAML no topo de cada arquivo MDX (title, description, etc.) |
| Static Generation | Páginas compiladas em HTML no build-time, sem servidor em runtime |
| TOC | Table of Contents — índice gerado automaticamente dos headings da página |
| Scroll Spy | Técnica que detecta qual seção está visível e destaca no TOC |
| Brand System | Sistema completo de diretrizes de marca: identidade, tom, metodologia, visual |
| Content Area | Área principal de conteúdo, à direita da sidebar |
