import type { Metadata } from 'next'

export const DOMINIO = 'https://www.soniamadonia.it'

/**
 * L'immagine per le anteprime social, da ripetere su ogni pagina.
 *
 * Next **sostituisce** l'oggetto `openGraph` invece di fonderlo campo per
 * campo: una pagina che dichiara solo titolo e descrizione perde l'immagine
 * ereditata dal layout. Succedeva davvero — le tre pagine interne si
 * condividevano senza immagine, mentre la home ce l'aveva.
 */
export const immagineSocial = [
  {
    url: '/anteprima-social.jpg',
    width: 1200,
    height: 630,
    alt: 'Infinito, opera collettiva realizzata con le impronte dei bambini e dei ragazzi seguiti nei progetti.',
  },
]

/**
 * Costruisce i metadati di una pagina interna.
 *
 * Titolo e descrizione vanno scritti pensando a **come si cerca**, non a come
 * si scrive un indice: chi cerca digita «parent training autismo», non
 * «i nostri servizi». La descrizione sta sotto i 155 caratteri, oltre i quali
 * Google tronca la frase a metà.
 */
export function metadatiPagina({
  titolo,
  descrizione,
  percorso,
  titoloSocial,
}: {
  titolo: string
  descrizione: string
  percorso: string
  titoloSocial: string
}): Metadata {
  return {
    title: titolo,
    description: descrizione,
    alternates: { canonical: percorso },
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      title: titoloSocial,
      description: descrizione,
      url: percorso,
      images: immagineSocial,
    },
  }
}
