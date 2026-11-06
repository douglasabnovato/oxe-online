/* Filtro de vagas por texto (sem acento e sem diferenciar maiúsculas), por empresa e, opcionalmente, só pelas salvas */
import type { Company } from "../data/jobs";

/* Normaliza texto para comparação */
export const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/* Empresas que têm vagas compatíveis, com a lista de vagas já filtrada */
export function filterCompanies(list: Company[], query: string, companyId: string, onlySaved?: Set<string>): Company[] {
  const q = norm(query);
  return list
    .filter((c) => !companyId || c.id === companyId)
    .map((c) => ({ ...c, jobs: c.jobs.filter((j) => (!q || norm(`${j.title} ${c.name}`).includes(q)) && (!onlySaved || onlySaved.has(j.id))) }))
    .filter((c) => c.jobs.length > 0);
}
/* Fim de filter.ts */
