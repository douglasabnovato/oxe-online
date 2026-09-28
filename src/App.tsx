/* Página única: barra do topo, busca (texto + empresa) e lista de vagas agrupadas por empresa */
import { useState } from "react";
import AppBar from "./components/AppBar";
import Banner from "./components/Banner";
import ListEnterprises from "./components/ListEnterprises";
import { companies } from "./data/jobs";
import { filterCompanies } from "./lib/filter";
import "./styles/App.css";

function App() {
  const [query, setQuery] = useState("");
  const [companyId, setCompanyId] = useState("");
  const visible = filterCompanies(companies, query, companyId);

  return (
    <>
      <AppBar />
      <main>
        <Banner query={query} onQuery={setQuery} companyId={companyId} onCompany={setCompanyId} companies={companies} />
        <ListEnterprises companies={visible} onClear={() => { setQuery(""); setCompanyId(""); }} />
      </main>
    </>
  );
}

export default App;
/* Fim de App.tsx */
