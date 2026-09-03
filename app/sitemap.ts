import type { MetadataRoute } from 'next'

import { DOMINIO } from '@/lib/seo'

/** Con l'esportazione statica il file viene scritto una volta, in fase di build. */
export const dynamic = 'force-static'

/**
 * La mappa del sito, generata dal codice invece che scritta a mano.
 *
 * Il file statico che c'era prima poteva andare fuori sincrono in silenzio:
 * bastava aggiungere una pagina e dimenticarsi di elencarla. Qui le rotte
 * stanno accanto a quelle vere, e chi ne aggiunge una la vede subito.
 *
 * `/privacy` è esclusa di proposito: è marcata come da non indicizzare, e
 * segnalarla nella mappa sarebbe una contraddizione — si chiede a Google di
 * visitare una pagina che gli si è appena detto di ignorare.
 *
 * Nessuna data di ultima modifica: cambierebbe a ogni build anche senza che il
 * contenuto sia cambiato, e una data che mente vale meno di una data assente.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${DOMINIO}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${DOMINIO}/servizi`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMINIO}/chi-sono`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMINIO}/contatti`, changeFrequency: 'yearly', priority: 0.7 },
  ]
}
