'use client'

import { useState } from 'react'

import { FinestraArea } from '@/components/FinestraArea'
import { Rimando } from '@/components/Rimando'
import { aree } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

type Props = {
  /**
   * In home basta la vetrina delle quattro aree. Nella pagina Servizi ogni
   * area si apre nei singoli servizi che la compongono.
   */
  anteprima?: boolean
}

export function Servizi({ anteprima = false }: Props) {
  const ref = useRivela<HTMLElement>()

  /**
   * Quale area è aperta, in due valori invece che in uno.
   *
   * Con un solo `indice | null`, chiudendo la finestra il contenuto sparirebbe
   * nello stesso fotogramma in cui comincia la dissolvenza d'uscita: si
   * vedrebbe una finestra vuota allontanarsi. Tenendo l'indice fermo e
   * spegnendo solo `aperta`, il contenuto resta al suo posto per tutta
   * l'uscita, e la volta dopo è già quello giusto.
   */
  const [areaAperta, setAreaAperta] = useState(0)
  const [aperta, setAperta] = useState(false)

  const apri = (indice: number) => {
    setAreaAperta(indice)
    setAperta(true)
  }

  if (anteprima) {
    return (
      <section ref={ref} className="bg-sabbia-100/55 py-24 sm:py-32">
        <div className="contenitore">
          <p
            data-anim
            className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
          >
            Di cosa mi occupo
          </p>
          <h2 data-anim className="max-w-2xl text-3xl leading-tight sm:text-4xl">
            Quattro aree di lavoro, un unico metodo.
          </h2>

          {/* Ogni scheda porta la stessa immagine che l'area avrà nella pagina
              Servizi: chi ci arriva la ritrova e riconosce dove si trova. */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {aree.map((area, indice) => (
              <article
                key={area.titolo}
                data-anim
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-sabbia-200 bg-sabbia-50/80 transition-colors duration-300 hover:border-salvia-400 focus-within:border-salvia-400"
              >
                <div className="overflow-hidden">
                  <img
                    src={area.immagini[0]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="ease-morbido aspect-16/9 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>

                <div className="flex grow flex-col p-8">
                  <h3 className="text-xl">{area.titolo}</h3>
                  {/* `mb-6` insieme al `mt-auto` del pulsante: l'automatico da
                      solo garantisce che stia in fondo, non che ci sia dello
                      spazio sopra quando la scheda è corta. */}
                  <p className="mt-4 mb-6 text-lg leading-relaxed text-inchiostro-500">
                    {area.sommario}
                  </p>

                  {/* Lo stesso pulsante verde del resto del sito: qui serve
                      che si veda che c'è qualcosa da aprire, e un comando già
                      noto lo dice meglio di uno inventato per l'occasione.

                      `mt-auto` lo tiene in fondo: i sommari sono di lunghezze
                      diverse, e senza, i quattro pulsanti starebbero a quattro
                      altezze diverse.

                      Il bersaglio è il pulsante, non la scheda intera: il velo
                      che sale al passaggio del mouse ha bisogno di
                      `overflow: hidden`, che ritaglierebbe qualunque area
                      cliccabile stesa oltre i suoi bordi. */}
                  <button
                    type="button"
                    onClick={() => apri(indice)}
                    aria-label={`Scopri di più su ${area.titolo}`}
                    className="bottone-verde mt-auto w-fit px-7 py-3"
                  >
                    Scopri di più
                  </button>
                </div>
              </article>
            ))}
          </div>

          <Rimando data-anim href="/servizi" className="mt-10">
            Tutti i servizi nel dettaglio
          </Rimando>
        </div>

        {/* Una sola finestra per tutte e quattro le schede: il contenuto
            cambia, l'elemento no. Quattro `<dialog>` sempre montati sarebbero
            quattro copie dello stesso guscio in attesa di non essere usate. */}
        <FinestraArea
          area={aree[areaAperta]}
          indice={areaAperta}
          totale={aree.length}
          aperta={aperta}
          onChiudi={() => setAperta(false)}
        />
      </section>
    )
  }

  return (
    <section ref={ref} className="pb-24 sm:pb-32">
      <div className="contenitore space-y-24 sm:space-y-32">
        {aree.map((area, indice) => {
          // L'immagine si alterna da un lato all'altro a ogni area, così
          // l'elenco non diventa una colonna monotona.
          const immagineADestra = indice % 2 === 1

          return (
            <div key={area.titolo}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div
                  data-anim
                  className={immagineADestra ? 'lg:order-last' : undefined}
                >
                  <img
                    src={area.immagini[0]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="aspect-16/9 w-full rounded-[2rem] object-cover"
                  />
                </div>

                <div>
                  <p
                    data-anim
                    // Più grande degli altri occhielli del sito, su richiesta
                    // della dott.ssa: qui non è un'etichetta decorativa ma
                    // l'indicazione di dove si è dentro un elenco di quattro,
                    // e in corpo 14 si perdeva sotto il titolo dell'area.
                    className="mb-4 text-base tracking-[0.2em] text-salvia-700 uppercase sm:text-lg"
                  >
                    Area {indice + 1} di {aree.length}
                  </p>
                  <h2 data-anim className="text-3xl leading-tight sm:text-4xl">
                    {area.titolo}
                  </h2>
                  <p
                    data-anim
                    className="mt-6 text-lg leading-relaxed text-inchiostro-500"
                  >
                    {area.sommario}
                  </p>
                </div>
              </div>

              {/* I singoli servizi dell'area, sotto al blocco introduttivo:
                  sono testi tecnici e densi, e vanno letti su una colonna
                  stretta invece che accanto a un'immagine. */}
              <div className="mt-14 space-y-10 border-t border-sabbia-200 pt-12 lg:mt-16">
                {area.servizi.map((servizio) => (
                  <article
                    key={servizio.titolo}
                    data-anim
                    className="grid gap-3 lg:grid-cols-[1fr_1.7fr] lg:gap-12"
                  >
                    <h3 className="font-display text-xl text-inchiostro-900">
                      {servizio.titolo}
                    </h3>

                    <div>
                      <p className="misura text-lg leading-relaxed text-inchiostro-500">
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
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
