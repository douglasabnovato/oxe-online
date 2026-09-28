# Análise — Oxe Online

## 1. Especificação

Página de vagas de emprego agrupadas por empresa, feita a partir de um layout do Figma (React + TypeScript + Material UI).

| ID | Requisito | Antes | Depois |
|---|---|---|---|
| RF01 | Ver vagas por empresa | ✅ estático | ✅ gerado por dados |
| RF02 | Buscar vaga por texto | ❌ campo sem efeito | ✅ |
| RF03 | Filtrar por empresa | ❌ select sem efeito (valor inicial inexistente) | ✅ |
| RF04 | Salvar vaga | ❌ botão sem ação | ✅ persistido no navegador |
| RF05 | Candidatar-se | ❌ botão sem ação | ✅ link para o site da empresa |
| RNF | Responsivo | ❌ (pendência no README) | ✅ |

## 2. Defeitos encontrados

| # | Severidade | Defeito | Referência |
|---|---|---|---|
| D1 | Alta | Busca, seleção, Save e Apply não fazem nada | Nielsen #1 |
| D2 | Média | Três blocos de ~90 linhas duplicados (texto "EMPOLOYEES" repetido) | DRY |
| D3 | Média | `px: 25` e larguras em `vw`: quebra em telas pequenas | WCAG 2.2 1.4.10 |
| D4 | Média | Logo dentro de `IconButton` com rótulo "menu" sem ação; inputs com cor #F4552B (contraste 3,2:1) | WCAG 2.2 1.4.3, 4.1.2 |
| D5 | Baixa | Dependências sem uso (styled-components, styled-engine-sc, @fontsource/roboto, web-vitals) | — |

## 3. Baseline automatizado

| Verificação | Antes | Depois |
|---|---|---|
| Testes | 0 | 4 cenários |
| `tsc --noEmit` | ✅ | ✅ |
| `npm audit` | alertas herdados do CRA 5 | 0 |
| axe-core | não medido | 0 violações (desktop e 390 px) |

## Rubrica v2 (grupo front-end)

Aprovação: média ponderada ≥ 7,0 **e** C1 e C4 (eliminatórios) ≥ 5. Regras: nota sem evidência vale no máximo 6; C1 limitado a 7 para parte não executada de ponta a ponta; C9 ≥ 8 só com URL publicada e CI verde.

| # | Critério | Referência | Peso | Antes | Depois | Evidência | Justificativa |
|---|---|---|---|---|---|---|---|
| C1 | Núcleo de valor | MVP (Ries); SWEBOK Requirements | 17% | 3 | 8 | Chromium desktop e 390 px: busca, filtro por empresa, salvar | Busca e seleção não faziam nada (só visual); agora filtram |
| C2 | Estados e condições excepcionais | Nielsen; OWASP A10:2025 | 10% | 1 | 7 | testes: sem resultados + limpar filtros; contador de vagas | Sem estado vazio antes; select iniciava com valor inexistente (EUR) |
| C3 | Acessibilidade | WCAG 2.2 AA (axe-core) | 11% | 4 | 8 | axe-core 0 violações (desktop e mobile) | Botão do logo sem destino, textos em inglês misturados; agora rótulos e pt-BR nas ações |
| C4 | Segurança e privacidade | OWASP Top 10:2025 / ASVS 5.0 N1 | 10% | 6 | 7 | links externos com rel=noopener; sem dados pessoais | Projeto só front; vagas ilustrativas de empresas reais (deixar claro se publicar) |
| C5 | Dados | 3FN / ACID / fonte única | 3% | 3 | 7 | vagas em src/data/jobs.ts (fonte única) | Antes: 3 blocos de 90 linhas copiados |
| C6 | Testes | Pirâmide de testes; SWEBOK Testing | 9% | 0 | 7 | vitest 4 cenários | Não havia testes |
| C7 | Qualidade de código | SOLID / camadas; SWEBOK Construction | 8% | 3 | 8 | componentes gerados por dados; tsc estrito | Removidos styled-components, styled-engine-sc e fontsource sem uso |
| C8 | Desempenho | Complexidade; Core Web Vitals | 7% | 5 | 7 | build Vite; imagens com width/height | Sem Lighthouse |
| C9 | Operação | 12-Factor; DORA | 6% | 3 | 7 | CI em ci/, deploy estático | Sem URL publicada |
| C10 | Documentação | README como contrato | 5% | 4 | 7 | README + docs/ | README original preservado |
| C11 | Produto e evidência | Cagan (4 riscos); Torres | 8% | 4 | 7 | busca e salvar funcionam | Layout do Figma mantido e agora responsivo (pendência do README) |
| C12 | Sustentabilidade técnica | OWASP A03:2025; SWEBOK Maintenance | 6% | 3 | 8 | npm audit 0; MUI 7, Vite 8, TS 5 | CRA 5 descontinuado |

**Média ponderada:** antes **3,21** (REPROVADO) → depois **7,42** (APROVADO).

## Observação

As empresas (Niantic, Instacart, Twitch) e investidores são reais; as vagas são ilustrativas do layout. Se publicar, indique que é um projeto de estudo.
