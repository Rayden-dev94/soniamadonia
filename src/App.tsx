import { Route, Routes } from 'react-router'

import { Footer } from '@/components/Footer'
import { Intro } from '@/components/Intro'
import { Navbar } from '@/components/Navbar'
import { ScrollInCima } from '@/components/ScrollInCima'
import { SfondoGlobale } from '@/components/SfondoGlobale'
import { ProviderIntro } from '@/lib/contestoIntro'
import Home from '@/pages/Home'
import NonTrovata from '@/pages/NonTrovata'
import PaginaChiSono from '@/pages/PaginaChiSono'
import PaginaContatti from '@/pages/PaginaContatti'
import PaginaServizi from '@/pages/PaginaServizi'
import Privacy from '@/pages/Privacy'

export default function App() {
  return (
    <ProviderIntro>
      <SfondoGlobale />
      <ScrollInCima />
      <Intro />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chi-sono" element={<PaginaChiSono />} />
          <Route path="/servizi" element={<PaginaServizi />} />
          <Route path="/contatti" element={<PaginaContatti />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NonTrovata />} />
        </Routes>
      </main>
      <Footer />
    </ProviderIntro>
  )
}
