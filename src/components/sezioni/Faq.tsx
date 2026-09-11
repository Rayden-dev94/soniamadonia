'use client'

import { useState } from 'react'

import { faq } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

export function Faq() {
  const [aperta, setAperta] = useState<number | null>(0)
  const ref = useRivela<HTMLElement>()

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="contenitore max-w-3xl">
        <p
          data-anim
          className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
        >
          Domande frequenti
        </p>
        <h2 data-anim className="text-3xl leading-tight sm:text-4xl">
          Le domande che mi vengono fatte più spesso.
        </h2>

        <div className="mt-12 divide-y divide-sabbia-200 border-y border-sabbia-200">
          {faq.map((voce, indice) => {
            const espansa = aperta === indice
            return (
              <div key={voce.domanda} data-anim>
                <h3>
                  <button
                    type="button"
                    onClick={() => setAperta(espansa ? null : indice)}
                    aria-expanded={espansa}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg text-inchiostro-900">
                      {voce.domanda}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-2xl leading-none text-salvia-600 transition-transform duration-300 ${
                        espansa ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-300 ease-morbido ${
                    espansa
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Le risposte sono elenchi di paragrafi: una di loro ne ha
                        tre, e in un blocco unico sarebbe un muro. */}
                    <div className="space-y-4 pb-6 text-lg leading-relaxed text-inchiostro-500">
                      {voce.risposta.map((paragrafo) => (
                        <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
