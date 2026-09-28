/* Filtro de vagas por texto (sem acento e sem diferenciar maiúsculas) e por empresa */
import type { Company } from "../data/jobs";

/* Normaliza texto para comparação */
export const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/* Empresas que têm vagas compatíveis, com a lista de vagas já filtrada */
export function filterCompanies(list: Company[], query: string, companyId: string): Company[] {
  const q = norm(query);
  return list
    .filter((c) => !companyId || c.id === companyId)
    .map((c) => ({ ...c, jobs: c.jobs.filter((j) => !q || norm(`${j.title} ${c.name}`).includes(q)) }))
    .filter((c) => c.jobs.length > 0);
}
/* Fim de filter.ts */
