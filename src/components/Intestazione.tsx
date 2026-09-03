'use client'

import { useRef } from 'react'

import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

type Props = {
  occhiello: string
  titolo: string
  testo?: string
}

/** Fascia di apertura comune a tutte le pagine interne. */
export function Intestazione({ occhiello, titolo, testo }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const bersagli = gsap.utils.toArray<HTMLElement>('[data-anim]')

      if (motoRidotto()) {
        gsap.set(bersagli, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        bersagli,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        },
      )
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20"
    >
      {/* L'alone locale che stava qui è stato tolto: con lo sfondo ambientale
          globale si sommavano, e due luci sovrapposte diventano una macchia. */}
      <div className="contenitore relative">
        <p
          data-anim
          className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
        >
          {occhiello}
        </p>
        <h1 data-anim className="max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
          {titolo}
        </h1>
        {testo && (
          <p
            data-anim
            className="mt-7 max-w-xl text-lg leading-relaxed text-inchiostro-500"
          >
            {testo}
          </p>
        )}
      </div>
    </section>
  )
}
