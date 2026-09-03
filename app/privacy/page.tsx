import type { Metadata } from 'next'

import { Privacy } from '@/components/sezioni/Privacy'
import { seo } from '@/data/contenuti'

export const metadata: Metadata = {
  title: 'Informativa privacy',
  description: seo.privacy.descrizione,
  alternates: { canonical: '/privacy' },
  // Una pagina di servizio non ha ragione di comparire nei risultati.
  robots: { index: false, follow: true },
}

export default function PaginaPrivacy() {
  return <Privacy />
}
