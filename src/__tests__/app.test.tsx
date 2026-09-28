/* Testes: filtro por texto e empresa, estado vazio e vaga salva no navegador */
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { companies } from "../data/jobs";
import { filterCompanies } from "../lib/filter";

beforeEach(() => { cleanup(); localStorage.clear(); });

describe("filtro", () => {
  it("ignora acento e maiúsculas e remove empresas sem vagas", () => {
    expect(filterCompanies(companies, "IOS", "").map((c) => c.id)).toEqual(["instacart"]);
    expect(filterCompanies(companies, "", "twitch")[0].jobs).toHaveLength(2);
    expect(filterCompanies(companies, "cobol", "")).toHaveLength(0);
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

  it("candidatar-se abre o site da empresa em nova aba com aviso", () => {
    render(<App />);
    const link = screen.getAllByRole("link", { name: /Candidatar-se a .* Twitch/ })[0];
    expect(link.getAttribute("href")).toBe("https://www.twitch.tv/jobs");
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
/* Fim de app.test.tsx */
