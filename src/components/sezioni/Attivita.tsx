'use client'

import { collaborazioni, pubblicazione } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

/**
 * Collaborazioni territoriali e pubblicazioni.
 *
 * Le collaborazioni sono in ordine dalla più recente: dicono dove opera
 * adesso, che su un profilo professionale conta più della cronologia.
 */
export function Attivita() {
  const ref = useRivela<HTMLElement>()

  return (
    <section ref={ref} className="bg-sabbia-100/55 py-24 sm:py-32">
      <div className="contenitore">
        <p
          data-anim
          className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
        >
          Progetti e collaborazioni
        </p>
        <h2 data-anim className="max-w-2xl text-3xl leading-tight sm:text-4xl">
          Il lavoro sul territorio.
        </h2>
        <p
          data-anim
          className="mt-6 max-w-2xl leading-relaxed text-inchiostro-500"
        >
          Collaboro con diverse cooperative sociali del territorio, sia
          all’interno di progetti promossi dalle Aziende Sanitarie Provinciali
          sia nell’erogazione di servizi specialistici rivolti a persone con
          diagnosi di autismo e altri disturbi del neurosviluppo.
        </p>

        <ul className="mt-14 divide-y divide-sabbia-200 border-y border-sabbia-200">
          {collaborazioni.map((voce) => (
            <li
              key={voce.ente}
              data-anim
              className="grid gap-2 py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
            >
              <p className="font-display text-salvia-600">{voce.periodo}</p>
              <div>
                <h3 className="font-display text-lg text-inchiostro-900">
                  {voce.ente}
                </h3>
                <p className="mt-1 text-sm text-inchiostro-500/80">
                  {voce.luogo} — {voce.ruolo}
                </p>
                <p className="mt-3 leading-relaxed text-inchiostro-500">
                  {voce.testo}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div
          data-anim
          className="mt-16 rounded-3xl border border-sabbia-200 bg-sabbia-50/80 p-8 sm:p-10"
        >
          <p className="text-sm tracking-[0.2em] text-salvia-600 uppercase">
            Pubblicazioni
          </p>
          <h3 className="mt-4 font-display text-2xl text-inchiostro-900">
            {pubblicazione.titolo}
          </h3>
          <p className="mt-2 text-sm text-inchiostro-500/80">
            {pubblicazione.autore} — {pubblicazione.dettagli}
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-inchiostro-500">
            {pubblicazione.testo}
          </p>
        </div>
      </div>
    </section>
  )
}
