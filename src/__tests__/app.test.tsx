/* Testes: filtro por texto, empresa e só salvas, estado vazio, vaga salva no navegador e filtros na URL */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { companies } from "../data/jobs";
import { filterCompanies } from "../lib/filter";
import { readFilters, writeFilters } from "../lib/url";

beforeEach(() => { cleanup(); localStorage.clear(); window.history.replaceState(null, "", "/"); });

describe("filtro", () => {
  it("ignora acento e maiúsculas e remove empresas sem vagas", () => {
    expect(filterCompanies(companies, "IOS", "").map((c) => c.id)).toEqual(["instacart"]);
    expect(filterCompanies(companies, "", "twitch")[0].jobs).toHaveLength(2);
    expect(filterCompanies(companies, "cobol", "")).toHaveLength(0);
  });

  it("só salvas mantém apenas as vagas salvas", () => {
    const r = filterCompanies(companies, "", "", new Set(["n2", "t1"]));
    expect(r.map((c) => c.id)).toEqual(["niantic", "twitch"]);
    expect(r.flatMap((c) => c.jobs.map((j) => j.id))).toEqual(["n2", "t1"]);
    expect(filterCompanies(companies, "", "", new Set())).toHaveLength(0);
  });
});

describe("filtros na URL", () => {
  const ids = companies.map((c) => c.id);
  it("lê e escreve só os filtros ativos", () => {
    expect(readFilters("?q=ios&empresa=instacart&salvas=1", ids)).toEqual({ query: "ios", companyId: "instacart", onlySaved: true });
    expect(writeFilters({ query: " ios ", companyId: "instacart", onlySaved: true })).toBe("?q=ios&empresa=instacart&salvas=1");
    expect(writeFilters({ query: "", companyId: "", onlySaved: false })).toBe("");
  });
  it("ignora empresa desconhecida e corta texto longo", () => {
    expect(readFilters("?empresa=acme", ids).companyId).toBe("");
    expect(readFilters(`?q=${"a".repeat(300)}`, ids).query).toHaveLength(100);
  });
  it("a página abre com os filtros da URL e atualiza a URL ao buscar", async () => {
    window.history.replaceState(null, "", "/?empresa=twitch");
    render(<App />);
    expect(screen.getByRole("status").textContent).toBe("2 vagas encontradas.");
    await userEvent.type(screen.getByLabelText("Procure por uma vaga de emprego"), "lead");
    expect(window.location.search).toBe("?q=lead&empresa=twitch");
    expect(screen.getByRole("status").textContent).toBe("1 vaga encontrada.");
  });
});

describe("página", () => {
  it("busca atualiza a lista e o contador; sem resultado permite limpar", async () => {
    render(<App />);
    expect(screen.getByRole("status").textContent).toBe("8 vagas encontradas.");
    await userEvent.type(screen.getByLabelText("Procure por uma vaga de emprego"), "android");
    expect(screen.getByRole("status").textContent).toBe("1 vaga encontrada.");
    expect(screen.getByRole("heading", { name: "Instacart" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Niantic" })).toBeNull();
    await userEvent.type(screen.getByLabelText("Procure por uma vaga de emprego"), "xyz");
    await userEvent.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(screen.getByRole("status").textContent).toBe("8 vagas encontradas.");
  });

  it("salvar alterna o estado e persiste", async () => {
    render(<App />);
    const niantic = screen.getByRole("region", { name: "Niantic" });
    const btn = within(niantic).getAllByRole("button", { name: /^Salvar:/ })[0];
    await userEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(JSON.parse(localStorage.getItem("oxe-online.saved") || "[]")).toEqual(["n1"]);
    cleanup();
    render(<App />);
    expect(screen.getAllByRole("button", { name: /^Remover dos salvos/ })).toHaveLength(1);
  });

  it("só salvas mostra a lista salva e avisa quando não há nenhuma", async () => {
    render(<App />);
    await userEvent.click(screen.getByLabelText("Só salvas (0)"));
    expect(screen.getByRole("status").textContent).toBe("Nenhuma vaga salva ainda.");
    await userEvent.click(screen.getByRole("button", { name: "Limpar filtros" }));
    const twitch = screen.getByRole("region", { name: "Twitch" });
    await userEvent.click(within(twitch).getAllByRole("button", { name: /^Salvar:/ })[1]);
    await userEvent.click(screen.getByLabelText("Só salvas (1)"));
    expect(screen.getByRole("status").textContent).toBe("1 vaga encontrada.");
    expect(window.location.search).toBe("?salvas=1");
  });

  it("candidatar-se abre o site da empresa em nova aba com aviso", () => {
    render(<App />);
    const link = screen.getAllByRole("link", { name: /Candidatar-se a .* Twitch/ })[0];
    expect(link.getAttribute("href")).toBe("https://www.twitch.tv/jobs");
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
/* Fim de app.test.tsx */
