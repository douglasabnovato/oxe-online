/* Testes: filtro por texto, empresa, remoto e só salvas, estado vazio, vaga salva no navegador e filtros na URL */
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

  it("aceita remoto sozinho e combinado com texto, empresa e só salvas", () => {
    const ids = (r: ReturnType<typeof filterCompanies>) => r.flatMap((c) => c.jobs.map((j) => j.id));
    expect(ids(filterCompanies(companies, "", "", undefined, true))).toEqual(["t1", "t2"]);
    expect(ids(filterCompanies(companies, "lead", "", undefined, true))).toEqual(["t2"]);
    expect(filterCompanies(companies, "", "niantic", undefined, true)).toHaveLength(0);
    expect(ids(filterCompanies(companies, "", "", new Set(["n1", "t1"]), true))).toEqual(["t1"]);
  });
});

describe("filtros na URL", () => {
  const ids = companies.map((c) => c.id);
  it("lê e escreve só os filtros ativos", () => {
    expect(readFilters("?q=ios&empresa=instacart&salvas=1", ids)).toEqual({ query: "ios", companyId: "instacart", onlyRemote: false, onlySaved: true });
    expect(readFilters("?remoto=1", ids).onlyRemote).toBe(true);
    expect(readFilters("?remoto=sim", ids).onlyRemote).toBe(false);
    expect(writeFilters({ query: " ios ", companyId: "instacart", onlyRemote: true, onlySaved: true })).toBe("?q=ios&empresa=instacart&remoto=1&salvas=1");
    expect(writeFilters({ query: "", companyId: "", onlyRemote: false, onlySaved: false })).toBe("");
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

  it("aceita remoto filtra a página, vai para a URL e limpar desmarca", async () => {
    render(<App />);
    await userEvent.click(screen.getByLabelText("Aceita remoto"));
    expect(screen.getByRole("status").textContent).toBe("2 vagas encontradas.");
    expect(window.location.search).toBe("?remoto=1");
    expect(screen.queryByRole("heading", { name: "Niantic" })).toBeNull();
    await userEvent.type(screen.getByLabelText("Procure por uma vaga de emprego"), "ios");
    expect(screen.getByRole("status").textContent).toBe("Nenhuma vaga encontrada.");
    await userEvent.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect((screen.getByLabelText("Aceita remoto") as HTMLInputElement).checked).toBe(false);
    expect(window.location.search).toBe("");
  });

  it("candidatar-se abre o site da empresa em nova aba com aviso", () => {
    render(<App />);
    const link = screen.getAllByRole("link", { name: /Candidatar-se a .* Twitch/ })[0];
    expect(link.getAttribute("href")).toBe("https://www.twitch.tv/jobs");
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
describe("aviso de projeto de estudo (#19)", () => {
  it("mostra o texto escolhido antes da busca", () => {
    render(<App />);
    const aviso = screen.getByTestId("aviso-estudo");
    expect(aviso.textContent).toBe("Projeto de estudo: as empresas são reais, mas as vagas são ilustrativas e não há processo seletivo aqui.");
    const busca = screen.getByRole("search");
    expect(aviso.compareDocumentPosition(busca) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
/* Fim de app.test.tsx */
