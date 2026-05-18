# Conjunto Tipográfico

## 1. Decisão Estratégica

A tipografia da Oversize responde a uma pergunta antes de qualquer outra:

> **O que a fonte precisa comunicar antes mesmo de ler a palavra?**

Resposta: **presença sem agressividade, clareza sem frieza, personalidade sem excesso**.

O sistema usa **dois typefaces** com papéis completamente diferentes.

---

## 2. Sansa Pro — A Fonte Principal

**Papel:** display, títulos, corpo de texto, labels — tudo.

Sansa Pro é uma humanist sans-serif com formas arredondadas e terminais suaves. Ela é:

- **forte** sem ser agressiva;
- **geométrica** sem ser fria;
- **legível** em qualquer tamanho;
- **proprietária** — não é uma fonte de sistema, não é Google Font genérica.

O wordmark do logo usa Sansa Pro Black (900). Quando o usuário vê texto da marca em peso 900, ele reconhece o mesmo DNA do logotipo.

### Pesos disponíveis

| Peso | Valor | Uso primário |
|---|---|---|
| Light | 300 | Títulos secondários extensos, subtítulos longos |
| Normal | 400 | Corpo de texto. A fonte que mais aparece. |
| SemiBold | 600 | Labels, subtítulos, UI elements |
| Bold | 700 | Headings H1–H4, botões, ênfase no texto |
| Black | 900 | Display (hero, títulos gigantes), o logo |

> Não existem pesos 500 (medium) e 800 (extrabold) em Sansa Pro. Os tokens `--fw-medium` e `--fw-extrabold` fazem fallback para 400 e 700 respectivamente.

---

## 3. JetBrains Mono — A Fonte Técnica

**Papel:** código, dados, labels técnicos, referências de tokens, tabelas de valores.

Mono não é a voz da marca — é a ferramenta.

Quando aparece, comunica: **aqui existe precisão, aqui existe sistema, aqui estão os números reais**.

O uso deve ser **pontual e intencional**. Se tudo for mono, nada parece técnico. A raridade é o que dá poder à fonte.

---

## 4. Hierarquia e Escala

### Display (impacto, wordmarks de seção)

| Nível | Tamanho | Peso | Tracking | Linha |
|---|---|---|---|---|
| Display XL | 96px | 900 | -0.03em | 1.02 |
| Display L | 72px | 900 | -0.03em | 1.02 |
| Display M | 56px | 700 | -0.03em | 1.12 |

**Caixa:** minúsculas obrigatório. Display da Oversize é sempre lowercase.

### Headings (estrutura de conteúdo)

| Nível | Tamanho | Peso | Tracking | Linha |
|---|---|---|---|---|
| H1 | 40px | 700 | -0.01em | 1.12 |
| H2 | 32px | 700 | -0.01em | 1.12 |
| H3 | 24px | 600 | 0 | 1.12 |
| H4 | 20px | 600 | 0 | 1.35 |

### Body (leitura)

| Nível | Tamanho | Peso | Tracking | Linha |
|---|---|---|---|---|
| Body L | 18px | 400 | 0 | 1.6 |
| Body | 16px | 400 | 0 | 1.6 |
| Body S | 14px | 400 | 0 | 1.35 |
| Caption | 12px | 400 | 0 | 1.35 |

### Labels (utility)

| Nível | Tamanho | Peso | Tracking | Transform |
|---|---|---|---|---|
| Label | 10px | 700 | +0.12em | UPPERCASE |
| Micro | 10px | 400 | +0.04em | sentence |

---

## 5. Regras de Caixa

### Display e logo: minúsculas

Toda tipografia de display e o logotipo são em **caixa baixa**. Isso é não-negociável.

O wordmark "oversize" é minúsculo. Os títulos hero são minúsculos. É a postura da marca: confiança sem precisar gritar.

### Corpo: sentence case

Texto de leitura usa capitalização normal de frase (primeira letra maiúscula, resto minúsculo).

### Labels: MAIÚSCULAS com tracking

A única situação em que a Oversize usa caixa alta é em **labels curtos de seção** (10–12px, espaçamento +0.12em). São os "01 / MARCA", "BRAND", "COLORS" que identificam categorias.

Caixa alta em qualquer outro contexto não é da Oversize.

---

## 6. Justificativa Estratégica

### Por que Sansa Pro e não Inter, Roboto ou DM Sans?

- Inter e DM Sans são excelentes mas estão em todo lugar. A Oversize precisa de tipografia que ninguém mais usa no mesmo contexto.
- Sansa Pro tem **terminais arredondados** que combinam com as formas do logo (o "o" aberto, o "s" suave).
- O peso Black da Sansa tem uma presença particular: chunky mas equilibrado, que é exatamente a postura da marca.

### Por que Sansa Pro para corpo E display?

Usar a mesma família para tudo cria coesão. O leitor não percebe transições de "modo". A marca fala com uma voz.

---

## 7. Uso em Contextos Específicos

### Apresentações

- Título de slide: Display M (56px, Black 900, lowercase)
- Seção: H2 (32px, Bold 700)
- Body: Body (16px, Normal 400)
- Label de pilar: Label (10px, Bold, UPPERCASE, +0.12em tracking)

### Documentos e PDFs

- Título: H1 (40px)
- Subtítulo: H2 (32px)
- Corpo: Body (16-18px, line-height 1.6 para leitura confortável)
- Notas e rodapés: Caption (12px)

### Digital (interface)

- PageTitle: Display M ou H1
- SectionLabel: Label class
- Body text: Body S–Body
- Meta/timestamp: Caption

---

## 8. O Que Evitar

- Itálicos em display (Sansa Pro não tem itálico — não forçar)
- Peso 400 em títulos (fraco para a postura da marca)
- Tracking negativo em body (dificulta leitura)
- CAIXA ALTA em parágrafos (só em labels curtos)
- Misturar Sansa Pro com outra sans de display no mesmo layout
- Usar JetBrains Mono como fonte de texto corrido

---

## 9. Síntese

O sistema tipográfico da Oversize é um **sistema de uma fonte com múltiplos papéis** — e uma fonte técnica que aparece quando o contexto exige precisão.

Sansa Pro Black 900 é o DNA. Tudo parte daí.

> "A tipografia não é decoração. É a primeira camada de comunicação antes de ler uma palavra."
