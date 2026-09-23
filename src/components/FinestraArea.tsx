'use client'

import { useEffect, useRef } from 'react'

import { CaroselloArea } from '@/components/CaroselloArea'
import {
  bloccaScorrimento,
  sbloccaScorrimento,
} from '@/lib/bloccoScorrimento'
import type { aree } from '@/data/contenuti'
import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

type Area = (typeof aree)[number]

type Props = {
  area: Area
  indice: number
  totale: number
  aperta: boolean
  onChiudi: () => void
}

/**
 * I servizi di un'area, in una finestra modale.
 *
 * È un `<dialog>` vero, aperto con `showModal()`, non un `<div>` con
 * `position: fixed`. La differenza non è di stile: il browser regala il
 * confinamento del focus, la chiusura con Esc, l'inerzia di tutto ciò che sta
 * sotto e il livello superiore — quattro cose che a mano si scrivono male e si
 * dimenticano di provare. Rifarle in proprio è il modo classico di costruire
 * una finestra che con la tastiera non si chiude più.
 *
 * L'apertura e la chiusura sono in CSS (`app/globali.css`, blocco
 * `[data-finestra]`) e non in GSAP: un elemento nel livello superiore passa da
 * `display: none` a visibile, e l'unico modo di animare quel salto è
 * `transition-behavior: allow-discrete`, che è CSS puro. GSAP resta per quello
 * che sa fare meglio: la comparsa scalata dei servizi dentro la finestra.
 */
export function FinestraArea({
  area,
  indice,
  totale,
  aperta,
  onChiudi,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  /** Dove stava la pagina quando la finestra si è aperta. */
  const scorrimento = useRef(0)

  /**
   * Lo stato di React comanda, il `<dialog>` segue.
   *
   * `showModal()` e `close()` non si possono esprimere come proprietà nel JSX:
   * sono metodi, e vanno chiamati quando lo stato cambia. Tutto il resto del
   * componente non sa che esistono — chiudere significa sempre e solo
   * `onChiudi()`, da qualunque parte arrivi il gesto.
   */
  useEffect(() => {
    const finestra = ref.current
    if (!finestra) return

    if (aperta && !finestra.open) {
      bloccaScorrimento(scorrimento)
      finestra.showModal()
    }

    if (!aperta && finestra.open) finestra.close()
  }, [aperta])

  /** Lo scorrimento torna quando la finestra è chiusa, e se il componente sparisce. */
  useEffect(() => {
    if (!aperta) sbloccaScorrimento(scorrimento)
  }, [aperta])

  useEffect(() => () => sbloccaScorrimento(scorrimento), [])

  /**
   * I servizi entrano uno dopo l'altro, dentro una finestra che sta ancora
   * arrivando: il ritardo iniziale li fa cominciare a metà della dissolvenza,
   * così la finestra non appare prima piena e poi in movimento.
   *
   * Dipende anche da `indice`: aprendo un'altra area senza chiudere la finestra
   * il contenuto cambia, e deve rientrare invece di comparire già fermo.
   */
  useGSAP(
    () => {
      if (!aperta) return

      const voci = gsap.utils.toArray<HTMLElement>('[data-voce]')
      if (voci.length === 0) return

      if (motoRidotto()) {
        gsap.set(voci, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        voci,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.07,
          delay: 0.18,
        },
      )
    },
    { scope: ref, dependencies: [aperta, indice] },
  )

  return (
    <dialog
      ref={ref}
      data-finestra
      aria-labelledby={`titolo-area-${indice}`}
      // Esc passa da qui: il gesto viene fermato e ripetuto attraverso lo
      // stato, altrimenti il `<dialog>` si chiuderebbe da solo lasciando React
      // convinto che sia ancora aperto.
      onCancel={(evento) => {
        evento.preventDefault()
        onChiudi()
      }}
      // Il fondo scuro **è** l'elemento `<dialog>`: un clic che arriva su di
      // lui e non su un suo discendente è un clic fuori dalla finestra.
      onClick={(evento) => {
        if (evento.target === ref.current) onChiudi()
      }}
      className="relative m-auto w-[min(94vw,58rem)] max-w-none overflow-hidden rounded-[1.75rem] border-0 bg-sabbia-50 p-0 text-inchiostro-700 sm:rounded-[2rem]"
    >
      {/* Il comando di chiusura sta fuori dalla parte che scorre, agganciato
          alla finestra: scorrendo il testo resta dov'è, invece di sparire in
          cima insieme alla fotografia. */}
      <button
        type="button"
        onClick={onChiudi}
        aria-label="Chiudi"
        className="ease-morbido absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-inchiostro-900/50 text-sabbia-50 transition-colors duration-300 hover:bg-inchiostro-900/80"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 5l14 14M19 5L5 19"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="max-h-[88vh] overflow-y-auto overscroll-contain">
        {/* Le fotografie dell'area, nel loro 16:9 e senza veli sopra.
            Prima stavano in una fascia alta 160px: di una foto scattata in
            sedici noni ne restava una striscia centrale, cioè le teste
            tagliate. Il titolo che le stava sopra è sceso sotto, dove non ha
            bisogno di scurire l'immagine per essere leggibile.

            `aperta` passa al carosello: fermo a finestra chiusa, riparte dalla
            prima foto a ogni apertura. */}
        <CaroselloArea
          key={area.titolo}
          immagini={area.immagini}
          titolo={area.titolo}
          attivo={aperta}
        />

        <div className="p-7 sm:p-10">
          {/* Stesso corpo dell'occhiello nella pagina Servizi: è la stessa
              informazione, e deve pesare uguale nei due posti. */}
          <p className="text-base tracking-[0.2em] text-salvia-700 uppercase sm:text-lg">
            Area {indice + 1} di {totale}
          </p>
          <h2
            id={`titolo-area-${indice}`}
            className="mt-4 text-2xl leading-tight sm:text-3xl"
          >
            {area.titolo}
          </h2>
          <p className="misura mt-5 text-lg leading-relaxed text-inchiostro-500">
            {area.sommario}
          </p>

          <div className="mt-9 space-y-9 border-t border-sabbia-200 pt-9">
            {area.servizi.map((servizio) => (
              <article key={servizio.titolo} data-voce>
                <h3 className="font-display text-xl text-inchiostro-900">
                  {servizio.titolo}
                </h3>
                {/* La finestra è larga, il testo no: oltre i settantacinque
                    caratteri per riga l'occhio perde il capoverso. */}
                <p className="misura mt-3 text-lg leading-relaxed text-inchiostro-500">
                  {servizio.testo}
                </p>

                {'elenco' in servizio && servizio.elenco && (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {servizio.elenco.map((voce) => (
                      <li
                        key={voce}
                        className="flex gap-3 leading-relaxed text-inchiostro-500"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-salvia-500"
                        />
                        {voce}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  )
}
