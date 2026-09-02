import { RichiamoFinale } from '@/components/RichiamoFinale'
import { ChiSono } from '@/components/sezioni/ChiSono'
import { Destinatari } from '@/components/sezioni/Destinatari'
import { Hero } from '@/components/sezioni/Hero'
import { Servizi } from '@/components/sezioni/Servizi'
import { seo } from '@/data/contenuti'
import { useSeo } from '@/hooks/useSeo'

export default function Home() {
  useSeo(seo.home)

  return (
    <>
      <Hero />
      <ChiSono anteprima />
      <Servizi anteprima />
      <Destinatari />
      <RichiamoFinale />
    </>
  )
}
