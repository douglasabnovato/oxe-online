# Deploy · Oxe Online

Como publicar a página de vagas por empresa no GitHub Pages, sem custo. Revisto em 15/11/2026.

## 1. Estado em 15/11/2026

| Item | Estado | Como conferi |
|---|---|---|
| Workflow de publicação | Pronto em `.github/workflows/ci.yml` (job `deploy`), na sprint `developer/sprint-2026-11-12` | Leitura do arquivo; CI verde nos PRs |
| GitHub Pages | **Desligado** | `gh api repos/douglasabnovato/oxe-online/pages`: 404 |
| Site | **Fora do ar** | `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/oxe-online/`: 404 |
| `main` | Protegida (ruleset `principal-protegida`) | `gh api repos/douglasabnovato/oxe-online/rules/branches/main` |

Falta o responsável: ligar o Pages e mesclar o PR #18 (issue #11).

## 2. Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages publicado pelo GitHub Actions (escolhida)** | Gratuito, no mesmo lugar do código; o workflow que já testa e gera o build publica a `main` |
| Netlify / Vercel | Funcionariam, mas pedem outra conta e outro painel para um site só estático |
| Render Static Site | Funcionaria, mas não há backend que justifique mais um serviço |

Não há banco nem API: não há `render.yaml` nem usuário de MongoDB neste projeto.

URL esperada: **https://douglasabnovato.github.io/oxe-online/**

### Como o código está preparado

| Arquivo | Ajuste | Por quê |
|---|---|---|
| `vite.config.ts` | `base: '/oxe-online/'` no build e no preview (raiz no `npm run dev` e nos testes) | No Pages o site fica em `/oxe-online/`; sem isso o JS, o CSS e as imagens seriam pedidos na raiz do domínio |
| `src/components/AppBar.tsx` | O link do logotipo usa `import.meta.env.BASE_URL` | Clicar no logo levaria para fora do site |
| `.github/workflows/ci.yml` | Job `raiz` testa, gera o build e, só em push na `main`, envia o artefato (`upload-pages-artifact`); job `deploy` publica (`deploy-pages`) depois do `raiz` verde | Publicação automática, sem passo manual |

Não há rotas no cliente (é uma página só), então não é preciso `404.html` nem `basename`. A entrada antiga do Create React App (`public/index.html`, `src/index.tsx`) foi apagada em 15/11/2026.

### Limitações do plano gratuito

- GitHub Pages: site público, até 1 GB, cerca de 100 GB de banda por mês; o repositório precisa ser público no plano gratuito.
- "Vagas salvas" ficam só no navegador de quem usa (`localStorage`).

### Pontos de atenção: marcas e conteúdo

- O site mostra nomes e logos de empresas reais (Niantic, Instacart e Twitch; como "investidores", Stripe e Yelp, além da Aircnc, que é fictícia) com vagas que não existem. O botão "Candidatar-se" abre o site de carreiras real da empresa.
- A página não mostra aviso de "projeto de estudo"; ele está só no README. A decisão do texto e do lugar está na #19. Recomendado antes de divulgar o link.
- Não há segredo nem coleta de dados pessoais.

## 3. Passo a passo do responsável

Fonte: [GitHub Docs: configurar a fonte de publicação do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Etapa 1 · Ligar o Pages (antes do merge na `main`)

1. Abrir https://github.com/douglasabnovato/oxe-online → **Settings**.
2. No menu da esquerda, em "Code and automation": **Pages**.
3. Em **Build and deployment → Source**, escolher **GitHub Actions**. Não clicar em nenhum modelo de workflow: o `ci.yml` já existe.
4. Não é preciso criar variável nem segredo.

Se a sprint entrar na `main` antes desta etapa, o job `deploy` falha no push. Basta ligar o Pages e rodar de novo (Actions → run da `main` → **Re-run failed jobs**).

### Etapa 2 · Mesclar a sprint

1. Abrir o PR #18 (`developer/sprint-2026-11-12 → main`), conferir o CI verde e mesclar.
2. Aba **Actions**: o run "CI" da `main` precisa ficar verde nos jobs `raiz` e `deploy`.

### Etapa 3 · Conferir no ar

1. Abrir https://douglasabnovato.github.io/oxe-online/: barra laranja com o logo, banner e lista de empresas com logos.
2. Digitar um cargo, escolher uma empresa e marcar "Aceita remoto": a lista filtra e a URL muda; "Limpar filtros" volta tudo.
3. Salvar uma vaga e dar F5: continua salva.
4. Clicar no logo do topo: continua em `/oxe-online/`.
5. F12 → Console: nenhum erro, nenhuma imagem com 404.
6. No Git Bash: `curl -s -o /dev/null -w "%{http_code}" https://douglasabnovato.github.io/oxe-online/` devolve `200`.

### Etapa 4 · Fechar

1. Na página do repositório, **About** (engrenagem) → **Website**: `https://douglasabnovato.github.io/oxe-online/`.
2. Comentar na #11 o run verde do `deploy` e o código 200.

## 4. Validar localmente (Git Bash)

1. `npm ci`
2. `npm test` (11 testes)
3. `npm run build`
4. `npx playwright install chromium` (uma vez) e `npx playwright test` (8 testes, contra o build em `http://localhost:4319/oxe-online/`)
5. `npm run preview` e abrir `http://localhost:4173/oxe-online/`.
