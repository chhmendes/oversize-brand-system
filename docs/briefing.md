# BRIEFING — Brand System Web App

Data: 16 maio 2026
Versão: 1.0
Status: ativo

---

## 1. Visão Geral

O **Brand System Web App** é uma interface web para centralizar, organizar e consultar as diretrizes de marca da Oversize em um único lugar.

Não é um PDF de brandbook nem um slide deck compartilhado. É um sistema navegável, sempre acessível, que funciona como fonte de verdade única para qualquer decisão de comunicação, design ou posicionamento relacionada à Oversize.

**Problema que resolve:** As diretrizes da Oversize existem — mas estão espalhadas em documentos, arquivos locais, conversas e memória. Toda vez que alguém precisa saber "qual é o tom de voz?", "qual é o passo 7 da metodologia?" ou "que cor usamos nos botões?", precisa caçar a resposta em vários lugares. Isso gera inconsistência, retrabalho e dependência de Christian para dar a resposta.

**Solução:** Um webapp rápido, responsivo e navegável que responde essas perguntas em menos de 5 segundos.

---

## 2. Contexto e Motivação

A Oversize acumulou um volume considerável de conhecimento estratégico e de marca: brandbook, metodologia estruturada de 12 passos, territórios de conteúdo, ICP definido, tom de voz documentado, formatos de roteiro, etc.

O problema é que esse conhecimento vive fragmentado:

- Parte em arquivos locais (`CLAUDE.md`, `core.md`, `metodo.md`)
- Parte no brandbook HTML (`oversize-brandbook.html`)
- Parte em documentos de Word e PDFs avulsos
- Parte em conversas e memória operacional

Quando um cliente, um partner ou o próprio time precisa de uma referência, não existe um ponto de acesso único. O resultado são inconsistências na comunicação, entregas que fogem do padrão de marca e tempo perdido para dar ou receber orientação.

O Brand System Web App resolve isso criando uma interface estruturada, pesquisável e sempre atualizada — construída sobre arquivos MDX que podem ser editados diretamente, sem depender de ferramentas terceiras ou interfaces de CMS.

---

## 3. Público-alvo

| Perfil | Necessidade principal |
|---|---|
| **Time interno** | Consultar padrões antes de criar qualquer entrega — proposta, post, email, design |
| **Clientes em onboarding** | Entender a filosofia, a metodologia e como a Oversize trabalha |
| **Partners e colaboradores** | Aplicar corretamente a marca em projetos conjuntos |
| **Leads qualificados** | Explorar a profundidade do método antes de tomar decisão de contratar |

O usuário típico abre o sistema para resolver uma dúvida pontual — não para fazer leitura contínua. A interface deve ser otimizada para consulta rápida e navegação direta.

---

## 4. Objetivos Principais

1. **Criar fonte de verdade única** — Todas as decisões de comunicação e marca têm um único lugar de referência. Eliminar a consulta fragmentada em múltiplos arquivos.

2. **Reduzir inconsistência de marca** — Com diretrizes claras e acessíveis, comunicações, designs e propostas seguem o mesmo padrão sem depender de aprovação constante.

3. **Acelerar onboarding** — Novos clientes e parceiros aprendem como a Oversize funciona explorando o sistema de forma autônoma — sem precisar de uma call de 1 hora só para explicar o básico.

4. **Tornar o conhecimento editável e versionável** — Conteúdo em MDX significa que qualquer atualização é feita diretamente em arquivo de texto, pode ser versionada no Git e não depende de interface de CMS.

5. **Preparar base para escala** — Estrutura técnica pronta para receber autenticação real, permissões por perfil e deploy em produção nas fases seguintes.

---

## 5. Escopo do MVP (Fase 1)

O MVP é uma aplicação funcionando localmente, sem autenticação real, com o objetivo de validar a estrutura de navegação, o sistema de renderização MDX e o layout.

### O que entra

| Feature | Descrição |
|---|---|
| **Layout base** | Sidebar fixa (280px desktop) + área de conteúdo fluida + header responsivo |
| **Página inicial** | Landing/home com navegação às seções principais |
| **Página de login** | Visual completo com animação de gradiente — sem autenticação real |
| **Navegação por seções** | Menu lateral com todas as seções do brand system, links ativos, breadcrumbs |
| **Renderização MDX** | Conteúdo das diretrizes compilado em build-time via arquivos `.mdx` |
| **Rotas dinâmicas** | `app/docs/[...slug]/page.tsx` para renderizar qualquer seção por slug |
| **Componentes MDX customizados** | Card, Callout, Quote, ColorSwatch, Timeline — renderizados dentro do MDX |
| **Scroll fluido sem scrollbar** | CSS `::-webkit-scrollbar: none` aplicado globalmente |
| **Design responsivo** | Mobile-first, breakpoints em 320px, 768px e 1024px |
| **Conteúdo inicial** | Pelo menos 3 seções com conteúdo real preenchido |

### O que fica para Fase 2

- Autenticação real (Supabase Auth ou NextAuth)
- Banco de dados (Supabase)
- Permissões por perfil de usuário
- Busca full-text
- Upload e storage de assets
- Analytics
- Deploy no Vercel

---

## 6. Estrutura de Navegação Proposta

O brand system está organizado em 6 seções principais:

```
Brand System
├── Identidade
│   ├── O que é a Oversize
│   ├── Missão e posicionamento
│   └── Inimigo comum
│
├── Tom de Voz
│   ├── Princípios de comunicação
│   ├── Vocabulário autorizado
│   ├── Vocabulário proibido
│   └── Exemplos de escrita
│
├── Metodologia
│   ├── Visão geral (12 passos em 4 blocos)
│   ├── Bloco 1: Negócio (passos 1–3)
│   ├── Bloco 2: Valor (passos 4–6)
│   ├── Bloco 3: Comunicação (passos 7–9)
│   └── Bloco 4: Receita (passos 10–12)
│
├── Visual
│   ├── Paleta de cores (primária, secundária, neutros)
│   ├── Tipografia (Inter scale, tamanhos, pesos)
│   ├── Logo e variações
│   └── Ícones e elementos gráficos
│
├── Conteúdo
│   ├── Territórios de conteúdo
│   ├── Formatos B2B (7 formatos com estrutura)
│   ├── Roteiros base
│   └── Exemplos aprovados
│
└── Recursos
    ├── Templates
    ├── Checklist de marca
    └── Contato e suporte
```

---

## 7. Critérios de Sucesso do MVP

O MVP está pronto quando:

- [ ] Aplicação roda localmente com `npm run dev` sem erros
- [ ] Sidebar navega entre todas as seções sem reload de página
- [ ] Pelo menos 3 seções têm conteúdo MDX real renderizado corretamente
- [ ] Componentes customizados (Card, Callout) renderizam dentro do MDX
- [ ] Página de login exibe o visual com animação de gradiente
- [ ] Layout é responsivo em 375px, 768px e 1280px
- [ ] Scroll fluido sem scrollbar visível em todas as áreas de conteúdo
- [ ] Build de produção (`npm run build`) passa sem erros de TypeScript

---

## 8. Roadmap em Fases

### Fase 1 — MVP Local (agora)

**Objetivo:** Interface funcionando localmente com conteúdo real.

1. Scaffolding do projeto Next.js 15 com TypeScript e Tailwind 4
2. Configurar renderização MDX (mdx-js + @next/mdx)
3. Implementar layout base: Sidebar + Content Area
4. Criar páginas: Login (visual), Inicial (home), Diretrizes (dinâmica)
5. Escrever componentes MDX customizados
6. Preencher 3+ seções com conteúdo real
7. Validar responsividade e scroll

**Entrega:** App rodando em `localhost:3000` com navegação completa.

---

### Fase 2 — Autenticação e Banco de Dados

**Objetivo:** Tornar o sistema acessível com controle de acesso.

1. Integrar Supabase (projeto, tabelas, API keys)
2. Implementar autenticação (email/senha ou magic link)
3. Roles de usuário: `admin`, `client`, `partner`, `public`
4. Controle de visibilidade por seção (algumas seções só para admin)
5. Dashboard de usuários no Supabase

**Entrega:** Sistema com login funcional e acesso controlado por perfil.

---

### Fase 3 — Produção e Escala

**Objetivo:** Deploy estável em produção com observabilidade.

1. Deploy no Vercel com domínio próprio
2. Variáveis de ambiente configuradas por ambiente (dev/prod)
3. Busca full-text (Algolia ou Supabase full-text search)
4. Storage de assets visuais (Supabase Storage ou S3)
5. Analytics básico (Vercel Analytics ou PostHog)
6. Processo de atualização de conteúdo documentado

**Entrega:** Sistema em produção, acessível publicamente ou por convite.

---

## 9. Stack e Decisões Técnicas

| Decisão | Escolha | Motivo |
|---|---|---|
| **Framework** | Next.js 15+ com App Router | Static generation nativa, rotas dinâmicas, Server Components — ideal para conteúdo MDX |
| **Linguagem** | TypeScript | Segurança de tipos, melhor DX em projeto de médio prazo |
| **Estilo** | Tailwind CSS 4.0+ | Utilitário, sem overhead de CSS externo, consistente com a identidade visual |
| **Conteúdo** | MDX com frontmatter | Permite escrever diretrizes como texto simples com componentes React embutidos |
| **Compilação MDX** | `@next/mdx` + `gray-matter` | Compilação em build-time, zero runtime overhead, frontmatter para metadados |
| **Syntax highlight** | Shiki | Suporte amplo a linguagens, temas customizáveis |
| **Autenticação (fase 2)** | Supabase Auth | Integra com o banco que já será usado, menos pacotes externos |
| **Banco de dados (fase 2)** | Supabase (PostgreSQL) | Open source, hosted, fácil de integrar com Next.js |
| **Deploy (fase 3)** | Vercel | Integração nativa com Next.js, preview por branch, edge functions |

### Por que MDX e não um CMS

A escolha de MDX sobre ferramentas como Contentful, Sanity ou Notion API é deliberada:

- Conteúdo vive no repositório, versionado no Git
- Edição direta em qualquer editor de texto ou via Claude Code
- Sem dependência de serviços externos para o conteúdo
- Compilação em build-time = zero latência de carregamento
- Componentes React customizados embutidos no conteúdo

---

## Referências

| Recurso | Caminho |
|---|---|
| Brandbook completo | `oversize-brandbook.html` |
| Tom de voz e identidade | `../04-Ops/ClaudeMD/core.md` |
| Metodologia (12 passos) | `../04-Ops/ClaudeMD/metodo.md` |
| Skill do método | `../Skills/estrategia-estruturada/SKILL.md` |
| Wireframes de UI | `Imagens/` (Login, Inicial, Diretrizes) |
| PRD | `docs/prd.md` |
| Spec técnica | `docs/spec.md` |
| Plano de UI | `docs/ui-plan.md` |
