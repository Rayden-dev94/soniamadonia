'use client'

import { useState } from 'react'

import { ritratto, studio } from '@/data/contenuti'

type Props = {
  /**
   * Vero solo per il ritratto in cima alla home: è l'immagine più grande della
   * prima schermata, quindi va caricata subito e con priorità alta invece che
   * in differita come tutte le altre.
   */
  primaSchermata?: boolean
  className?: string
}

/** Iniziali del nome, per il segnaposto grafico quando non c'è una foto. */
function iniziali(nome: string) {
  return nome
    .split(' ')
    .map((parola) => parola[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/**
 * Ritratto della professionista.
 *
 * Il riquadro ha una proporzione fissa (4:5) e l'immagine lo riempie in
 * `object-cover`: lo spazio è quindi già riservato prima che la foto arrivi, e
 * la pagina non sobbalza a caricamento finito. Per lo stesso motivo non servono
 * gli attributi `width`/`height`.
 *
 * Se la foto manca o non si carica, al suo posto compare un segnaposto con le
 * iniziali — mai l'icona di immagine rotta.
 */
export function Ritratto({ primaSchermata = false, className = '' }: Props) {
  const [errore, setErrore] = useState(false)
  const mostraFoto = Boolean(ritratto.file) && !errore

  return (
    <div className={`relative ${className}`}>
      {/* Nessun alone dietro la foto, come nell'hero: la luce dello sfondo
          globale è sufficiente. */}
      <div
        data-ritratto
        className={`relative aspect-4/5 w-full overflow-hidden rounded-[2rem] bg-sabbia-200 ${
          // Nell'hero l'entrata la governa GSAP: partire invisibili da CSS
          // evita che il ritratto si veda già a piena opacità mentre l'intro
          // sta ancora sfumando. Altrove il componente è statico e visibile.
          primaSchermata ? 'opacity-0' : ''
        }`}
      >
        {mostraFoto ? (
          <img
            data-ritratto-foto
            src={ritratto.file ?? ''}
            alt={ritratto.alt}
            onError={() => setErrore(true)}
            loading={primaSchermata ? 'eager' : 'lazy'}
            fetchPriority={primaSchermata ? 'high' : 'auto'}
            decoding="async"
            style={{ objectPosition: ritratto.inquadratura }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            data-ritratto-foto
            className="flex h-full w-full items-center justify-center bg-linear-to-br from-salvia-100 to-sabbia-200"
          >
            <span
              aria-hidden="true"
              className="font-display text-6xl text-salvia-400"
            >
              {iniziali(studio.nome)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
