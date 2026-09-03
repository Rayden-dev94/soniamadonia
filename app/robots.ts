import type { MetadataRoute } from 'next'

import { DOMINIO } from '@/lib/seo'

export const dynamic = 'force-static'

/**
 * Generato dal codice, così l'indirizzo della mappa non può divergere da
 * quello reale: entrambi leggono la stessa costante.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${DOMINIO}/sitemap.xml`,
  }
}
