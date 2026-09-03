'use client'

import Link from 'next/link'

import { useRivela } from '@/hooks/useRivela'

type Props = {
  titolo?: string
  testo?: string
}

/** Invito al contatto, ripetuto in fondo alle pagine informative. */
export function RichiamoFinale({
  titolo = 'Il primo colloquio serve a capire cosa serve.',
  testo = 'Si parte dalle esigenze della persona e della famiglia, per valutare insieme l’appropriatezza della presa in carico.',
}: Props) {
  const ref = useRivela<HTMLElement>()

  return (
    <section ref={ref} className="pb-24 sm:pb-32">
      <div className="contenitore">
        <div
          data-anim
          className="rounded-[2rem] bg-salvia-700 px-8 py-14 text-center sm:px-14 sm:py-20"
        >
          <h2 className="mx-auto max-w-xl text-3xl leading-tight text-sabbia-50 sm:text-4xl">
            {titolo}
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-salvia-100">
            {testo}
          </p>
          <Link
            href="/contatti"
            className="bottone-chiaro mt-9 inline-block px-7 py-3.5"
          >
            Scrivimi
          </Link>
        </div>
      </div>
    </section>
  )
}
