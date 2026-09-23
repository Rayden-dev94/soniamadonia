'use client'

import Link from 'next/link'

import { ritratto } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

type Props = {
  titolo?: string
  testo?: string
}

/** Invito al contatto, ripetuto in fondo alle pagine informative. */
export function RichiamoFinale({
  titolo = 'Il primo colloquio serve a capire cosa serve.',
  testo = 'Si parte dalle esigenze della persona e della famiglia, per valutare insieme l’appropriatezza della presa in carico.',
}: Props) {
  const ref = useRivela<HTMLElement>()

  return (
    // Margine anche sopra, non solo sotto. Finora lo spazio glielo prestava la
    // sezione precedente, ma quando sopra c'è una fascia colorata — la sezione
    // del libro in home — il bordo del colore arrivava a toccare il riquadro
    // verde. Con il proprio margine il riquadro si stacca da qualunque cosa lo
    // preceda, in tutte e tre le pagine in cui compare.
    <section ref={ref} className="py-24 sm:py-32">
      <div className="contenitore">
        {/* Il riquadro passa da scatola verde centrata a due colonne, con lei a
            sinistra: è l'invito a scrivere, e una persona che te lo chiede vale
            più di un rettangolo di colore. Il ritratto ha già il fondo verde
            scuro dello studio, quindi si posa sul salvia senza stacco — è il
            motivo per cui funziona questa foto e non un'altra.

            Su telefono la disposizione resta quella di prima, testo centrato e
            basta: accanto non c'è larghezza per due colonne, e sopra il testo
            la foto spingerebbe il pulsante sotto la piega. */}
        <div
          data-anim
          className="grid items-center overflow-hidden rounded-[2rem] bg-salvia-700 lg:grid-cols-[0.8fr_1fr]"
        >
          {ritratto.file && (
            <img
              src={ritratto.file}
              alt={ritratto.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: ritratto.inquadratura }}
              // `h-full` con `object-cover`: la colonna è alta quanto il testo
              // accanto, e la foto la riempie ritagliandosi invece di dettare
              // lei l'altezza del riquadro.
              className="hidden h-full w-full object-cover lg:block"
            />
          )}

          <div className="px-8 py-14 text-center sm:px-14 sm:py-20 lg:px-12 lg:text-left">
            <h2 className="mx-auto max-w-xl text-3xl leading-tight text-sabbia-50 sm:text-4xl lg:mx-0">
              {titolo}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-salvia-100 lg:mx-0">
              {testo}
            </p>
            <Link
              href="/contatti"
              className="bottone-chiaro mt-9 inline-block px-7 py-3.5"
            >
              Scrivimi
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
