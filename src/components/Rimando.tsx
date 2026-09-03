'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  href: string
  children: ReactNode
  className?: string
}

/**
 * Rimando a una pagina interna.
 *
 * Prima erano collegamenti con la sola sottolineatura animata: al riposo
 * sembravano testo normale, e chi non passa il mouse — cioè chiunque usi un
 * telefono — non aveva modo di capire che fossero cliccabili.
 *
 * Ora si annunciano da fermi, con una filettatura chiara e una freccia. Al
 * passaggio del mouse succedono due cose insieme:
 *
 * 1. una seconda linea, salvia, **si scrive sopra** quella chiara da sinistra
 *    a destra — due strati invece di un colore che cambia di scatto;
 * 2. la freccia avanza.
 *
 * Entrambe sono trasformazioni, quindi restano dentro le regole di prestazione
 * del progetto, e partono da `group-hover`: si attivano ovunque si passi sopra
 * il collegamento, non solo esattamente sul testo.
 */
export function Rimando({ href, children, className = '', ...resto }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-inchiostro-900 transition-colors hover:text-salvia-700 ${className}`}
      {...resto}
    >
      <span className="relative">
        {children}

        {/* Filettatura sempre presente: è ciò che lo fa leggere come un
            collegamento anche da fermo. */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-0 h-px w-full bg-sabbia-300"
        />

        {/* Linea che si scrive sopra. Il perno passa da destra a sinistra
            entrando e torna indietro uscendo: sembra passare oltre invece di
            riavvolgersi. */}
        <span
          aria-hidden="true"
          className="ease-morbido absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-salvia-600 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"
        />
      </span>

      <svg
        viewBox="0 0 24 12"
        width="24"
        height="12"
        fill="none"
        aria-hidden="true"
        className="ease-morbido w-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1.5"
      >
        <path
          d="M0 6h21M16.5 1.5 21 6l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
