/* Filtros na URL (?q=&empresa=&salvas=1): o link copiado da barra abre a mesma lista */
export type Filters = { query: string; companyId: string; onlySaved: boolean };

/* Lê os filtros de uma query string; empresa desconhecida vira "todas" */
export function readFilters(search: string, companyIds: string[]): Filters {
  const p = new URLSearchParams(search);
  const companyId = p.get("empresa") ?? "";
  return {
    query: (p.get("q") ?? "").slice(0, 100),
    companyId: companyIds.includes(companyId) ? companyId : "",
    onlySaved: p.get("salvas") === "1",
  };
}

/* Monta a query string só com os filtros ativos ("" quando não há filtro) */
export function writeFilters(f: Filters): string {
  const p = new URLSearchParams();
  if (f.query.trim()) p.set("q", f.query.trim());
  if (f.companyId) p.set("empresa", f.companyId);
  if (f.onlySaved) p.set("salvas", "1");
  const s = p.toString();
  return s ? `?${s}` : "";
}
/* Fim de url.ts */
