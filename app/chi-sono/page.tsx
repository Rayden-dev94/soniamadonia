import type { Metadata } from 'next'

import { metadatiPagina } from '@/lib/seo'

import { Intestazione } from '@/components/Intestazione'
import { RichiamoFinale } from '@/components/RichiamoFinale'
import { Attivita } from '@/components/sezioni/Attivita'
import { ChiSono } from '@/components/sezioni/ChiSono'

export const metadata: Metadata = metadatiPagina({
  titolo: 'Chi sono e certificazioni ABA',
  titoloSocial:
    'Sonia Madonia — percorso professionale e certificazioni ABA',
  descrizione:
    'Analista del Comportamento certificata IBA, IACABAI e SIACSA/ABAIT, psicologa iscritta all’Albo. Dal 2010 nell’Analisi del Comportamento Applicata.',
  percorso: '/chi-sono',
})

export default function PaginaChiSono() {
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
