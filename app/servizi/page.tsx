import type { Metadata } from 'next'

import { metadatiPagina } from '@/lib/seo'

import { Intestazione } from '@/components/Intestazione'
import { RichiamoFinale } from '@/components/RichiamoFinale'
import { Faq } from '@/components/sezioni/Faq'
import { Metodo } from '@/components/sezioni/Metodo'
import { Servizi } from '@/components/sezioni/Servizi'

export const metadata: Metadata = metadatiPagina({
  titolo: 'Servizi ABA e parent training',
  titoloSocial:
    'Servizi ABA: valutazione, intervento, parent training e formazione',
  descrizione:
    'Valutazione funzionale, interventi ABA individualizzati, parent training, supervisione, consulenza scolastica e formazione per Tecnici del Comportamento.',
  percorso: '/servizi',
})

export default function PaginaServizi() {
  return (
    <>
      <Intestazione
        occhiello="Servizi"
        titolo="Dalla valutazione all’intervento, fino alla formazione."
        testo="I servizi sono raccolti in quattro aree. Ogni intervento viene costruito sulle caratteristiche, sulle abilità e sui bisogni specifici della persona, e monitorato attraverso l’osservazione diretta e la raccolta sistematica dei dati."
      />
      <Servizi />
      <Metodo />
      <Faq />
      <RichiamoFinale
        titolo="Hai ancora un dubbio?"
        testo="Se non hai trovato la risposta che cercavi, scrivimi pure: rispondo personalmente."
      />
    </>
  )
}
