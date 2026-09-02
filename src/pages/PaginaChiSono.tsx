import { Intestazione } from '@/components/Intestazione'
import { RichiamoFinale } from '@/components/RichiamoFinale'
import { Attivita } from '@/components/sezioni/Attivita'
import { ChiSono } from '@/components/sezioni/ChiSono'
import { seo } from '@/data/contenuti'
import { useSeo } from '@/hooks/useSeo'

export default function PaginaChiSono() {
  useSeo(seo.chiSono)

  return (
    <>
      <Intestazione
        occhiello="Chi sono"
        titolo="Dal 2010 nel campo dell’Analisi del Comportamento Applicata."
        testo="Il percorso professionale, le certificazioni, le collaborazioni sul territorio e i principi su cui costruisco ogni intervento."
      />
      <ChiSono />
      <Attivita />
      <RichiamoFinale />
    </>
  )
}
