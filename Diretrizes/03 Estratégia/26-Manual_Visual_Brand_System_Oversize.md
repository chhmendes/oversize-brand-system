# Manual Visual — Brand System Oversize 2026

## Versão 1.0

**Marca:** Oversize  
**Versão do sistema:** 1.0.0  
**Última atualização:** 2026

---

## 1. Introdução

Este documento é a **bíblia visual da Oversize**.

Ele consolida todas as decisões de identidade — logo, cores, tipografia, grafismos, direção de imagem — em um único lugar, com regras claras para quem vai implementar a marca.

### Filosofia do sistema

> **Flat, graphic, poster-bold. Three colors. One red per screen. Big lowercase type.**

A Oversize não é uma marca "bonita". É uma marca **clara**.

A clareza é o princípio que organiza cada decisão visual.

---

## 2. Logotipo

### Sistema

- **Wordmark puro.** Sem símbolo adicional.
- **Tipografia:** Sansa Pro Black (900)
- **Composição:** "over" em vermelho + "size" em grafite, empilhados, alinhados à esquerda

### Variantes (uso oficial)

| Variante | Fundo | Logo |
|---|---|---|
| Original | Branco | over=vermelho, size=grafite |
| Red on Gray | Ash (#D9D9D9) | over=vermelho, size=grafite |
| Gray on Light | Ash-soft | Monocromático grafite |
| Gray on Dark | Graphite (#3C3C3C) | Ash |
| Gray on Red | Red (#B51F3A) | Ash |

### Regras críticas

- Tamanho mínimo: 80px (digital) / 20mm (impresso)
- Área de proteção: altura do "o" em cada lado
- Nunca abaixo de 80px usar o wordmark — usar apenas inicial "o"
- Sem gradiente, sem efeito, sem recolorir fora das variantes

---

## 3. Cores

### Core three

| Cor | Token | Hex |
|---|---|---|
| Red | `--ov-red` | `#B51F3A` |
| Graphite | `--ov-graphite` | `#3C3C3C` |
| Ash | `--ov-ash` | `#D9D9D9` |

### Regra principal

**Um vermelho por tela.** O vermelho é o ponto focal. Nunca competir com ele dentro do mesmo frame.

### Proibido

- Gradientes (em qualquer contexto)
- Cores fora da paleta definida como primárias de interface
- Vermelho em texto sobre grafite (contraste insuficiente)

---

## 4. Tipografia

### Sistema

| Família | Papel | Pesos |
|---|---|---|
| Sansa Pro | Display, headings, body, labels | 300, 400, 600, 700, 900 |
| JetBrains Mono | Código, dados, tokens técnicos | 400, 500, 700 |

### Hierarquia essencial

| Nível | Tamanho | Peso | Tracking | Caixa |
|---|---|---|---|---|
| Display XL | 96px | 900 | -0.03em | lowercase |
| H1 | 40px | 700 | -0.01em | sentence |
| H2 | 32px | 700 | -0.01em | sentence |
| Body | 16px | 400 | 0 | sentence |
| Label | 10px | 700 | +0.12em | UPPERCASE |

### Regras críticas

- Display sempre em minúsculas
- CAIXA ALTA apenas em labels de 10px com tracking positivo
- Nunca itálico (Sansa Pro não tem)
- Nunca JetBrains Mono em texto corrido

---

## 5. Grafismos e Superfícies

### Shadow hard (assinatura)

```
--sh-hard:     6px 6px 0 0 #222222
--sh-hard-red: 6px 6px 0 0 #B51F3A
```

### Bordas

2px solid em grafite (`#222222`) ou vermelho (`#B51F3A`). Nunca 1px em elementos principais.

### Radii

Preferência por `--r-0` (0px) e `--r-1` (2px). Cards usam `--r-3` (8px). Nada além de 12px.

### Backgrounds permitidos

Branco · Ash-soft · Ash · Graphite · Graphite-deep · Red

---

## 6. Iconografia

**Biblioteca:** Lucide  
**Estilo:** stroke-only, stroke-width 2  
**Cor:** currentColor (sem ícones coloridos exceto em contexto de status)

---

## 7. Aplicações Corretas

### Fundo branco + texto grafite + botão vermelho
→ A composição base da marca. Limpa, direta.

### Fundo graphite + logo gray-on-dark + botão com sh-hard-red
→ Atmosfera dark. Para hero sections e capas.

### Fundo vermelho + texto ash + logo gray-on-red
→ Momento de máximo impacto. Usar com moderação.

### Card: 2px border graphite + sh-hard + radius 8px
→ O bloco construtivo padrão de conteúdo.

---

## 8. Aplicações Incorretas

| O que não fazer | Por quê |
|---|---|
| Gradiente em qualquer superfície | A marca é flat |
| Dois elementos vermelhos de igual peso na mesma tela | Um vermelho por tela |
| Logo em versão stretched ou comprimida | Nunca distorcer proporções |
| Tipografia de display em caixa alta | A marca usa minúsculas |
| Border 1px em cards e botões | Muito tímido para a postura da marca |
| Radius > 12px em componentes | Vai contra o DNA sharp da marca |
| Foto de banco de imagem genérica | Compromete o sistema visual |
| Ícone filled/preenchido | Apenas stroke |
| Shadow difusa como principal elemento | O shadow da marca é hard (sem blur) |
| Fonte diferente de Sansa Pro no mesmo layout | Uma família para tudo |

---

## 9. Sistema de Tokens (CSS Variables)

Todos os valores do sistema estão disponíveis como variáveis CSS em `globals.css`:

```css
/* Cores */
--ov-red: #B51F3A
--ov-graphite: #3C3C3C
--ov-ash: #D9D9D9

/* Tipografia */
--font-display: 'Sansa Pro', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace

/* Espaçamento */
--sp-1: 4px  /*  ...até  */
--sp-10: 128px

/* Shadows */
--sh-hard: 6px 6px 0 0 #222222
--sh-hard-red: 6px 6px 0 0 #B51F3A
```

---

## 10. Ativos de Marca Proprietários

Os elementos que tornam a Oversize reconhecível sem o logo:

1. **Shadow hard 6px offset** — nenhuma outra marca do segmento usa isso como padrão
2. **Lowercase display em Sansa Pro Black** — DNA do logotipo no corpo da marca
3. **Label 10px uppercase red +0.12em** — tag de seção reconhecível imediatamente
4. **Card 2px border + offset shadow** — o bloco construtivo de todo material
5. **Paleta three-color** — vermelho + grafite + cinza, nada mais

---

## 11. Versão e Evolução

Este sistema é vivo. As versões evoluem:

- **v1.x:** estabilidade. Nenhum novo token de cor, nenhuma nova fonte.
- **v2.0:** revisão maior. Requer processo de brand review.

Toda mudança ao sistema deve ser documentada neste arquivo com data e justificativa.

---

## 12. Síntese

A identidade visual da Oversize é um sistema de clareza.

Não prova criatividade por excesso visual.  
Prova inteligência por organização.

Três cores. Uma família tipográfica. Um shadow de assinatura. Um vermelho por tela.

> "Qualidade não é adicionar mais. É ter certeza de que o que existe é suficiente."
