'use client'

import { destinatari } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

/**
 * A chi si rivolgono i servizi.
 *
 * Nel documento originale è una sezione a sé, e ha senso che lo resti: qui il
 * destinatario non è scontato: accanto alle famiglie ci sono scuole,
 * cooperative, équipe ed enti. Chi arriva deve potersi riconoscere subito.
 */
export function Destinatari() {
  const ref = useRivela<HTMLElement>()

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="contenitore">
        <p
          data-anim
          className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
        >
          A chi mi rivolgo
        </p>
        <h2 data-anim className="max-w-2xl text-3xl leading-tight sm:text-4xl">
          Alle persone, e a chi lavora con loro.
        </h2>

        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {destinatari.map((voce) => (
            <li
              key={voce}
              data-anim
              className="flex gap-4 border-b border-sabbia-200 pb-4 leading-relaxed text-inchiostro-500"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-salvia-400"
              />
              {voce}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
