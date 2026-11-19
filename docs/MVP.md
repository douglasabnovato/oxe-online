# MVP — oxe-online

> Revisto em 16/11/2026. Nível: **Estudo (N1)**. Critérios 5 e 7 não se aplicam em N1 e saem da conta. Testado no Windows (Node 24) e no CI (Ubuntu, Node 22). Não houve teste com pessoas nem em aparelho real.

**Resumo:** 10 de 10 aplicáveis atendidos

**Finalizado:** sim. Todos os critérios aplicáveis atendem. Site no ar desde 16/11/2026: https://douglasabnovato.github.io/oxe-online/. Em 18/11/2026, `curl` no site devolveu 200, com o aviso de estudo no ar.

## 1. Critérios: 10 de 10 aplicáveis atendidos

| # | Critério | Como verificar | Situação | Evidência (comando, data e resultado) |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | README e seção 2: quem procura vaga vê as oportunidades por empresa, filtra e salva. Conferido em 15/11/2026. |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende | Seção 2, com meta e "saberemos quando". Sem validação com pessoas (N1). |
| 3 | Fluxo principal completo | Teste no navegador no CI | Atende | `npx playwright test`, 15/11/2026: 8 passaram. `e2e/fluxo.e2e.ts` busca, salva, recarrega, marca "Só salvas", confere o "Candidatar-se" e remove; `e2e/foco.e2e.ts` cobre os filtros na URL, inclusive `?remoto=1`. Roda no job `raiz` do CI. |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | Seção 3. |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) | Projeto de estudo sem coleta de uso. |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta | Atende | `npm test`, 15/11/2026: 11 passaram, com "Nenhuma vaga encontrada.", "Nenhuma vaga salva ainda." e "Limpar filtros"; filtro inválido na URL cai em "todas". `npx playwright test`, 15/11/2026: sem `localStorage` (modo privado bloqueado) a página abre e salvar segue na sessão. Não há rede nem carregamento: os dados são locais. |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1) | N1. O site está no ar, mas não houve medição de LCP. |
| 8 | Acessibilidade básica | axe e teclado | Atende | `npx playwright test`, 16/11/2026: axe sem violações também com o aviso de estudo, a 375 px e a 1280 px ([run verde do PR #35](https://github.com/douglasabnovato/oxe-online/actions/runs/43884744359)). `npx playwright test`, 15/11/2026: axe WCAG 2.2 AA sem violações em 1280 px e em 375 px (o app não tem tema escuro próprio: só a tela clara existe), com e sem filtro e com "Só salvas"; contorno de 2 px ou mais em todas as tabulações. |
| 9 | Segurança e conformidade | Riscos decididos | Atende | `npm audit --omit=dev`, 16/11/2026: 0 vulnerabilidades. `gh api "repos/douglasabnovato/oxe-online/dependabot/alerts?state=all"`, 16/11/2026 11:17: alertas ligados pelo responsável, lista vazia (0 abertos, 0 no total). Sem segredo no código; a URL guarda só os filtros. |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Atende | `gh api repos/douglasabnovato/oxe-online/rules/branches/main`, 15/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` (ruleset `principal-protegida`). Workflow `CI` roda nos PRs para `main` e `developer/**`. |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende | Job `raiz` do `.github/workflows/ci.yml` roda `npm test` (12 em 16/11/2026) e `npx playwright test` (10 em 16/11/2026), sem testes pulados. [run verde do PR #35](https://github.com/douglasabnovato/oxe-online/actions/runs/43884744359), 16/11/2026. |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto | Atende | Comandos do README conferidos com o `package.json` em 15/11/2026 (`dev`, `test`, `build`, `preview`). Link publicado: `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/oxe-online/` devolveu 200 em 16/11/2026 às 11:17, depois do [CI verde da main 70f7957](https://github.com/douglasabnovato/oxe-online/actions/runs/43882553749). |

## 2. Hipótese

Acreditamos que filtros combináveis (texto, empresa, "Aceita remoto" e "Só salvas"), guardados na URL, deixam a pessoa achar e compartilhar uma vaga sem instruções.
Meta: chegar à lista "vagas remotas da Twitch" em até 3 ações.
Saberemos quando o teste Playwright fizer esse caminho no CI e o link copiado (`?empresa=twitch&remoto=1`) abrir a mesma lista. Em N1, não há validação com pessoas.

## 3. Fora do MVP

Backend, candidatura e contas; as vagas são dados de exemplo. Ordenar por data (#12) é funcionalidade nova e não entra em N1 (fechada como não planejada em 18/11/2026).

## 4. Neste ciclo (15/11/2026)

Teste Playwright do fluxo principal com axe em 1280 px e no celular (sem tema escuro próprio); página sem `localStorage`; filtro "Aceita remoto" (#13); `npm audit fix` nas dependências de desenvolvimento; Dependabot semanal; arquivos sem uso apagados. Plano em [`PLANO-DE-ACAO.md`](PLANO-DE-ACAO.md#ciclo-de-15112026).

## 5. Neste ciclo (16/11/2026)

O responsável ligou o Pages e os alertas do Dependabot e mesclou o #18: o site está no ar. Aviso de projeto de estudo no topo da página (#19), com teste Vitest do texto e Playwright de "visível sem rolar" no celular e no desktop.

## 6. Neste ciclo (18/11/2026)

Manutenção, sem funcionalidade nova. ESLint com `react-hooks` e `jsx-a11y` no CI (`npm run lint`, sem avisos), da #14. MUI 7 → 9 com `@mui/material` e `@mui/icons-material` juntos, da #37 e da #21: lint, 12 testes Vitest, build e 10 testes Playwright verdes em 18/11/2026; `npm audit --omit=dev` com 0 vulnerabilidades. React 19 segue na #21.

## Histórico

- 03/11/2026: 9 de 10 (critério 10 "Parcial" até a proteção da `main`).
- 10/11/2026: 10 de 10, com o ruleset `principal-protegida` (#10).
- 15/11/2026: 9 de 10, com o critério 9 Parcial até os alertas do Dependabot serem ligados (passou a Atende em 16/11/2026, com os alertas ligados).
