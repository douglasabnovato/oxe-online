# MVP — oxe-online

> Revisto em 03/11/2026. Nível: **Estudo (N1)**. Critérios 5 e 7 não se aplicam em N1 e saem da conta. Testado no Windows (Node 24) e no CI (Ubuntu, Node 22). Não houve teste com pessoas nem em aparelho real.

**Finalizado: sim.** Os critérios aplicáveis atendem, exceto o 10, que depende do responsável e tem a issue #10 (`depende-do-responsavel`).

## 1. Critérios: 9 de 10 aplicáveis atendidos (1 parcial)

| # | Critério | Como verificar | Situação | Evidência (03/11/2026) |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende | Quem procura vaga vê oportunidades por empresa, filtra e salva. |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende | Seção 2; sem validação com pessoas (N1). |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende | Vitest e Playwright: busca, empresa, só salvas, link com filtros, candidatar-se. |
| 4 | Escopo enxuto | O que não entra está registrado | Atende | Seção 3. |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1) | Projeto de estudo sem coleta de uso. |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende | Estados "Nenhuma vaga encontrada." e "Nenhuma vaga salva ainda." com "Limpar filtros"; filtro inválido na URL cai em "todas". |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1) | Sem publicação (#11). |
| 8 | Acessibilidade básica | axe e teclado | Atende | Playwright no CI: contorno de 2 px ou mais em todas as tabulações; axe WCAG 2.2 AA sem violações, com e sem filtro (#8). |
| 9 | Segurança e conformidade | Riscos decididos | Atende | `npm audit --omit=dev` sem alertas; a URL guarda só filtros. |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Parcial | CI em PR para `main` e `developer/**`; a `main` segue sem proteção (#10, responsável). |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende | Vitest e Playwright no workflow `CI`. |
| 12 | Documentação honesta | O README ensina a rodar | Atende | Comandos conferidos com o `package.json`; sem link publicado enquanto o Pages não responder. |

## 2. Hipótese (proposta)

Praticar React com TypeScript e MUI: filtrar por empresa, rever as vagas salvas e compartilhar a busca pelo link, sem instruções.

## 3. Fora do MVP

Backend, candidatura e contas; as vagas são dados de exemplo.

## 4. Neste ciclo

Foco visível em duas cores com teste Playwright e axe; "Só salvas"; filtros na URL; CI nos PRs da `developer`. Plano em [`PLANO-DE-ACAO.md`](PLANO-DE-ACAO.md#ciclo-de-03112026).
