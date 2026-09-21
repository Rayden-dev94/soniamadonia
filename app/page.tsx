import { RichiamoFinale } from '@/components/RichiamoFinale'
import { Credenziali } from '@/components/sezioni/Credenziali'
import { Destinatari } from '@/components/sezioni/Destinatari'
import { Hero } from '@/components/sezioni/Hero'
import { Libro } from '@/components/sezioni/Libro'
import { Opera } from '@/components/sezioni/Opera'
import { Servizi } from '@/components/sezioni/Servizi'

export default function Home() {
  return (
    <>
      {/* L'ordine è quello chiesto dalla dott.ssa: dopo la presentazione si
          vede subito **cosa fa** — le quattro aree, con chi ne è destinatario
          subito dopo — e solo dopo le due cose che la raccontano, il quadro e
          il libro. Prima il lavoro arrivava per ultimo, dopo due sezioni
          personali. */}
      <Hero />
      <Credenziali />
      <Servizi anteprima />
      <Destinatari />
      <Opera />
      <Libro />
      <RichiamoFinale />
    </>
  )
}
