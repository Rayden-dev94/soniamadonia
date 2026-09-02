import { useRef } from 'react'
import { Link } from 'react-router'

import { fotoHero, presentazione, studio } from '@/data/contenuti'
import { useIntro } from '@/lib/contestoIntro'
import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { attiva: introAttiva, inUscita } = useIntro()

  /**
   * Un solo valore invece di due.
   *
   * L'entrata parte appena l'intro comincia a dissolversi (non quando ha
   * finito), così il velo si scopre su una pagina già in movimento. Poi l'intro
   * passa da "sto uscendo" a "ho finito": due cambi di stato, ma questo valore
   * resta vero in entrambi i casi, quindi l'effetto **non si ripete** e
   * l'animazione non riparte da capo a metà strada.
   *
   * Il motivo per cui è un valore derivato e non un `useRef` che ricorda di
   * essere già partito: un ref sopravvive alla pulizia degli effetti, quindi al
   * doppio montaggio che React fa in sviluppo il secondo giro lo troverebbe già
   * impostato e uscirebbe senza ricreare le animazioni appena annullate — e la
   * pagina resterebbe vuota.
   */
  const deveEntrare = !introAttiva || inUscita

  useGSAP(
    () => {
      if (!deveEntrare) return

      const bersagli = gsap.utils.toArray<HTMLElement>('[data-anim]')

      if (motoRidotto()) {
        gsap.set(bersagli, { opacity: 1, y: 0 })
        gsap.set('[data-foto]', { opacity: 1, scale: 1 })
        return
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out', duration: 1 } })
        // La foto si assesta da un ingrandimento appena percettibile: dà
        // profondità senza diventare un effetto vistoso, ed è una sola
        // trasformazione.
        .fromTo(
          '[data-foto]',
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.9, ease: 'power2.out' },
          0,
        )
        .fromTo(
          bersagli,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.13 },
          0.3,
        )
    },
    { scope: ref, dependencies: [deveEntrare] },
  )

  return (
    // `pt-20` è l'altezza della navbar: il riquadro comincia sotto di essa, così
    // il menu resta su fondo sabbia e non serve invertirne i colori.
    <section ref={ref} className="pt-20">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Un unico riquadro che riempie la prima schermata, staccato dai bordi
            e arrotondato: la foto è la pagina, il testo ci sta sopra. */}
        <div className="relative h-[calc(100svh-6.5rem)] min-h-[32rem] overflow-hidden rounded-[1.75rem] bg-sabbia-200 lg:rounded-[2.5rem]">
          {fotoHero.file && (
            <img
              data-foto
              src={fotoHero.file}
              alt={fotoHero.alt}
              fetchPriority="high"
              decoding="async"
              style={{ objectPosition: fotoHero.inquadratura }}
              className="absolute inset-0 h-full w-full object-cover opacity-0"
            />
          )}

          {/* Due veli sovrapposti: uno sale dal basso sotto al testo, l'altro
              scurisce il lato sinistro. Separati perché il testo occupa
              l'angolo, non tutta la larghezza — un velo unico spegnerebbe
              anche la parte di foto che deve restare pulita. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-inchiostro-900/85 via-inchiostro-900/30 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-inchiostro-900/60 via-transparent to-transparent"
          />

          {/* Su schermo stretto il testo va tenuto al minimo indispensabile:
              titolo e un solo invito. Tutto il resto ruberebbe alla foto lo
              spazio che le serve per esistere. Da 640px in su rientra. */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-16">
            <div className="max-w-2xl">
              <p
                data-anim
                className="mb-4 text-xs tracking-[0.2em] text-salvia-200 uppercase sm:mb-5 sm:text-sm"
              >
                {studio.ruolo}
              </p>

              <h1
                data-anim
                className="text-[1.75rem] leading-[1.1] text-sabbia-50 sm:text-4xl lg:text-5xl"
              >
                {presentazione.titolo}
              </h1>

              {/* Nascosto su telefono, non perso: la presentazione completa è
                  nella sezione subito sotto. */}
              <p
                data-anim
                className="mt-6 hidden max-w-lg leading-relaxed text-sabbia-100/90 sm:block"
              >
                Oltre quindici anni di esperienza nell’Analisi del Comportamento
                Applicata (ABA), a {studio.citta} e nel territorio.
              </p>

              <div
                data-anim
                className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8"
              >
                <Link
                  to="/contatti"
                  className="bottone-chiaro px-6 py-3 sm:px-7 sm:py-3.5"
                >
                  Richiedi un colloquio
                </Link>
                <Link
                  to="/servizi"
                  className="bottone-contorno-chiaro hidden px-7 py-3.5 sm:inline-block"
                >
                  I servizi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
