'use client'

import { Ritratto } from '@/components/Ritratto'
import { SimboloPsi } from '@/components/SimboloPsi'
import {
  biografia,
  certificazioni,
  notaCertificazioni,
  principi,
  qualifiche,
  studio,
} from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

export function ChiSono() {
  const ref = useRivela<HTMLElement>()

  return (
    <section ref={ref} className="pb-24 sm:pb-32">
      <div className="contenitore grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div data-anim>
          <Ritratto />
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-inchiostro-500">
          {biografia.map((paragrafo) => (
            <p key={paragrafo.slice(0, 24)} data-anim>
              {paragrafo}
            </p>
          ))}
          <p
            data-anim
            className="flex items-start gap-3 text-base text-inchiostro-500/80"
          >
            <SimboloPsi className="mt-1 h-5 w-5 shrink-0 text-salvia-500" />
            {studio.albo}
          </p>
        </div>
      </div>

      {/* Le certificazioni sono l'elemento di fiducia più forte di questa
          pagina: hanno numero verificabile e una spiegazione di che cosa
          attestano, non solo una sigla. */}
      <div className="contenitore mt-24">
        <h2 data-anim className="text-3xl leading-tight sm:text-4xl">
          Certificazioni e riconoscimenti professionali
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {certificazioni.map((certificazione) => (
            <article
              key={certificazione.titolo}
              data-anim
              className="flex flex-col rounded-3xl border border-sabbia-200 bg-sabbia-50/70 p-7"
            >
              {/* Riquadro del marchio ad altezza fissa, altrimenti le tre
                  schede partirebbero da tre altezze diverse.

                  I marchi orizzontali vengono tenuti più bassi: IBAO e IACABAI
                  sono quasi quadrati, ABAIT è largo più del doppio. Alla stessa
                  altezza quest'ultimo occuperebbe quasi il doppio dell'area e
                  sembrerebbe più importante. Il rapporto 0,73 pareggia l'area
                  ottica dei tre. */}
              <div className="flex h-14 items-center">
                {certificazione.logo ? (
                  <img
                    src={certificazione.logo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className={`w-auto max-w-[9rem] object-contain object-left ${
                      'largo' in certificazione && certificazione.largo
                        ? 'max-h-10'
                        : 'max-h-14'
                    }`}
                  />
                ) : (
                  <span className="font-display text-2xl text-salvia-600">
                    {certificazione.sigla}
                  </span>
                )}
              </div>

              <h3 className="mt-6 text-lg">{certificazione.titolo}</h3>
              <p className="mt-2 font-display text-sm text-salvia-600">
                {certificazione.numero}
              </p>
              {/* Non è testo di servizio: è la spiegazione di che cosa attesta
                  ogni certificazione, cioè la parte che deve convincere. In
                  corpo minore veniva letta come una postilla. */}
              <p className="mt-4 leading-relaxed text-inchiostro-500">
                {certificazione.testo}
              </p>
            </article>
          ))}
        </div>

        {/* Distinzione richiesta dalla correttezza deontologica: una
            certificazione non è un Albo. Non va rimossa. */}
        <p
          data-anim
          className="mt-8 max-w-3xl rounded-2xl border border-sabbia-200 bg-sabbia-100/55 p-6 leading-relaxed text-inchiostro-500"
        >
          {notaCertificazioni}
        </p>
      </div>

      <div className="contenitore mt-24 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 data-anim className="text-3xl leading-tight sm:text-4xl">
            Qualifiche
          </h2>
          <ul className="mt-8 divide-y divide-sabbia-200 border-y border-sabbia-200">
            {qualifiche.map((voce) => (
              <li
                key={voce}
                data-anim
                className="py-4 text-lg leading-relaxed text-inchiostro-500"
              >
                {voce}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 data-anim className="text-3xl leading-tight sm:text-4xl">
            Principi professionali
          </h2>
          <ul className="mt-8 space-y-3">
            {principi.map((principio) => (
              <li
                key={principio}
                data-anim
                className="flex gap-3 text-lg leading-relaxed text-inchiostro-500"
              >
                <span
                  aria-hidden="true"
                  className="mt-3 h-1 w-1 shrink-0 rounded-full bg-salvia-500"
                />
                {principio}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
