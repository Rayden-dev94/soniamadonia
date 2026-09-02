import { Intestazione } from '@/components/Intestazione'
import { RichiamoFinale } from '@/components/RichiamoFinale'
import { Faq } from '@/components/sezioni/Faq'
import { Metodo } from '@/components/sezioni/Metodo'
import { Servizi } from '@/components/sezioni/Servizi'
import { seo } from '@/data/contenuti'
import { useSeo } from '@/hooks/useSeo'

export default function PaginaServizi() {
  useSeo(seo.servizi)

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
