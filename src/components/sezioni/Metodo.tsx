'use client'

import { useRef } from 'react'

import { metodo } from '@/data/contenuti'
import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

export function Metodo() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tappe = gsap.utils.toArray<HTMLElement>('[data-tappa]')

      if (motoRidotto()) {
        gsap.set([tappe, '[data-linea]'], { opacity: 1, y: 0, scaleY: 1 })
        return
      }

      // La linea verticale si riempie mentre si scorre la sezione.
      gsap.fromTo(
        '[data-linea]',
        { scaleY: 0 },
        {
          scaleY: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        },
      )

      tappe.forEach((tappa) => {
        gsap.fromTo(
          tappa,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: tappa, start: 'top 82%', once: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-sabbia-100/55 py-24 sm:py-32">
      <div className="contenitore">
        <p className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase">
          Metodo di lavoro
        </p>
        <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">
          Ogni percorso attraversa cinque fasi.
        </h2>

        <ol className="relative mt-16 space-y-14 pl-10 sm:pl-16">
          {/* Binario della linea */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[3px] w-px bg-sabbia-200 sm:left-[7px]"
          />
          <div
            data-linea
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-salvia-500 sm:left-[7px]"
          />

          {metodo.map((passaggio) => (
            <li key={passaggio.numero} data-tappa className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-10 h-2 w-2 rounded-full bg-salvia-500 sm:-left-16 sm:h-4 sm:w-4 sm:border-4 sm:border-sabbia-50"
              />
              <span className="font-display text-sm text-salvia-600">
                {passaggio.numero}
              </span>
              <h3 className="mt-2 text-2xl">{passaggio.titolo}</h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-inchiostro-500">
                {passaggio.testo}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
