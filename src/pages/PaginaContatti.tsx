import { Intestazione } from '@/components/Intestazione'
import { Contatti } from '@/components/sezioni/Contatti'
import { seo } from '@/data/contenuti'
import { useSeo } from '@/hooks/useSeo'

export default function PaginaContatti() {
  useSeo(seo.contatti)

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
