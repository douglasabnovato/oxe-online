/* Fluxo principal no navegador: buscar, salvar, recarregar, rever só as salvas e candidatar-se; axe no claro e no escuro */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const TAGS = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];

/* Roda o axe na página atual e devolve só os ids das violações (mensagem curta no erro) */
async function violacoes(page: Page) {
  return (await new AxeBuilder({ page }).withTags(TAGS).analyze()).violations.map((v) => v.id);
}

test("salvar, recarregar, rever só as salvas e candidatar-se", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("status")).toHaveText("8 vagas encontradas.");

  /* Busca por texto e salva a vaga encontrada */
  await page.getByLabel("Procure por uma vaga de emprego").fill("android");
  await expect(page.getByRole("status")).toHaveText("1 vaga encontrada.");
  await page.getByRole("button", { name: /^Salvar: Senior Android/ }).click();
  await expect(page.getByRole("button", { name: /^Remover dos salvos: Senior Android/ })).toHaveAttribute("aria-pressed", "true");

  /* Limpa a busca, recarrega e confere que a vaga continua salva */
  await page.getByLabel("Procure por uma vaga de emprego").fill("");
  await page.reload();
  await expect(page.getByRole("status")).toHaveText("8 vagas encontradas.");
  await page.getByLabel("Só salvas (1)").check();
  await expect(page.getByRole("status")).toHaveText("1 vaga encontrada.");
  await expect(page).toHaveURL(/salvas=1/);
  expect(await violacoes(page)).toEqual([]);

  /* Candidatar-se leva ao site de carreiras da empresa, em nova aba e sem passar o opener */
  const link = page.getByRole("link", { name: /^Candidatar-se a Senior Android .* Instacart/ });
  await expect(link).toHaveAttribute("href", "https://instacart.careers");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);

  /* Remover da lista de salvas mostra o vazio com saída */
  await page.getByRole("button", { name: /^Remover dos salvos: Senior Android/ }).click();
  await expect(page.getByRole("status")).toHaveText("Nenhuma vaga salva ainda.");
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await expect(page.getByRole("status")).toHaveText("8 vagas encontradas.");
});

test("axe sem violações com o sistema em modo escuro e na largura de celular", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("./");
  await expect(page.getByRole("status")).toHaveText("8 vagas encontradas.");
  expect(await violacoes(page)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await violacoes(page)).toEqual([]);
});

test("sem localStorage (modo privado bloqueado) a página abre e salvar segue funcionando na sessão", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("bloqueado"); } });
  });
  await page.goto("./");
  await expect(page.getByRole("status")).toHaveText("8 vagas encontradas.");
  await page.getByRole("button", { name: /^Salvar: Senior iOS/ }).click();
  await expect(page.getByLabel("Só salvas (1)")).toBeVisible();
});
/* Fim de fluxo.e2e.ts */
