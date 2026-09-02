import { Link } from 'react-router'

import { Ritratto } from '@/components/Ritratto'
import {
  biografia,
  certificazioni,
  notaCertificazioni,
  presentazione,
  principi,
  qualifiche,
  studio,
} from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

type Props = {
  /** Versione ridotta per la home, con rimando alla pagina completa. */
  anteprima?: boolean
}

export function ChiSono({ anteprima = false }: Props) {
  const ref = useRivela<HTMLElement>()

  if (anteprima) {
    return (
      <section ref={ref} className="py-24 sm:py-32">
        <div className="contenitore max-w-3xl">
          <p
            data-anim
            className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
          >
            Chi sono
          </p>

          <div className="space-y-5 text-lg leading-relaxed text-inchiostro-500">
            {presentazione.paragrafi.map((paragrafo) => (
              <p key={paragrafo.slice(0, 24)} data-anim>
                {paragrafo}
              </p>
            ))}
          </div>

          <p data-anim className="mt-6 text-base text-inchiostro-500/80">
            {studio.albo}
          </p>

          <Link
            data-anim
            to="/chi-sono"
            className="legame mt-8 inline-block text-inchiostro-900 transition-colors hover:text-salvia-700"
          >
            Percorso professionale e certificazioni
          </Link>
        </div>
      </section>
    )
  }

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
          <p data-anim className="text-base text-inchiostro-500/80">
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
              className="rounded-3xl border border-sabbia-200 p-7"
            >
              <h3 className="text-lg">{certificazione.titolo}</h3>
              <p className="mt-2 font-display text-sm text-salvia-600">
                {certificazione.numero}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-inchiostro-500">
                {certificazione.testo}
              </p>
            </article>
          ))}
        </div>

        {/* Distinzione richiesta dalla correttezza deontologica: una
            certificazione non è un Albo. Non va rimossa. */}
        <p
          data-anim
          className="mt-8 max-w-3xl rounded-2xl border border-sabbia-200 bg-sabbia-100/55 p-6 text-sm leading-relaxed text-inchiostro-500"
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
                className="py-4 leading-relaxed text-inchiostro-500"
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
                className="flex gap-3 leading-relaxed text-inchiostro-500"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-salvia-500"
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
