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
      <Hero />
      <Credenziali />
      <Libro />
      <Opera />
      <Servizi anteprima />
      <Destinatari />
      <RichiamoFinale />
    </>
  )
}
