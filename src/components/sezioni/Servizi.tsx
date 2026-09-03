'use client'

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
            {aree.map((area) => (
              <article
                key={area.titolo}
                data-anim
                className="overflow-hidden rounded-3xl border border-sabbia-200 bg-sabbia-50/80 transition-colors duration-300 hover:border-salvia-400"
              >
                <img
                  src={area.immagine}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="aspect-16/9 w-full object-cover"
                />
                <div className="p-8">
                  <h3 className="text-xl">{area.titolo}</h3>
                  <p className="mt-4 leading-relaxed text-inchiostro-500">
                    {area.sommario}
                  </p>
                  <p className="mt-5 text-sm text-salvia-600">
                    {area.servizi.length}{' '}
                    {area.servizi.length === 1 ? 'servizio' : 'servizi'}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <Rimando data-anim href="/servizi" className="mt-10">
            Tutti i servizi nel dettaglio
          </Rimando>
        </div>
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
                    src={area.immagine}
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
                    className="mb-4 text-sm tracking-[0.2em] text-salvia-600 uppercase"
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
                      <p className="misura leading-relaxed text-inchiostro-500">
                        {servizio.testo}
                      </p>

                      {'elenco' in servizio && servizio.elenco && (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {servizio.elenco.map((voce) => (
                            <li
                              key={voce}
                              className="flex gap-3 text-sm leading-relaxed text-inchiostro-500"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-salvia-500"
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
