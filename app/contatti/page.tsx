import type { Metadata } from 'next'

import { metadatiPagina } from '@/lib/seo'

import { Intestazione } from '@/components/Intestazione'
import { Contatti } from '@/components/sezioni/Contatti'

export const metadata: Metadata = metadatiPagina({
  titolo: 'Contatti — Gela e provincia',
  titoloSocial:
    'Contattare la dott.ssa Sonia Madonia',
  descrizione:
    'Richiedi un colloquio, una consulenza, una supervisione o informazioni sui percorsi formativi. Studio a Gela (CL), interventi nel territorio.',
  percorso: '/contatti',
})

export default function PaginaContatti() {
  return (
    <>
      <Intestazione
        occhiello="Contatti"
        titolo="Richiedi un colloquio o una consulenza."
        testo="Per richiedere un colloquio, una consulenza, una supervisione o informazioni sui percorsi formativi."
      />
      <Contatti />
    </>
  )
}
