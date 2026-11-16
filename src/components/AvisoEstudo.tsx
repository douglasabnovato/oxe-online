/* Aviso de projeto de estudo no topo da página (issue #19): visível sem rolar no celular e no desktop */
export const TEXTO_AVISO =
  "Projeto de estudo: as empresas são reais, mas as vagas são ilustrativas e não há processo seletivo aqui.";

export default function AvisoEstudo() {
  return (
    <p className="aviso-estudo" data-testid="aviso-estudo">
      {TEXTO_AVISO}
    </p>
  );
}
/* Fim de AvisoEstudo.tsx */
