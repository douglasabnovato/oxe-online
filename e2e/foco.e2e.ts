/* Foco visível em todas as tabulações, axe (WCAG 2.2 AA, inclui contraste) e filtros na URL, no navegador real */
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/* Descreve o foco atual: elemento visível que mostra o indicador e a espessura do contorno */
async function focoAtual(page: Page) {
  return page.evaluate(() => {
    const a = document.activeElement as HTMLElement | null;
    if (!a || a === document.body) return null;
    /* Caixa de seleção: input invisível, foco no botão que a envolve; campo e seletor: foco na moldura */
    const alvo = getComputedStyle(a).opacity === "0" ? (a.closest(".MuiButtonBase-root") as HTMLElement)
      : ((a.closest(".MuiInputBase-root") as HTMLElement | null) ?? a);
    const s = getComputedStyle(alvo);
    return {
      nome: a.getAttribute("aria-label") || a.textContent?.trim().slice(0, 40) || a.tagName,
      estilo: s.outlineStyle,
      largura: parseFloat(s.outlineWidth),
      cor: s.outlineColor,
    };
  });
}

test("toda tabulação mostra contorno de foco de pelo menos 2 px", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("status")).toHaveText("8 vagas encontradas.");
  const vistos: string[] = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    /* Espera transições de estilo terminarem antes de medir */
    await page.waitForTimeout(350);
    const f = await focoAtual(page);
    if (!f) break;
    /* "auto" é o anel padrão do navegador, sem contraste garantido; o MUI ainda zera o outline */
    expect(f.estilo, `sem contorno próprio em "${f.nome}"`).toBe("solid");
    expect(f.largura, `contorno fino em "${f.nome}"`).toBeGreaterThanOrEqual(2);
    vistos.push(f.nome);
  }
  /* Logotipo, busca, empresa, "Só salvas" e os botões das vagas */
  expect(vistos.length).toBeGreaterThanOrEqual(6);
  expect(vistos).toContain("Oxe Online — início");
});

test("axe sem violações WCAG 2.2 AA, com e sem filtro", async ({ page }) => {
  await page.goto("./");
  const tags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations).toEqual([]);
  await page.goto("./?q=cobol");
  await expect(page.getByRole("status")).toHaveText("Nenhuma vaga encontrada.");
  expect((await new AxeBuilder({ page }).withTags(tags).analyze()).violations).toEqual([]);
});

test("filtros da URL abrem a mesma lista e a busca atualiza a URL", async ({ page }) => {
  await page.goto("./?empresa=twitch");
  await expect(page.getByRole("status")).toHaveText("2 vagas encontradas.");
  await page.getByLabel("Procure por uma vaga de emprego").fill("android");
  await expect(page).toHaveURL(/q=android/);
  await expect(page).toHaveURL(/empresa=twitch/);
});
/* Fim de foco.e2e.ts */
