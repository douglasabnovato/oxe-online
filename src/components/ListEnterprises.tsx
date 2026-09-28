/* Vagas agrupadas por empresa, geradas a partir dos dados (antes: 3 blocos copiados à mão) */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import DoneIcon from "@mui/icons-material/Done";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconGroupSVG } from "./static/icons/IconGroupSVG";
import type { Company } from "../data/jobs";
import { useSavedJobs } from "../lib/saved";

type Props = { companies: Company[]; onClear: () => void };

export default function ListEnterprises({ companies, onClear }: Props) {
  const [saved, toggle] = useSavedJobs();
  const total = companies.reduce((n, c) => n + c.jobs.length, 0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h5" component="h1" sx={{ py: 3 }}>Vagas agrupadas por empresas</Typography>
      <Typography role="status" sx={{ mb: 2, color: "#374151" }}>
        {total === 0 ? "Nenhuma vaga encontrada." : `${total} ${total === 1 ? "vaga encontrada" : "vagas encontradas"}.`}
      </Typography>
      {total === 0 && <Button variant="outlined" onClick={onClear}>Limpar filtros</Button>}

      {companies.map((c) => (
        <Paper component="section" aria-labelledby={`company-${c.id}`} key={c.id} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <img src={c.logo} alt="" width="46" height="45" />
            <Box>
              <Typography variant="h5" component="h2" id={`company-${c.id}`}>{c.name}</Typography>
              <Typography sx={{ color: "#374151", my: 1 }}>{c.tagline}</Typography>
              <Chip avatar={<IconGroupSVG sx={{ height: 24, width: 24 }} />} label={c.size.toUpperCase()} sx={{ color: "#44546a", backgroundColor: "white" }} />
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ my: 2, flexWrap: "wrap", rowGap: 1 }}>
            <Chip avatar={<Avatar sx={{ backgroundColor: "#15803d" }}><DoneIcon sx={{ color: "white", fontSize: "small" }} /></Avatar>}
              label="CONTRATANDO AGORA" variant="outlined" sx={{ color: "#005A37", backgroundColor: "#E1FAF3" }} />
            <Chip avatar={<Avatar alt="" variant="rounded" src={c.investor.logo} />}
              label={`MESMO INVESTIDOR QUE ${c.investor.name.toUpperCase()}`} variant="outlined" sx={{ color: "#005A37", backgroundColor: "#E1FAF3" }} />
          </Stack>
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {c.jobs.map((j) => {
              const isSaved = saved.has(j.id);
              return (
                <Box component="li" key={j.id}
                  sx={{ border: 1, borderColor: "#DCE0DD", p: 2, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ flex: "1 1 280px" }}>{j.title}</Typography>
                  <Typography component="span" sx={{ color: "#4b5563" }}>{j.posted}</Typography>
                  <Button variant="contained" aria-pressed={isSaved} onClick={() => toggle(j.id)}
                    startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    aria-label={`${isSaved ? "Remover dos salvos" : "Salvar"}: ${j.title}`}
                    sx={{ backgroundColor: "#C0C0C0", color: "#050C26", "&:hover": { backgroundColor: "#1d4ed8", color: "#fff" } }}>
                    {isSaved ? "Salva" : "Salvar"}
                  </Button>
                  <Button variant="contained" href={c.careersUrl} target="_blank" rel="noopener noreferrer"
                    aria-label={`Candidatar-se a ${j.title} no site da ${c.name} (abre em nova aba)`}
                    sx={{ backgroundColor: "#C0C0C0", color: "#050C26", "&:hover": { backgroundColor: "#1d4ed8", color: "#fff" } }}>
                    Candidatar-se
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Paper>
      ))}
    </Container>
  );
}
/* Fim de ListEnterprises.tsx */
