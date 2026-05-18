import type { NavigationItem } from '@/types/content'

export const navigationConfig: NavigationItem[] = [
  {
    title: 'Estratégia',
    icon: 'estrategia',
    children: [
      { title: 'Auditoria de Mercado', href: '/docs/estrategia/01-auditoria-mercado' },
      { title: 'Auditoria de Público', href: '/docs/estrategia/02-auditoria-publico' },
      { title: 'Auditoria de Negócio', href: '/docs/estrategia/03-auditoria-negocio' },
      { title: 'Benchmarking', href: '/docs/estrategia/04-benchmarking' },
      { title: 'Posicionamento', href: '/docs/estrategia/05-posicionamento' },
      { title: 'Golden Circle', href: '/docs/estrategia/06-golden-circle' },
      { title: 'Plano de Mídia', href: '/docs/estrategia/07-plano-midia' },
      { title: 'Buyer Persona', href: '/docs/estrategia/08-buyer-persona' },
    ],
  },
  {
    title: 'Marca',
    icon: 'marca',
    children: [
      { title: 'Núcleo da Marca', href: '/docs/marca/09-nucleo' },
      { title: 'Roteiro da Marca', href: '/docs/marca/10-roteiro-storybrand' },
      { title: 'Virtudes e Sombras', href: '/docs/marca/11-virtudes-sombras' },
      { title: 'Arquétipos', href: '/docs/marca/12-arquetipos' },
      { title: 'Brand Persona', href: '/docs/marca/13-brand-persona' },
    ],
  },
  {
    title: 'Comunicação',
    icon: 'comunicacao',
    children: [
      { title: 'Tom e Voz', href: '/docs/comunicacao/14-tom-voz' },
      { title: 'Naming', href: '/docs/comunicacao/15-naming' },
      { title: 'Vocabulário da Marca', href: '/docs/comunicacao/16-vocabulario' },
      { title: 'Manifesto', href: '/docs/comunicacao/17-manifesto' },
    ],
  },
  {
    title: 'Identidade',
    icon: 'identidade',
    children: [
      { title: 'Manual Verbal', href: '/docs/identidade/18-manual-verbal' },
      { title: 'Identidade Visual', href: '/docs/identidade/19-manual-visual' },
      { title: 'Moodboard e Conceito', href: '/docs/identidade/20-moodboard' },
      { title: 'Símbolos e Logotipo', href: '/docs/identidade/21-logotipo' },
      { title: 'Paleta de Cores', href: '/docs/identidade/22-paleta-cores' },
      { title: 'Conjunto Tipográfico', href: '/docs/identidade/23-tipografia' },
      { title: 'Grafismos', href: '/docs/identidade/24-grafismos' },
      { title: 'Direção de Imagem', href: '/docs/identidade/25-direcao-imagem' },
      { title: 'Manual Visual', href: '/docs/identidade/26-brand-system' },
      { title: 'Aplicações', href: '/docs/identidade/27-aplicacoes' },
      { title: 'Lançamento', href: '/docs/identidade/28-lancamento' },
    ],
  },
]

export function getNavItemByHref(href: string): NavigationItem | undefined {
  const search = (items: NavigationItem[]): NavigationItem | undefined => {
    for (const item of items) {
      if (item.href === href) return item
      if (item.children) {
        const found = search(item.children)
        if (found) return found
      }
    }
    return undefined
  }
  return search(navigationConfig)
}

export function getAllNavPaths(): string[] {
  const paths: string[] = []
  const collect = (items: NavigationItem[]) => {
    for (const item of items) {
      if (item.href) paths.push(item.href)
      if (item.children) collect(item.children)
    }
  }
  collect(navigationConfig)
  return paths
}
