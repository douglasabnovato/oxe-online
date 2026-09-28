/* Vagas salvas no navegador (preferência de quem visita; falha silenciosa sem storage) */
import { useEffect, useState } from "react";

const KEY = "oxe-online.saved";

/* Lê as vagas salvas */
function load(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/* Hook com a lista de ids salvos e a função de alternar */
export function useSavedJobs(): [Set<string>, (id: string) => void] {
  const [saved, setSaved] = useState<Set<string>>(() => new Set(load()));
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify([...saved])); } catch { /* sem storage */ }
  }, [saved]);
  const toggle = (id: string) => setSaved((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });
  return [saved, toggle];
}
/* Fim de saved.ts */
