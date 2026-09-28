# Deploy · Oxe Online

Plano de ação para publicar a página de vagas por empresa em hospedagem gratuita.

## 1. Desafio

Publicar uma página única em Vite + React + TypeScript + MUI (sem backend, dados em `src/data/jobs.ts`) com deploy automático e sem custo, deixando claro para quem visita que é um projeto de estudo com empresas reais e vagas ilustrativas.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **GitHub Pages publicado pelo GitHub Actions (escolhida)** | Gratuito, no mesmo lugar do código; o workflow que já testa e gera o build passa a publicar a `main` |
| Netlify / Vercel | Funcionariam, mas exigem outra conta e outro painel para um site só estático |
| Render Static Site | Funcionaria, mas não há backend que justifique mais um serviço |

URL esperada: **https://douglasabnovato.github.io/oxe-online/**

### O que foi ajustado

| Arquivo | Ajuste | Por quê |
|---|---|---|
| `vite.config.ts` | `base: '/oxe-online/'` no build e no preview (raiz no `npm run dev` e nos testes) | No Pages o site fica em `/oxe-online/`; sem isso o JS, o CSS, as imagens e o favicon seriam pedidos na raiz do domínio |
| `src/components/AppBar.tsx` | O link do logotipo usa `import.meta.env.BASE_URL` em vez de `/` | Clicar no logo levava para `douglasabnovato.github.io/`, fora do site |
| `ci/github-actions-ci.yml` | Node 22; job `web` gera o artefato do Pages e novo job `deploy` publica (só em push na `main`) | Node 20 saiu de suporte em abr/2026; publicação automática |
| `README.md` | Seção "Em produção" (com a nota de projeto de estudo) | Link do site e deste passo a passo |

Não há rotas no cliente (é uma página só), então não é preciso `404.html` nem `basename`.

Validação feita antes da entrega (sandbox, Node 22):

- `npm ci` limpo; `npm test`: **4 testes passando**; `npm run build` (`tsc --noEmit` + Vite) gera `build/`.
- `npm audit --omit=dev` e `npm audit`: **0 vulnerabilidades** (antes e depois).
- `vite preview --base /oxe-online/` e um servidor que imita o Pages, abertos no Chromium com Playwright: as logos das empresas e o fundo do banner carregam de `/oxe-online/assets/`, o logo do topo volta para `/oxe-online/`, sem erros no console.

### Limitações do plano gratuito

- GitHub Pages: site público, até 1 GB, cerca de 100 GB de banda por mês; o repositório precisa ser público no plano gratuito.
- "Vagas salvas" ficam só no navegador de quem usa (`localStorage`).

### Pontos de atenção: marcas e conteúdo

- O site mostra nomes e logos de empresas reais (Niantic, Instacart e Twitch; como "investidores", Stripe e Yelp, além da Aircnc, que é fictícia) com vagas que não existem. O botão "Candidatar-se" abre o site de carreiras real da empresa.
- **Hoje o site não mostra nenhum aviso de "projeto de estudo"**: a nota existe só no comentário de `src/data/jobs.ts` e, agora, no README. Quem abre o link publicado não vê o aviso. Ver "Decisões pendentes".
- Não há segredo nem coleta de dados pessoais.

### Decisões pendentes (para você validar)

1. **Aviso visível de projeto de estudo** (recomendado antes de divulgar o link): um texto curto no banner ou no rodapé, por exemplo "Projeto de estudo: as empresas são reais, mas as vagas são ilustrativas e não há processo seletivo aqui." Não adicionei porque muda a interface; me diga onde prefere (banner ou rodapé) que eu preparo.
2. Opcional (PENDENCIAS): apagar arquivos sem uso (`IconWallpaper.tsx`, `icon-checked.png`, `icon-group.png`, `logo-oxe-online.jpg`).

## 3. Solução (passo a passo)

### Etapa 1 · Validar localmente (Git Bash)

1. `cd /c/ambiente-projeto/ser-mvp/oxe-online`
2. `npm ci` (se reclamar do lockfile, `npm install` e depois `npm ci` de novo)
3. `npm test` (4 testes)
4. `npm run build`
5. `npm run preview` e abrir `http://localhost:4173/oxe-online/`: banner, busca, filtro por empresa e lista de vagas.

### Etapa 2 · Ligar o GitHub Pages (antes do push)

1. No repositório `oxe-online` no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Não é preciso criar variável nem segredo.

### Etapa 3 · Subir para o GitHub

1. Remover os arquivos substituídos:
   ```bash
   git rm public/index.html src/index.tsx src/react-app-env.d.ts
   ```
2. Opcional (sem uso):
   ```bash
   git rm src/components/static/icons/IconWallpaper.tsx src/components/static/images/icon-checked.png src/components/static/images/icon-group.png src/components/static/images/logo-oxe-online.jpg
   ```
3. Mover o workflow:
   ```bash
   mkdir -p .github/workflows && mv ci/github-actions-ci.yml .github/workflows/ci.yml && rmdir ci
   ```
4. `git status` (nenhum `build/` ou `node_modules/` pode aparecer)
5. `git add -A`
6. `git commit -m "chore: deploy no GitHub Pages (base /oxe-online/, workflow com publicação)"`
7. `git push origin main`
8. Aba **Actions**: o workflow "CI" precisa ficar verde nos jobs `web` e `deploy`.

### Etapa 4 · Conferir no ar

1. Abrir https://douglasabnovato.github.io/oxe-online/: barra laranja com o logo, banner com imagem de fundo, lista de empresas com logos.
2. Digitar um cargo na busca e escolher uma empresa no filtro: a lista filtra; "Limpar filtros" volta tudo.
3. Salvar uma vaga, dar F5: continua salva.
4. Clicar no logo do topo: continua em `/oxe-online/`.
5. DevTools (F12) → Console: nenhum erro, nenhuma imagem com 404.

### Etapa 5 · Fechar

1. No GitHub, **About → Website**: colar `https://douglasabnovato.github.io/oxe-online/`.
