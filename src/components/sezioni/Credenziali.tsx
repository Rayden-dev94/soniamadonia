'use client'

import { Rimando } from '@/components/Rimando'
import { SimboloPsi } from '@/components/SimboloPsi'
import {
  certificazioni,
  credenziali,
  presentazione,
  studio,
} from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

/**
 * Presentazione breve e credenziali verificabili — solo in home.
 *
 * Sostituisce il riassunto della pagina «Chi sono» che stava qui: ripeteva un
 * contenuto raggiungibile con un clic e non aggiungeva nulla.
 *
 * Le certificazioni sono l'elemento di fiducia più forte del sito, ma vivevano
 * in una pagina interna — e chi arriva dai motori di ricerca vede la home, non
 * ci naviga dentro. In Italia un professionista sanitario non può usare
 * testimonianze: numeri di registro e loghi degli enti sono ciò che ne fa le
 * veci, e sono anche più solidi, perché chiunque può verificarli.
 */
export function Credenziali() {
  const ref = useRivela<HTMLElement>()

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="contenitore grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          {/* L'occhiello «In breve» è stato tolto su richiesta della dott.ssa.
              Il testo resta: a sparire è solo l'etichetta sopra. */}
          <div className="space-y-5 text-lg leading-relaxed text-inchiostro-500">
            {presentazione.paragrafi.slice(0, 2).map((paragrafo) => (
              <p key={paragrafo.slice(0, 24)} data-anim>
                {paragrafo}
              </p>
            ))}
          </div>

          <Rimando data-anim href="/chi-sono" className="mt-8">
            Percorso professionale e certificazioni
          </Rimando>
        </div>

        <div
          data-anim
          className="rounded-[2rem] border border-sabbia-200 bg-sabbia-50/70 p-8 sm:p-10"
        >
          <dl className="divide-y divide-sabbia-200">
            {credenziali.map((voce) => (
              <div key={voce.valore} className="py-5 first:pt-0 last:pb-0">
                <dt className="font-display text-2xl text-inchiostro-900">
                  {voce.valore}
                </dt>
                <dd className="mt-1 leading-relaxed text-inchiostro-500">
                  {voce.etichetta}
                </dd>
              </div>
            ))}
          </dl>

          {/* I loghi degli enti certificatori. Quelli orizzontali stanno più
              bassi, per pareggiare l'area ottica con quelli quasi quadrati. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-sabbia-200 pt-7">
            {certificazioni.map((certificazione) =>
              certificazione.logo ? (
                <img
                  key={certificazione.sigla}
                  src={certificazione.logo}
                  alt={certificazione.sigla}
                  loading="lazy"
                  decoding="async"
                  className={`w-auto max-w-[7rem] object-contain ${
                    'largo' in certificazione && certificazione.largo
                      ? 'h-7'
                      : 'h-10'
                  }`}
                />
              ) : (
                <span
                  key={certificazione.sigla}
                  className="font-display text-lg text-salvia-600"
                >
                  {certificazione.sigla}
                </span>
              ),
            )}
          </div>

          {/* Il Ψ accanto all'iscrizione, non da solo: è quella riga che
              rappresenta, e insieme si leggono come una cosa sola. */}
          <p className="mt-6 flex items-start gap-2.5 text-sm leading-relaxed text-inchiostro-500/70">
            <SimboloPsi className="h-4 w-4 shrink-0 text-salvia-500" />
            {studio.albo}
          </p>
        </div>
      </div>
    </section>
  )
}
