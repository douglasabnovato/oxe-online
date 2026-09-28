/* Banner com busca por texto e seleção de empresa (antes os campos não filtravam nada) */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import BannerWallpaper from "./static/images/banner-wallpaper.jpg";
import type { Company } from "../data/jobs";

type Props = {
  query: string;
  onQuery: (v: string) => void;
  companyId: string;
  onCompany: (v: string) => void;
  companies: Company[];
};

export default function Banner({ query, onQuery, companyId, onCompany, companies }: Props) {
  return (
    <>
      <Box sx={{ mt: { xs: 0, md: 5 } }}>
        <Paper square sx={{ backgroundImage: `url(${BannerWallpaper})`, backgroundSize: "cover", height: 147, width: "100%" }} />
      </Box>
      <Box sx={{ width: { xs: "calc(100% - 32px)", md: "80vw" }, maxWidth: 1100, mx: "auto", mt: -10 }}>
        <Paper component="form" role="search" onSubmit={(e) => e.preventDefault()}
          sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 5 }, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <TextField
            id="search"
            label="Procure por uma vaga de emprego"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            sx={{ flex: 2 }}
            slotProps={{ input: { endAdornment: <InputAdornment position="end"><SearchIcon aria-hidden="true" /></InputAdornment> } }}
          />
          <TextField
            id="company"
            select
            label="Selecione uma empresa"
            value={companyId}
            onChange={(e) => onCompany(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
            slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}
          >
            <MenuItem value="">Todas as empresas</MenuItem>
            {companies.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </TextField>
        </Paper>
      </Box>
    </>
  );
}
/* Fim de Banner.tsx */
