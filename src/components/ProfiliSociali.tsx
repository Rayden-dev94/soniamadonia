import type { ReactElement, SVGProps } from 'react'

import { profiliAttivi, studio } from '@/data/contenuti'

/**
 * I simboli dei social, disegnati in linea.
 *
 * In `public/icons.svg` c'è un foglio di simboli — Bluesky, Discord, GitHub,
 * X — che è un avanzo del modello di partenza di Next e non è usato da niente:
 * non contiene nessuno dei tre che servono qui.
 *
 * Sono tracciati pieni che prendono il colore dal testo che li contiene, come
 * `IconaWhatsapp`: così l'icona non porta con sé una tavolozza propria e non
 * introduce nella pagina il blu di Facebook o il fucsia di Instagram, che
 * sarebbero gli unici colori saturi del sito. Il simbolo resta riconoscibile
 * per forma, che è quello che conta.
 */
const SIMBOLI: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => ReactElement
> = {
    Facebook: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
      </svg>
    ),
    LinkedIn: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
      </svg>
    ),
    Instagram: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  }

type Props = {
  className?: string
  /** Corpo dell'icona. Nei recapiti è più piccola che nel piè di pagina. */
  compatta?: boolean
}

/**
 * I collegamenti ai profili, in fila.
 *
 * Le icone sono decorative — `aria-hidden` — e il nome accessibile del
 * collegamento sta nell'`aria-label`: un simbolo non è un testo, e senza
 * etichetta uno screen reader annuncerebbe tre collegamenti muti. L'etichetta
 * porta anche il nome della professionista, perché «LinkedIn» da solo, letto
 * fuori contesto in un elenco di collegamenti, non dice di chi sia il profilo.
 *
 * L'area toccabile è più grande del disegno: le icone sono da 20-24px, ma il
 * collegamento è un quadrato di 40px. Sotto quella misura, su un telefono, si
 * sbaglia bersaglio.
 *
 * Se l'elenco dei profili con indirizzo è vuoto non viene reso niente, invece
 * di una fila di icone che non portano da nessuna parte.
 */
export function ProfiliSociali({ className = '', compatta = false }: Props) {
  if (profiliAttivi.length === 0) return null

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {profiliAttivi.map((profilo) => {
        const Simbolo = SIMBOLI[profilo.nome]
        if (!Simbolo) return null

        return (
          <li key={profilo.nome}>
            <a
              href={profilo.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${profilo.nome} di ${studio.nome} (si apre in una nuova scheda)`}
              className="flex h-10 w-10 items-center justify-center text-salvia-600 transition-colors duration-300 hover:text-salvia-700"
            >
              <Simbolo className={compatta ? 'h-5 w-5' : 'h-6 w-6'} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
