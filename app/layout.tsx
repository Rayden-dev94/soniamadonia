import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'

import { Guscio } from '@/app/Guscio'
import { profiliAttivi, pubblicazione, seo, studio } from '@/data/contenuti'
import { DOMINIO, immagineSocial } from '@/lib/seo'

import './globali.css'

/**
 * I font sono scaricati al momento della build e serviti dal nostro dominio.
 *
 * Non è solo velocità: elimina una richiesta ai server di Google a ogni visita,
 * e con essa il trasferimento dell'indirizzo IP di chi legge verso un terzo —
 * che su un sito sanitario, lato GDPR, è una semplificazione che vale.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

/**
 * Meta della home e valori predefiniti per tutte le pagine.
 *
 * Ogni pagina esporta poi i propri `metadata`: Next li fonde con questi e
 * scrive i tag nell'HTML statico, senza che serva il JavaScript. È il lavoro
 * che prima faceva a mano `scripts/prerendi.mjs`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(DOMINIO),
  title: {
    default: seo.home.titolo,
    template: `%s — ${studio.nome}`,
  },
  description: seo.home.descrizione,
  authors: [{ name: studio.nomeCompleto }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: '/',
    title: seo.home.titolo,
    description: seo.home.descrizione,
    images: immagineSocial,
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.png' },

  /**
   * Impedisce ai browser mobili di trasformare da soli in collegamenti i
   * numeri che *sembrano* telefonici.
   *
   * Non è una questione estetica. Safari su iOS e Chrome su Android lo fanno
   * per impostazione predefinita, e per farlo **riscrivono il DOM prima che
   * React lo riprenda in mano**: dove l'HTML del server aveva un testo, il
   * browser trova un `<a>`. React vede due alberi discordanti, scarta tutto e
   * la pagina resta inerte — nessun effetto parte, nessuna animazione, e i 34
   * elementi che aspettano GSAP restano invisibili per sempre.
   *
   * Su questo sito i candidati non mancano: «n. 10600» dell'Albo, i numeri di
   * certificazione IBAO e IACABAI, il codice SIACSA. Sono in home e in ogni
   * pagina interna.
   *
   * I numeri di telefono veri restano cliccabili: sono già dentro un `<a>`
   * scritto da noi, e questa impostazione tocca solo il riconoscimento
   * automatico.
   */
  formatDetection: { telephone: false, date: false, address: false },
}

/**
 * Dati strutturati.
 *
 * Fanno riconoscere la dott.ssa come entità e non come una stringa di testo:
 * professione, sede, competenze e certificazioni con i numeri verificabili.
 * È ciò che alimenta i risultati arricchiti e le ricerche locali del tipo
 * «analista del comportamento ABA Gela».
 */
const datiStrutturati = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${DOMINIO}/#persona`,
      name: studio.nomeCompleto.replace('Dott.ssa ', ''),
      alternateName: studio.nome,
      jobTitle: studio.ruolo,
      url: `${DOMINIO}/`,
      image: `${DOMINIO}/sonia.jpg`,
      telephone: '+393289615159',
      email: studio.email,
      /**
       * I profili dove la stessa persona è già presente.
       *
       * È la dichiarazione che collega un dominio nuovo a un'identità che i
       * motori di ricerca conoscono da anni: senza, il sito è una pagina che
       * afferma di appartenere a una certa persona e nient'altro.
       */
      sameAs: profiliAttivi.map((profilo) => profilo.url),
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Università degli Studi di Palermo',
      },
      knowsAbout: [
        'Analisi del Comportamento Applicata',
        'Applied Behavior Analysis',
        'Autismo',
        'Disturbi del neurosviluppo',
        'Parent training',
        'Valutazione funzionale del comportamento',
        'Supervisione clinica',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Iscrizione all’Albo',
          name: 'Albo degli Psicologi della Regione Siciliana, Sezione A, n. 10600',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Certificazione professionale',
          name: 'International Behavior Analyst (IBA) — IBAO, n. 76933613',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Certificazione professionale',
          name: 'Analista del Comportamento — IACABAI, n. 1-001-39',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Certificazione professionale',
          name: 'Analista del Comportamento — SIACSA/ABAIT, codice S-2022-00601',
        },
      ],
    },
    {
      '@type': ['ProfessionalService', 'Psychologist'],
      '@id': `${DOMINIO}/#studio`,
      name: `${studio.nome} — Psicologa e Analista del Comportamento`,
      url: `${DOMINIO}/`,
      image: `${DOMINIO}/anteprima-social.jpg`,
      description: seo.servizi.descrizione,
      founder: { '@id': `${DOMINIO}/#persona` },
      employee: { '@id': `${DOMINIO}/#persona` },
      telephone: '+393289615159',
      email: studio.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gela',
        addressRegion: 'CL',
        addressCountry: 'IT',
      },
      areaServed: [
        { '@type': 'City', name: 'Gela' },
        { '@type': 'AdministrativeArea', name: 'Caltanissetta' },
        { '@type': 'AdministrativeArea', name: 'Catania' },
        { '@type': 'AdministrativeArea', name: 'Sicilia' },
      ],
      availableLanguage: 'it',
    },
    /**
     * Il manuale, ora che è in home.
     *
     * Legato all'autrice per `@id` invece che ripeterne il nome: è così che il
     * grafo dice «questo libro è di quella persona» e non «di una qualsiasi
     * omonima».
     */
    {
      '@type': 'Book',
      '@id': `${DOMINIO}/#libro`,
      name: pubblicazione.titolo,
      author: { '@id': `${DOMINIO}/#persona` },
      description: pubblicazione.paragrafi[0],
      image: `${DOMINIO}${pubblicazione.copertina}`,
      url: pubblicazione.linkAcquisto,
      inLanguage: 'it',
      datePublished: '2022',
    },
  ],
}

export default function LayoutRadice({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datiStrutturati) }}
        />
        {/* Gli elementi con `data-anim` partono invisibili per evitare il lampo
            di contenuto prima che GSAP li animi. Senza JavaScript quel momento
            non arriva mai: qui li rendiamo visibili, così la pagina resta
            leggibile anche a chi il JavaScript non lo esegue. */}
        <noscript>
          <style>{`[data-anim],[data-simbolo]{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body>
        <Guscio>{children}</Guscio>
      </body>
    </html>
  )
}
