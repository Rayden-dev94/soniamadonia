'use client'

import { useRef } from 'react'

import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

type Props = {
  occhiello: string
  /**
   * Il titolo grande. **Opzionale**: dove manca, l'occhiello prende il suo
   * posto come `<h1>`.
   *
   * Serve perché una pagina senza `<h1>` è un difetto silenzioso: i motori di
   * ricerca usano quell'elemento per capire di cosa parla la pagina, e chi
   * naviga con uno screen reader ci si orienta. Togliendo il titolo dalla
   * pagina Servizi sarebbe rimasta senza, e non se ne sarebbe accorto nessuno
   * finché non fosse calata nei risultati.
   */
  titolo?: string
  testo?: string
}

/** Fascia di apertura comune a tutte le pagine interne. */
export function Intestazione({ occhiello, titolo, testo }: Props) {
  // Quando il titolo grande non c'è, l'occhiello smette di essere un'etichetta
  // e diventa il titolo della pagina. Cambia il tag, non l'aspetto.
  const Etichetta = titolo ? 'p' : 'h1'
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const bersagli = gsap.utils.toArray<HTMLElement>('[data-anim]')

      if (motoRidotto()) {
        gsap.set(bersagli, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        bersagli,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        },
      )
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20"
    >
      {/* L'alone locale che stava qui è stato tolto: con lo sfondo ambientale
          globale si sommavano, e due luci sovrapposte diventano una macchia. */}
      <div className="contenitore relative">
        {/* `font-sans` esplicito: diventando `<h1>` erediterebbe dalle regole
            di base il carattere dei titoli, e l'occhiello cambierebbe aspetto
            a seconda che il titolo grande ci sia o no.

            Il fondo lo trasforma da etichetta in pastiglia, e chiede due
            accorgimenti. `inline-block`, perché un elemento di blocco
            colorerebbe tutta la riga fino al bordo destro della pagina invece
            di fasciare le parole. E il margine destro ridotto di 0,2em: la
            spaziatura fra le lettere viene aggiunta anche *dopo* l'ultima, e
            senza compensarla la scritta risulterebbe spostata a sinistra
            dentro la pastiglia. */}
        <Etichetta
          data-anim
          className="mb-6 inline-block rounded-full bg-salvia-100 py-1.5 pr-[calc(1rem-0.2em)] pl-4 font-sans text-base tracking-[0.2em] text-salvia-700 uppercase sm:text-lg"
        >
          {occhiello}
        </Etichetta>

        {titolo && (
          <h1 data-anim className="max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
            {titolo}
          </h1>
        )}
        {testo && (
          <p
            data-anim
            className="mt-7 max-w-xl text-lg leading-relaxed text-inchiostro-500"
          >
            {testo}
          </p>
        )}
      </div>
    </section>
  )
}
