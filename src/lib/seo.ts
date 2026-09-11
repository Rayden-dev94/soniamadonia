import type { Metadata } from 'next'

/**
 * L'indirizzo del sito, da cui discendono canonical, mappa, `robots.txt` e ogni
 * `@id` dei dati strutturati.
 *
 * **Deve coincidere alla lettera con il dominio primario impostato su Vercel**,
 * compreso il `www` o la sua assenza. Se qui c'è la forma senza `www` e Vercel
 * serve quella con — o viceversa — ogni pagina dichiara come canonico un
 * indirizzo che poi rimanda altrove: un motore di ricerca segue il rimando e si
 * trova due versioni dello stesso sito che si contraddicono.
 *
 * La forma **con `www`** non è una preferenza estetica: è quella che Vercel ha
 * assegnato come primaria aggiungendo il dominio, con l'apex che le rimanda
 * contro con un 308. Il canonico deve puntare alla destinazione del rimando,
 * non alla sua partenza, altrimenti ogni pagina dichiara ufficiale un indirizzo
 * che poi manda da un'altra parte.
 *
 * Registrato l'11 settembre 2026 su Porkbun. È un `.com`, non un `.it`.
 */
export const DOMINIO = 'https://www.soniamadonia.com'

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
