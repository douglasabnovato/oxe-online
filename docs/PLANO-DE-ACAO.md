# Plano de ação — Oxe Online

Timebox: 30 min.

| MoSCoW | Item | Ganho | Esforço | Status |
|---|---|---|---|---|
| Must | Busca e filtro funcionando (D1) | Alto | Baixo | ✅ |
| Must | Componentes por dados (D2) | Médio | Baixo | ✅ |
| Should | Responsivo (D3) | Alto | Baixo | ✅ |
| Should | Acessibilidade (D4) | Médio | Baixo | ✅ axe 0 |
| Could | Buscar vagas de uma API real | Alto | Alto | Próximo ciclo |
| Could | Página "Vagas salvas" | Médio | Baixo | Próximo ciclo |

## Ciclo de 03/11/2026

> Branch `feature/2026-11-03` → `developer/sprint-2026-11-05` → `main`. Nível: Estudo (N1), 10 critérios aplicáveis (5 e 7 não se aplicam).

### Produto

**Problema e público.** Quem estuda React com TypeScript e MUI pratica uma lista de vagas que filtra, salva e abre o site da empresa. Quem procura vaga é o público simulado.

**Hipótese e meta.** Uma pessoa acha as vagas salvas e compartilha uma busca filtrada sem instruções. Meta proposta: 2 cliques. Sem validação com pessoas (N1).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Filtros na URL | Quadros de vagas atualizam a barra de endereço a cada filtro, e o link copiado abre a mesma lista. Virou `?q=`, `?empresa=` e `?salvas=1` (#9) | [Recruitee: links dinâmicos de vagas filtradas](https://support.recruitee.com/en/articles/10221505-effortless-job-sharing-dynamic-links-for-filtered-job-pages), [CleverConnect: compartilhar lista de vagas](https://help.cleverconnect.com/en/knowledgebase/share-several-jobs-via-the-job-list-feature) |
| Área de vagas salvas | Salvar e rever vagas sem atrito aumenta o uso. Virou a caixa "Só salvas (n)" com aviso quando a lista está vazia (#9) | [Niceboard: UX para quem procura vaga](https://niceboard.co/learn/marketing/job-seeker-ux-best-practices-job-board), [Bestjobs: lista de vagas salvas](https://support.bestjobs.eu/en/knowledge/where-can-i-find-the-list-of-my-saved-jobs) |
| Filtros do nicho e recência | Filtros como salário, local e data ajudam a achar a vaga. Viraram issues (#12, #13) | [TravelTime: exemplos de busca em portais de vagas](https://traveltime.com/blog/job-portals-top-10-search-ux-examples), [Jobboardly: boas práticas de busca](https://jobboardly.com/blog/best-practices-for-job-search-design) |
| Foco em duas cores | O W3C descreve o indicador em duas cores (técnica C40), que contrasta com fundo claro e escuro. Virou contorno azul com anel branco (#8) | [W3C: Focus Appearance](https://w3c.github.io/wcag/understanding/focus-appearance-enhanced), [W3C ACT: foco visível](https://www.w3.org/wai/standards-guidelines/act/rules/oj04fd) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Foco visível em todas as tabulações, com Playwright | Alto | Baixo | Este ciclo (#8) |
| 2 | CI também nos PRs para a `developer` | Alto | Baixo | Este ciclo |
| 3 | "Só salvas" e filtros na URL | Médio | Baixo | Este ciclo (#9) |
| 4 | Proteger a `main` | Alto | Baixo | Responsável (#10) |
| 5 | Publicar no Pages | Médio | Baixo | Responsável (#11) |
| 6 | Ordenar por data | Médio | Baixo | Issue (#12) |
| 7 | Filtro de remoto | Médio | Baixo | Issue (#13) |
| 8 | ESLint e Dependabot | Médio | Baixo | Issue (#14) |

**Fora do escopo.** Backend, candidatura, contas, vagas reais.

### Engenharia

**Arquitetura.** SPA React 18 + MUI 7 com Vite 8. Dados locais em `src/data/jobs.ts`. Filtro puro em `src/lib/filter.ts`; filtros da URL em `src/lib/url.ts` (`readFilters` e `writeFilters`); vagas salvas no `localStorage` (`src/lib/saved.ts`), agora lidas uma vez no `App` e passadas à lista.

**Riscos.**
- O MUI zera o `outline` com classes do Emotion. A regra `html body :focus-visible` ganha pela especificidade, sem `!important`.
- A caixa de seleção do MUI esconde o `input` (opacidade 0). O foco aparece no `span` que a envolve (`.Mui-focusVisible`), e o teste confere esse elemento.
- Sem proteção na `main`, um push direto entra sem CI (#10).
- O `ubuntu-latest` do CI passou a ser o 26.04 em 06/11, e o Playwright 1.56 não instalava o Chromium nele. Subimos para o 1.65.

**Qualidade.**
- Testes: Vitest (filtro, só salvas, URL, página) e Playwright no Chromium (foco em toda tabulação, axe WCAG 2.2 AA com e sem filtro, URL).
- CI: agora também nos PRs para `developer/**`.
- Acessibilidade: foco em duas cores, contraste conferido pelo axe.
- Segurança: a URL guarda só os filtros; o texto da busca é cortado em 100 caracteres e a empresa só vale se existir.

**Definição de pronto.** `npm ci`, `npm test`, `npm run build` e `npx playwright test` passam; CI verde no PR; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.** #8 (foco), #9 (só salvas e URL), CI na `developer`, `docs/MVP.md` com régua N1 e critério 10 conforme a proteção.

**Vira issue.** #10 e #11 (responsável); #12, #13 e #14 (agente).

## Ciclo de 15/11/2026

> Branch `feature/2026-11-15` → `developer/sprint-2026-11-12` (PR #18 aberto) → `main`. Nível: Estudo (N1), 10 critérios aplicáveis (5 e 7 não se aplicam).

### Produto

**Problema e público.** Quem estuda React com TypeScript e MUI pratica uma lista de vagas que filtra, salva e abre o site da empresa. Quem procura vaga é o público simulado.

**Hipótese e meta.** Acreditamos que filtros combináveis (texto, empresa, remoto e só salvas) guardados na URL deixam a pessoa achar e compartilhar uma vaga sem instruções. Meta: chegar à lista "remotas da Twitch" em até 3 ações. Saberemos quando o teste Playwright do fluxo principal fizer esse caminho no CI e o link copiado abrir a mesma lista.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Publicar por workflow próprio | O Pages aceita um workflow que gera o artefato com `upload-pages-artifact` e publica com `deploy-pages`; só falta escolher "GitHub Actions" como fonte em Settings → Pages. O workflow já faz isso; o passo do responsável ficou na #11 | [GitHub Docs: configurar a fonte de publicação do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) |
| Modo escuro emulado | O Playwright emula `prefers-color-scheme: dark` com `page.emulateMedia({ colorScheme: "dark" })`. Virou uma rodada do axe no escuro | [Playwright: emulação](https://playwright.dev/docs/emulation) |
| Indicador de foco | O W3C pede indicador com área de pelo menos um contorno de 2 px e mudança de contraste de 3:1 (2.4.13, AAA). O teste já mede 2 px; mantemos | [W3C: Understanding Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Teste Playwright do fluxo principal (salvar, recarregar, só salvas, candidatar-se) com axe no claro e no escuro | Alto | Baixo | Este ciclo |
| 2 | Vaga salva sem `localStorage` (modo privado) não quebra a página, com teste | Médio | Baixo | Este ciclo |
| 3 | Filtro "Aceita remoto" na URL (#13) | Médio | Baixo | Este ciclo |
| 4 | Dependabot semanal para npm e Actions (parte da #14) | Médio | Baixo | Este ciclo |
| 5 | Apagar arquivos sem uso (entrada antiga do CRA e imagens) | Baixo | Baixo | Este ciclo |
| 6 | `docs/MVP.md` com comando, data e resultado em cada "Atende" | Alto | Baixo | Este ciclo |
| 7 | Ligar o Pages e mesclar a sprint | Médio | Baixo | Responsável (#11) |
| 8 | ESLint no CI (resto da #14) e ordenar por data (#12) | Médio | Médio | Issues |

**Fora do escopo.** Backend, candidatura, contas, vagas reais, mudar o texto da página sem decisão do responsável (aviso de projeto de estudo vira issue).

### Engenharia

**Arquitetura.** SPA React 18 + MUI 7 com Vite 8. Dados locais em `src/data/jobs.ts`, agora com o campo `remote` por vaga. Filtro puro em `src/lib/filter.ts`, filtros da URL em `src/lib/url.ts` (`?remoto=1` novo) e vagas salvas em `src/lib/saved.ts`. Publicação pelo job `deploy` do `.github/workflows/ci.yml`, só em push na `main`.

**Riscos.**
- Se a sprint entrar na `main` antes de o Pages ser ligado, o job `deploy` falha no push. Ordem documentada na #11 e no PR #18.
- O Dependabot vai abrir PRs de versão maior das Actions (`checkout` v7, `setup-node` v7, `upload-pages-artifact` v5, `deploy-pages` v5); o merge é do responsável.
- `public/index.html` (do CRA, com `%PUBLIC_URL%`) é copiado para `build/`; conferir que o `index.html` gerado pelo Vite é o que fica.

**Qualidade.**
- Testes: Vitest (filtro, remoto, URL, página, armazenamento bloqueado) e Playwright no Chromium (fluxo principal, foco em toda tabulação, axe WCAG 2.2 AA no claro e no escuro, URL).
- Segurança: `npm audit --omit=dev`; Dependabot de alertas desligado (API 403), então o `npm audit` é a fonte.

**Definição de pronto.** `npm ci`, `npm test`, `npm run build` e `npx playwright test` passam; CI verde no PR; `docs/MVP.md`, README e `docs/DEPLOY.md` atualizados.

### Plano de ação

**Este ciclo executa.** Itens 1 a 6 do backlog; comentários nas issues #10 a #14.

**Vira issue.** Aviso de projeto de estudo na página (decisão do responsável), alertas do Dependabot (Settings), ESLint no CI (#14) e ordenar por data (#12). Pages segue na #11.
