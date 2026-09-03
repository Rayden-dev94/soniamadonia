'use client'

import { Footer } from '@/components/Footer'
import { Intro } from '@/components/Intro'
import { Navbar } from '@/components/Navbar'
import { SfondoGlobale } from '@/components/SfondoGlobale'
import { BottoneWhatsapp } from '@/components/Whatsapp'
import { ProviderIntro } from '@/lib/contestoIntro'

/**
 * L'involucro comune a tutte le pagine: sfondo, intro, navbar, piè di pagina
 * e pulsante WhatsApp.
 *
 * Sta in un componente client perché contiene il contesto dell'intro e tutto
 * ciò che usa GSAP. Le pagine che riceve come `children` restano invece
 * componenti server: attraversano questo confine già disegnate, quindi il loro
 * contenuto finisce comunque nell'HTML statico.
 */
export function Guscio({ children }: { children: React.ReactNode }) {
  return (
    <ProviderIntro>
      <SfondoGlobale />
      <Intro />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BottoneWhatsapp />
    </ProviderIntro>
  )
}
