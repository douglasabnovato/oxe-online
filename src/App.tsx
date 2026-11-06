/* Página única: barra do topo, busca (texto, empresa e só salvas) e lista de vagas agrupadas por empresa; filtros espelhados na URL */
import { useEffect, useState } from "react";
import AppBar from "./components/AppBar";
import Banner from "./components/Banner";
import ListEnterprises from "./components/ListEnterprises";
import { companies } from "./data/jobs";
import { filterCompanies } from "./lib/filter";
import { useSavedJobs } from "./lib/saved";
import { readFilters, writeFilters } from "./lib/url";
import "./styles/App.css";

const companyIds = companies.map((c) => c.id);

function App() {
  const [initial] = useState(() => readFilters(window.location.search, companyIds));
  const [query, setQuery] = useState(initial.query);
  const [companyId, setCompanyId] = useState(initial.companyId);
  const [onlySaved, setOnlySaved] = useState(initial.onlySaved);
  const [saved, toggle] = useSavedJobs();
  const visible = filterCompanies(companies, query, companyId, onlySaved ? saved : undefined);

  /* Atualiza a URL sem criar entrada no histórico a cada tecla */
  useEffect(() => {
    const qs = writeFilters({ query, companyId, onlySaved });
    window.history.replaceState(null, "", `${window.location.pathname}${qs}${window.location.hash}`);
  }, [query, companyId, onlySaved]);

  return (
    <>
      <AppBar />
      <main>
        <Banner query={query} onQuery={setQuery} companyId={companyId} onCompany={setCompanyId} companies={companies}
          onlySaved={onlySaved} onOnlySaved={setOnlySaved} savedCount={saved.size} />
        <ListEnterprises companies={visible} saved={saved} onToggle={toggle} onlySaved={onlySaved}
          onClear={() => { setQuery(""); setCompanyId(""); setOnlySaved(false); }} />
      </main>
    </>
  );
}

export default App;
/* Fim de App.tsx */
